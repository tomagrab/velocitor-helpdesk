'use client';

import { use, useEffect, useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useAuth, useUser } from '@clerk/nextjs';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Database } from '@/lib/Types/Database/Database';
import { supabaseClient } from '@/lib/Database/Supabase';
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { Company } from '@/lib/Types/Company/Company';
import { User } from '@clerk/nextjs/server';
import { TicketData } from '@/lib/Types/TicketData/TicketData';
import { addTicket, cancelTicket, updateTicket } from '@/app/api/actions';

type TicketFormProps = {
  companies: Company[];
  users: User[];
  ticket?: TicketData;
  editMode?: boolean;
  setEditMode?: (editMode: boolean) => void;
};

export const ticketFormSchema = z.object({
  branch_id: z.string().min(1, { message: 'Please select a branch' }),
  status: z.enum(['Open', 'Closed']),
  priority: z.enum(['low', 'medium', 'high']),
  notes: z
    .string()
    .min(10, {
      message: 'Please enter at least 10 characters',
    })
    .max(1000, {
      message: 'Please enter no more than 1000 characters',
    }),
  assigned_to: z.string().min(1, { message: 'Please select a user' }),
  owned_by: z.string().min(1, { message: 'Please select a user' }),
});

export default function TicketForm({
  companies,
  users,
  ticket,
  editMode,
  setEditMode,
}: TicketFormProps) {
  const [loading, setLoading] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(
    ticket?.branches.companies.company_id || null,
  );
  const [branches, setBranches] = useState<
    Database['public']['Tables']['branches']['Row'][]
  >([]);
  const currentUser = useUser();

  const ticketForm = useForm<z.infer<typeof ticketFormSchema>>({
    resolver: zodResolver(ticketFormSchema),
    defaultValues: {
      branch_id: ticket?.branch_id.toString(),
      status: (ticket?.status as 'Open' | 'Closed') ?? 'Open',
      priority: (ticket?.priority as 'low' | 'medium' | 'high') ?? 'low',
      notes: ticket?.notes ?? '',
      assigned_to: ticket?.assigned_to
        ? ticket?.assigned_to
        : currentUser.user?.id,
      owned_by: ticket?.owned_by ? ticket?.owned_by : currentUser.user?.id,
    },
  });

  const { getToken } = useAuth();

  // Get branches for selected company
  useEffect(() => {
    const getBranches = async () => {
      try {
        const supabaseAccessToken = await getToken({ template: 'supabase' });
        if (!supabaseAccessToken) {
          console.error('Failed to get access token');
          return;
        }
        const supabase = await supabaseClient(supabaseAccessToken);
        const { data, error } = await supabase
          .from('branches')
          .select('*')
          .eq('company_id', ticket?.branches.companies.company_id);
        if (error) {
          console.error(error);
          return;
        }

        setBranches(data || []);
      } catch (error) {
        console.error(
          `Failed to get branches for company ${ticket?.branches.companies.company_id}: \n${error}`,
        );
      }
    };
    getBranches();
  }, [ticket?.branches.companies.company_id, getToken]);

  useEffect(() => {
    // Set default branch value after branches are loaded
    if (branches.length > 0 && ticket?.branch_id) {
      const branchExists = branches.some(
        branch => branch.branch_id === ticket?.branch_id,
      );
      if (branchExists) {
        ticketForm.setValue('branch_id', ticket?.branch_id.toString());
      }
    }
  }, [branches, ticket, ticketForm]);

  const handleCompanyChange = async (value: string) => {
    const companyId = Number(value);
    setSelectedCompanyId(companyId);

    if (companyId) {
      try {
        const supabaseAccessToken = await getToken({ template: 'supabase' });
        if (!supabaseAccessToken) {
          console.error('Failed to get access token');
          return;
        }
        const supabase = await supabaseClient(supabaseAccessToken);
        const { data, error } = await supabase
          .from('branches')
          .select('*')
          .eq('company_id', companyId);
        if (error) {
          console.error(error);
          return;
        }

        setBranches(data || []);
      } catch (error) {
        console.error(
          `Failed to get branches for company ${companyId}: \n${error}`,
        );
      }
    } else {
      setBranches([]);
    }
  };

  const handleSubmit = async (values: z.infer<typeof ticketFormSchema>) => {
    setLoading(true);

    if (editMode && setEditMode) {
      await updateTicket(ticket?.ticket_id as number, values);
      setEditMode(false);
    }

    if (!editMode) {
      await addTicket(values);
    }

    setLoading(false);
  };

  const handleReset = () => {
    ticketForm.reset();
  };

  const handleCancel = async () => {
    if (editMode && setEditMode) {
      setEditMode(false);
    }

    await cancelTicket();
  };

  return (
    <Form {...ticketForm}>
      <form onSubmit={ticketForm.handleSubmit(handleSubmit)}>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <FormItem>
            <FormLabel htmlFor="company">Company</FormLabel>
            <Select
              onValueChange={handleCompanyChange}
              defaultValue={
                ticket?.branches.companies.company_id?.toString() ||
                selectedCompanyId?.toString()
              }
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a Company" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {companies.map(company => (
                  <SelectItem
                    key={company.company_id}
                    value={company.company_id.toString()}
                  >
                    {company.company_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>

          <FormField
            control={ticketForm.control}
            name="branch_id"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Branch</FormLabel>
                <Popover>
                  <PopoverTrigger asChild disabled={!selectedCompanyId}>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          'justify-between',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {branches.find(
                          branch => branch.branch_id.toString() === field.value,
                        )?.branch_name || 'Select Branch'}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Command>
                      <CommandInput placeholder="Search branch..." />
                      <CommandEmpty>No branch found.</CommandEmpty>
                      <CommandGroup>
                        {branches.map(branch => (
                          <CommandItem
                            value={branch.branch_name as string}
                            key={branch.branch_id}
                            onSelect={() => {
                              ticketForm.setValue(
                                'branch_id',
                                branch.branch_id.toString(),
                              );
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                branch.branch_id.toString() === field.value
                                  ? 'opacity-100'
                                  : 'opacity-0',
                              )}
                            />
                            {branch.branch_name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={ticketForm.control}
            name="status"
            disabled={loading}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={ticketForm.control}
            name="priority"
            disabled={loading}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={ticketForm.control}
            name="assigned_to"
            disabled={loading}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assigned To</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a User" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {users.map(user => (
                      <SelectItem
                        key={user.id}
                        value={user.id}
                        disabled={user.id === 'ckv2w4v9m0000j5m9a0l2k9zj'}
                      >
                        {user.emailAddresses[0].emailAddress}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={ticketForm.control}
            name="owned_by"
            disabled={loading}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Owned By</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a User" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {users.map(user => (
                      <SelectItem
                        key={user.id}
                        value={user.id}
                        disabled={user.id === 'ckv2w4v9m0000j5m9a0l2k9zj'}
                      >
                        {user.emailAddresses[0].emailAddress}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={ticketForm.control}
          name="notes"
          disabled={loading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
          <Button type="submit" disabled={loading}>
            {loading && editMode
              ? 'Updating...'
              : loading && !editMode
                ? 'Creating...'
                : editMode
                  ? 'Update'
                  : 'Create'}
          </Button>
          <Button
            type="button"
            className="bg-yellow-500 hover:bg-yellow-400"
            onClick={handleReset}
            disabled={loading}
          >
            Reset
          </Button>
          <Button
            type="button"
            className="bg-red-500 hover:bg-red-400"
            onClick={handleCancel}
            disabled={loading}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
