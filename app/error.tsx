// app/error.tsx

"use client"; // Required for error boundary components

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service (e.g., Sentry)
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-4xl font-bold text-red-500 mb-4">500 - Internal Server Error</h1>
      <p className="text-lg mb-6">Oops! Something went wrong on our end. Please try again later.</p>
      <div className="space-x-4">
        <button
          onClick={reset}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
        <Link href="/" className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
          Go to Home
        </Link>
      </div>
    </div>
  );
}
