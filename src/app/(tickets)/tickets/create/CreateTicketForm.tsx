'use client';

import { use, useState } from 'react';
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
import { addTicket } from './actions';
import { Company } from '@/lib/Types/Company/Company';
import { User } from '@clerk/nextjs/server';

type CreateTicketFormProps = {
  companies: Company[];
  users: User[];
};

export const createTicketFormSchema = z.object({
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

export default function CreateTicketForm({
  companies,
  users,
}: CreateTicketFormProps) {
  const [loading, setLoading] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(
    null,
  );
  const [branches, setBranches] = useState<
    Database['public']['Tables']['branches']['Row'][]
  >([]);
  const currentUser = useUser();
  const { getToken } = useAuth();

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

  const createTicketForm = useForm<z.infer<typeof createTicketFormSchema>>({
    resolver: zodResolver(createTicketFormSchema),
    defaultValues: {
      branch_id: '',
      status: 'Open',
      priority: 'low',
      notes: '',
      assigned_to: currentUser.user?.id,
      owned_by: currentUser.user?.id,
    },
  });

  const handleSubmit = async (
    values: z.infer<typeof createTicketFormSchema>,
  ) => {
    setLoading(true);
    await addTicket(values);
    setLoading(false);
  };

  return (
    <Form {...createTicketForm}>
      <form onSubmit={createTicketForm.handleSubmit(handleSubmit)}>
        <FormItem>
          <FormLabel htmlFor="company">Company</FormLabel>
          <Select
            onValueChange={handleCompanyChange}
            defaultValue={selectedCompanyId?.toString()}
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
          control={createTicketForm.control}
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
                            createTicketForm.setValue(
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
          control={createTicketForm.control}
          name="status"
          disabled={loading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
          control={createTicketForm.control}
          name="priority"
          disabled={loading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
          control={createTicketForm.control}
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

        <FormField
          control={createTicketForm.control}
          name="assigned_to"
          disabled={loading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assigned To</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
          control={createTicketForm.control}
          name="owned_by"
          disabled={loading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Owned By</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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

        <Button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create'}
        </Button>
      </form>
    </Form>
  );
}
