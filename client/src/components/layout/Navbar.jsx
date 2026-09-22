import { Link } from "react-router-dom";
import { Bell, User, Menu, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {

    const { user } = useAuth();

    return (
        <nav className="sticky top-0 z-40 h-16 border-b border-gray-200 bg-white px-4 sm:px-6">
            <div className="flex h-full items-center justify-between">
                {/* Left side */}
                <div className="flex items-center gap-3">
                    {/* Mobile menu button */}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="rounded-lg p-2 transition hover:bg-gray-100 lg:hidden"
                        aria-label="Toggle menu"
                    >
                        {sidebarOpen ? (
                            <X size={22} />
                        ) : (
                            <Menu size={22} />
                        )}
                    </button>

                    {/* Logo */}
                    <Link
                        to="/dashboard"
                        className="text-xl font-bold tracking-tight text-gray-900"
                    >
                        ExpenseTracker
                    </Link>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-2 sm:gap-4">
                    {/* Notifications */}
                    <button
                        className="rounded-full p-2 transition hover:bg-gray-100"
                        aria-label="Notifications"
                    >
                        <Bell size={20} />
                    </button>

                    {/* Profile */}
                    <Link
                        to="/profile"
                        className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition hover:bg-gray-100"
                    >
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>

                        <div className="hidden sm:block">
                            <p className="text-sm font-medium text-gray-900">
                                {user?.name}
                            </p>
                            <p className="text-xs text-gray-500">
                                {user?.email}
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;