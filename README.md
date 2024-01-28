# Velocitor Helpdesk

Velocitor Helpdesk is a robust ticketing application designed to streamline the process of managing customer support tickets. Built with Next.js, React, and TypeScript, it integrates Clerk for secure authentication and Supabase for reliable database management.

## Key Features

- **User Authentication**: Utilizes Clerk for user authentication, ensuring secure access to the application.
- **Database Management**: Employs Supabase, a scalable and user-friendly database solution, for storing and retrieving ticket data.
- **Dynamic Ticket Handling**: Create, assign, edit, and manage support tickets with ease.
- **User Roles and Permissions**: Tailored access controls to manage user roles and permissions.
- **Real-Time Updates**: Leveraging React's efficient rendering, the application provides real-time updates for ticket statuses.
- **Responsive Design**: Crafted with a responsive layout to ensure a seamless experience across various devices.

## Demo

[Velocitor Helpdesk](https://velocitor-helpdesk.vercel.app/)

## Technologies

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Clerk](https://clerk.dev/)
- [Supabase](https://supabase.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Hook Form](https://react-hook-form.com/)

## Getting Started

To get the Velocitor Helpdesk running locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repository/velocitor-helpdesk.git
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Create a `.env.local` file in the root directory of the project and add the following environment variables:

   ```bash
    NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-url.supabase.co
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
    CLERK_SECRET_KEY=your-clerk-secret-key
   ```

4. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. Open [localhost](http://localhost:3000) with your browser to see the result.
