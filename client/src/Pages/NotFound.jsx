import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
            <div className="w-full max-w-md text-center">

                <p className="text-8xl font-bold tracking-tight text-gray-900">
                    404
                </p>

                <h1 className="mt-4 text-2xl font-semibold text-gray-900">
                    Page not found
                </h1>

                <p className="mt-2 text-gray-500">
                    The page you're looking for doesn't exist or may have been moved.
                </p>

                <div className="mt-8 flex justify-center gap-3">
                    <Link
                        to="/dashboard"
                        className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
                    >
                        Go to Dashboard
                    </Link>

                    <Link
                        to="/expenses"
                        className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        View Expenses
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default NotFound;