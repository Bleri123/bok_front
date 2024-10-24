import { Link } from 'react-router-dom';

export default function Error() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-6">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-gray-900">404</h1>
        <p className="mt-4 text-2xl font-semibold text-gray-700">
          Oops! Page not found.
        </p>
        <p className="mt-2 text-lg text-gray-500">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="mt-6">
          <Link
            to="/"
            className="px-6 py-3 rounded-lg text-white bg-blue-500 hover:bg-blue-600 transition duration-300"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
