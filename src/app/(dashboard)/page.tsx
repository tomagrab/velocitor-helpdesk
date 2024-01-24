import { useUser } from '@clerk/nextjs';

export default function Dashboard() {
  return (
    <main>
      <div className="flex flex-row items-baseline gap-2">
        <h2>Dashboard</h2>
        <h3>
          The main Dashboard of <b>Velocitor Helpdesk</b>
        </h3>
      </div>
    </main>
  );
}
