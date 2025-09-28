import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="text-3xl font-bold text-red-600">403 - Forbidden</h2>
      <p className="mt-2 text-gray-600">
        You don’t have permission to access this page.
      </p>
      <Link
        href="/"
        className="mt-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Go Home
      </Link>
    </div>
  );
}
