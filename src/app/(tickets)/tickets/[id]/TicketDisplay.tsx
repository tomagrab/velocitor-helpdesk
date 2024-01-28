'use client';
import { TicketData } from '@/lib/Types/TicketData/TicketData';
import TicketDetailsCard from './TicketDetailsCard';
import { useState } from 'react';
import { TicketOwnership } from '@/lib/Types/TicketOwnership/TicketOwnership';
import { Company } from '@/lib/Types/Company/Company';
import { User } from '@clerk/nextjs/server';
import TicketForm from '@/components/Layout/Tickets/TicketForm/TicketForm';

type TicketDetailsProps = {
  ticket: TicketData;
  assigned_to: TicketOwnership;
  owned_by: TicketOwnership;
  companies: Company[];
  users: User[];
  editModeQueryParam?: boolean;
};

export default function TicketDisplay({
  ticket,
  assigned_to,
  owned_by,
  companies,
  users,
  editModeQueryParam,
}: TicketDetailsProps) {
  const [editMode, setEditMode] = useState(editModeQueryParam || false);
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      {!editMode ? (
        <TicketDetailsCard
          ticket={ticket}
          assigned_to={assigned_to}
          owned_by={owned_by}
          editMode={editMode}
          setEditMode={setEditMode}
        />
      ) : (
        <TicketForm
          companies={companies}
          users={users}
          ticket={ticket}
          editMode={editMode}
          setEditMode={setEditMode}
        />
      )}
    </div>
  );
}
