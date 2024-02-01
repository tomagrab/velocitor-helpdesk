import Image from 'next/image';

export default function Sidebar() {
  return (
    <aside className="sidebar transform overflow-hidden bg-slate-800 transition-all duration-300 ease-out flex-shrink-0">
      <div className="bg-velblue flex h-16 items-center justify-center">
        <Image
          width={32}
          height={32}
          src="https://vtrack.velsol.com/Content/images/VTrack-Logo-Small.png"
          alt="V"
        />
      </div>
    </aside>
  );
}
