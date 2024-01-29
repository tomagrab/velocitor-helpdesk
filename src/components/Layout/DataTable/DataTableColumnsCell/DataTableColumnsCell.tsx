type DataTableColumnsCellProps = {
  children: React.ReactNode;
};

export default function DataTableColumnsCell({
  children,
}: DataTableColumnsCellProps) {
  return <div className="flex flex-col items-center">{children}</div>;
}
