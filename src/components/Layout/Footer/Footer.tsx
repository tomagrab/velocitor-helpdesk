import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="flex h-8 items-center bg-white px-4 py-4">
      <p className="text-sm">
        &copy; 2024{' '}
        <Link
          href={`https://www.velsol.com/`}
          target="_blank"
          className="text-vellink"
        >
          Velocitor Solutions
        </Link>{' '}
        | V1.0.0
      </p>
    </footer>
  );
}
