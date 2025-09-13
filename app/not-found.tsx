import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-lg mb-8">Could not find the requested resource</p>
      <Link href="/" className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors">
        Return Home
      </Link>
    </div>
  );
}
