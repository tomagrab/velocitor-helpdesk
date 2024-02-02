import { FileSpreadsheet } from 'lucide-react';
import { Button } from './button';

type ExportToXLSXButtonProps = {
  onClick: () => void;
};

export default function ExportToXLSXButton({
  onClick,
}: ExportToXLSXButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="flex items-center gap-2 bg-officegreen transition-colors duration-300 ease-in-out hover:bg-officelightgreen"
    >
      <FileSpreadsheet className="h-5 w-5" />
      Export to Excel
    </Button>
  );
}
