import TicketLoadingCard from '@/components/Layout/Loading/Tickets/TicketLoadingCard/TicketLoadingCard';

export default function Loading() {
  return (
    <main>
      <div className="flex flex-row items-center gap-2">
        <h1>Ticket Details</h1>
        <h2>Ticket # Loading...</h2>
      </div>
      <TicketLoadingCard />
    </main>
  );
}
