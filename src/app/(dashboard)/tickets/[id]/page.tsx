import TicketDetailsCard from './TicketDetailsCard';

type TicketDetailsProps = {
  params: {
    id: string;
  };
};

export default function TicketDetails({ params: { id } }: TicketDetailsProps) {
  return (
    <div>
      <h1>Ticket Details</h1>
      <TicketDetailsCard id={Number(id)} />
    </div>
  );
}
