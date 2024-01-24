'use client';
import { useEffect, useState } from 'react';
import {
  Form,
  FormControl,
  FormDescription,
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
import { useRouter } from 'next/navigation';
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

const createTicketFormSchema = z.object({
  branch_id: z.string(),
  user_fullName: z.string(),
  user_email: z.string().email(),
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
});

export default function CreateTicketForm() {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const [loading, setLoading] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(
    null,
  );
  const [companies, setCompanies] = useState<
    Database['public']['Tables']['companies']['Row'][]
  >([]);

  const [branches, setBranches] = useState<
    Database['public']['Tables']['branches']['Row'][]
  >([]);
  const { getToken } = useAuth();

  const handleCompanyChange = (value: string) => {
    setSelectedCompanyId(Number(value));
  };

  const createTicketForm = useForm<z.infer<typeof createTicketFormSchema>>({
    resolver: zodResolver(createTicketFormSchema),
    defaultValues: {
      user_fullName: '',
      user_email: '',
      status: 'Open',
      priority: 'low',
      notes: '',
    },
  });

  useEffect(() => {
    const fetchCompanies = async () => {
      const supabaseAccessToken = await getToken({ template: 'supabase' });
      if (!supabaseAccessToken) {
        console.error('Failed to get access token');
        return;
      }
      const supabase = await supabaseClient(supabaseAccessToken);
      const { data } = await supabase.from('companies').select('*');
      setCompanies(data || []);
    };

    fetchCompanies();
  }, [getToken]);

  useEffect(() => {
    if (selectedCompanyId) {
      const getBranches = async () => {
        const supabaseAccessToken = await getToken({ template: 'supabase' });
        if (!supabaseAccessToken) {
          console.error('Failed to get access token');
          return;
        }
        const supabase = await supabaseClient(supabaseAccessToken);
        const { data } = await supabase
          .from('branches')
          .select('*')
          .eq('company_id', selectedCompanyId);
        setBranches(data || []);
      };

      getBranches();
    }
  }, [selectedCompanyId, getToken]);

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      const fullName = user.fullName || '';
      const email = user.emailAddresses[0]?.emailAddress || '';

      createTicketForm.reset({
        ...createTicketForm.getValues(),
        user_fullName: fullName,
        user_email: email,
      });
    }
  }, [isLoaded, isSignedIn, user, createTicketForm]);

  const handleSubmit = async (
    values: z.infer<typeof createTicketFormSchema>,
  ) => {
    setLoading(true);
    const supabaseAccessToken = await getToken({ template: 'supabase' });
    if (!supabaseAccessToken) {
      console.error('Failed to get access token');
      return;
    }
    const supabase = await supabaseClient(supabaseAccessToken);

    const { data, error } = await supabase.from('tickets').insert([
      {
        ...values,
        user_id: user?.id,
        user_fullName: user?.fullName,
        user_email: user?.emailAddresses[0]?.emailAddress,
        branch_id: Number(values.branch_id),
      },
    ]);

    if (error) throw error;

    // Send user to the ticket page if successful
    if (!error) {
      router.refresh();
      router.push(`/tickets`);
    }

    setLoading(false);
  };

  return (
    <Form {...createTicketForm}>
      <form onSubmit={createTicketForm.handleSubmit(handleSubmit)}>
        <FormItem>
          <FormLabel htmlFor="company">Company:</FormLabel>
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
                          value={branch.branch_name}
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
          disabled={!isSignedIn || !isLoaded || loading}
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
          disabled={!isSignedIn || !isLoaded || loading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
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
          disabled={!isSignedIn || !isLoaded || loading}
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

        <Button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create'}
        </Button>
      </form>
    </Form>
  );
}
