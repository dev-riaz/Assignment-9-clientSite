import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-3">Page Not Found</p>

      <Link
        href="/"
        className="mt-6 bg-teal-600 text-white px-5 py-2 rounded-lg"
      >
        Go Home
      </Link>
    </div>
  );
}
