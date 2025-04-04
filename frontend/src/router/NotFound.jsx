import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="max-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 my-10">
      <div className="max-w-md w-full space-y-8 text-center bg-white shadow-md rounded-md p-8">
        {/* 404 Illustration */}
        <div className="flex justify-center">
          <svg
            className="h-40 w-40 text-indigo-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        
        {/* Message */}
        <h1 className="text-5xl font-extrabold text-gray-900">404</h1>
        <h2 className="mt-2 text-2xl font-medium text-gray-900">Page not found</h2>
        <p className="mt-2 text-gray-600">
          Sorry, we couldn't find the page you're looking for.
        </p>
        
        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
          <Link
            to="/"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Go back home
          </Link>
          <Link
            to="/products"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Browse products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;