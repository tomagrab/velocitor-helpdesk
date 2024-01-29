import { Skeleton } from '@/components/ui/skeleton';
import LoadingDisplay from '@/components/Layout/Loading/LoadingDisplay';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function Loading() {
  return (
    <main>
      <div className="flex flex-row items-baseline gap-2">
        <h2>Dashboard</h2>
      </div>

      {/* Tickets Accordion */}
      <Accordion type="single" collapsible className="w-full p-4 shadow-lg">
        <AccordionItem value="item-1">
          <AccordionTrigger>Tickets Owned - Loading...</AccordionTrigger>
          <AccordionContent>
            <Skeleton />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>Tickets Assigned - Loading...</AccordionTrigger>
          <AccordionContent>
            <Skeleton />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  );
}
