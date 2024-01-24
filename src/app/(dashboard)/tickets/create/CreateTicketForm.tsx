'use client';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useUser } from '@clerk/nextjs';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';

const createTicketFormSchema = z.object({
  user_id: z.string(),
  user_firstName: z.string(),
  user_lastName: z.string(),
  user_fullName: z.string(),
  user_email: z.string().email(),
  status: z.enum(['open', 'closed']),
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
  const { isLoaded, isSignedIn, user } = useUser();
  const firstName = String(user?.firstName);
  const lastName = String(user?.lastName);
  const fullName = String(user?.fullName);
  const email = String(user?.emailAddresses[0].emailAddress);

  const createTicketForm = useForm<z.infer<typeof createTicketFormSchema>>({
    resolver: zodResolver(createTicketFormSchema),
    defaultValues: {
      user_id: user?.id,
      user_firstName: firstName,
      user_lastName: lastName,
      user_fullName: fullName,
      user_email: email,
      status: 'open',
      priority: 'low',
      notes: '',
    },
  });

  return (
    <Form {...createTicketForm}>
      <form>
        <FormField
          control={createTicketForm.control}
          name="user_id"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormLabel>User ID</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
