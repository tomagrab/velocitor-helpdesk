import CreateTicketForm from './CreateTicketForm';

export default function Create() {
  return (
    <main>
      <div className="flex flex-row items-center gap-2">
        <h2>Create</h2>
        <h3>Create a new ticket</h3>
      </div>
      <CreateTicketForm />
    </main>
  );
}
