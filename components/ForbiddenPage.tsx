// components/ForbiddenPage.tsx

import Link from "next/link";

const ForbiddenPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-4xl font-bold text-yellow-500 mb-4">403 - Forbidden</h1>
      <p className="text-lg mb-6">Sorry, you don’t have permission to access this page.</p>
      <Link href="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Back to Main Page
      </Link>
    </div>
  );
};

export default ForbiddenPage;
