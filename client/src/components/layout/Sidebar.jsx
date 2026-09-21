import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    Receipt,
    PlusCircle,
    User,
    LogOut,
    X,
} from "lucide-react";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const navigation = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            name: "Expenses",
            path: "/expenses",
            icon: Receipt,
        },
        {
            name: "Add Expense",
            path: "/expenses/add",
            icon: PlusCircle,
        },
        {
            name: "Profile",
            path: "/profile",
            icon: User,
        },
    ];

    return (
        <>
            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed left-0 top-16 z-50
                    h-[calc(100vh-4rem)] w-64
                    border-r border-gray-200 bg-white p-4
                    transition-transform duration-300
                    lg:static lg:z-auto lg:block
                    lg:h-[calc(100vh-4rem)]
                    lg:translate-x-0
                    ${
                        sidebarOpen
                            ? "translate-x-0"
                            : "-translate-x-full"
                    }
                `}
            >
                {/* Mobile header */}
                <div className="mb-4 flex items-center justify-between lg:hidden">
                    <span className="font-semibold text-gray-900">
                        Menu
                    </span>

                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="rounded-lg p-2 transition hover:bg-gray-100"
                        aria-label="Close menu"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="space-y-2">
                    {navigation.map((item) => {
                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() => setSidebarOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                                        isActive
                                            ? "bg-gray-900 text-white"
                                            : "text-gray-600 hover:bg-gray-100"
                                    }`
                                }
                            >
                                <Icon size={19} />
                                {item.name}
                            </NavLink>
                        );
                    })}
                </nav>

                {/* Logout */}
                <div className="mt-8 border-t border-gray-200 pt-4">
                    <button
                        className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
                    >
                        <LogOut size={19} />
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;