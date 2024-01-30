import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingAccordion() {
  return (
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
  );
}
