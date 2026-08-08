import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="heading-font text-6xl text-un-blue">404</h1>
      <p className="mt-4 text-lg text-muted">Page not found</p>
      <Link href="/" className="mt-8 rounded-full bg-un-blue px-6 py-3 text-sm font-bold uppercase">
        Back to Home
      </Link>
    </div>
  );
}
