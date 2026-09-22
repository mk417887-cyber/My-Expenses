// import { NavLink } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// // import { useAuth } from "../context/AuthContext";
// import { useAuth } from "../../context/AuthContext";

// import {
//     LayoutDashboard,
//     Receipt,
//     PlusCircle,
//     User,
//     LogOut,
//     X,
// } from "lucide-react";

// const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
//     const navigation = [
//         {
//             name: "Dashboard",
//             path: "/dashboard",
//             icon: LayoutDashboard,
//         },
//         {
//             name: "Expenses",
//             path: "/expenses",
//             icon: Receipt,
//         },
//         {
//             name: "Add Expense",
//             path: "/expenses/add",
//             icon: PlusCircle,
//         },
//         {
//             name: "Profile",
//             path: "/profile",
//             icon: User,
//         },
//     ];

//     const navigate = useNavigate();

//     const { logout } = useAuth();

//     const logoutHandler = () => {
//         logout();
//         navigate("/login",
//             {
//                 state: {
//                     message: "Logut successful."
//                 }
//             }
//         );
//     };

//     return (
//         <>
//             {/* Mobile overlay */}
//             {sidebarOpen && (
//                 <div
//                     className="fixed inset-0 z-40 bg-black/40 lg:hidden"
//                     onClick={() => setSidebarOpen(false)}
//                 />
//             )}

//             {/* Sidebar */}
//             <aside
//                 className={`
//                     fixed left-0 top-16 z-50
//                     h-[calc(100vh-4rem)] w-64
//                     border-r border-gray-200 bg-white p-4
//                     transition-transform duration-300
//                     lg:static lg:z-auto lg:block
//                     lg:h-[calc(100vh-4rem)]
//                     lg:translate-x-0
//                     ${
//                         sidebarOpen
//                             ? "translate-x-0"
//                             : "-translate-x-full"
//                     }
//                 `}
//             >
//                 {/* Mobile header */}
//                 <div className="mb-4 flex items-center justify-between lg:hidden">
//                     <span className="font-semibold text-gray-900">
//                         Menu
//                     </span>

//                     <button
//                         onClick={() => setSidebarOpen(false)}
//                         className="rounded-lg p-2 transition hover:bg-gray-100"
//                         aria-label="Close menu"
//                     >
//                         <X size={20} />
//                     </button>
//                 </div>

//                 {/* Navigation */}
//                 <nav className="space-y-2">
//                     {navigation.map((item) => {
//                         const Icon = item.icon;

//                         return (
//                             <NavLink
//                                 key={item.path}
//                                 to={item.path}
//                                 onClick={() => setSidebarOpen(false)}
//                                 className={({ isActive }) =>
//                                     `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
//                                         isActive
//                                             ? "bg-gray-900 text-white"
//                                             : "text-gray-600 hover:bg-gray-100"
//                                     }`
//                                 }
//                             >
//                                 <Icon size={19} />
//                                 {item.name}
//                             </NavLink>
//                         );
//                     })}
//                 </nav>

//                 {/* Logout */}
//                 <div className="mt-8 border-t border-gray-200 pt-4">
//                     <button onClick={logoutHandler} 
//                         className="flex w-full items-center gap-3 rounded-lg  cursor-pointer px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
//                     >
//                         <LogOut size={19} onClick={logoutHandler} className="text-red-600 cursor-pointer "/>
//                         Logout
//                     </button>
//                 </div>
//             </aside>
//         </>
//     );
// };

// export default Sidebar;

import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
import { useAuth } from "../../context/AuthContext";

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

    const navigate = useNavigate();

    const { logout } = useAuth();

    const logoutHandler = () => {
        logout();
        navigate("/login", {
            state: {
                message: "Logut successful.",
            },
        });
    };

    return (
        <>
            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed left-0 top-16 z-50 flex flex-col justify-between
                    h-[calc(100vh-4rem)] w-64
                    border-r border-slate-200/80 bg-white/95 backdrop-blur-md px-4 py-5
                    shadow-xl shadow-slate-900/5 transition-transform duration-300 ease-in-out
                    lg:static lg:z-auto lg:flex lg:h-[calc(100vh-4rem)] lg:translate-x-0 lg:shadow-none
                    ${
                        sidebarOpen
                            ? "translate-x-0"
                            : "-translate-x-full"
                    }
                `}
            >
                <div>
                    {/* Mobile header */}
                    <div className="mb-5 flex items-center justify-between px-2 lg:hidden">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Menu
                        </span>

                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition"
                            aria-label="Close menu"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="space-y-1.5">
                        {navigation.map((item) => {
                            const Icon = item.icon;

                            return (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setSidebarOpen(false)}
                                    className={({ isActive }) =>
                                        `group flex items-center gap-3.5 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200 ${
                                            isActive
                                                ? "bg-slate-900 text-white shadow-sm shadow-slate-900/20"
                                                : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <Icon
                                                size={19}
                                                className={`transition-colors duration-200 ${
                                                    isActive
                                                        ? "text-white"
                                                        : "text-slate-400 group-hover:text-slate-700"
                                                }`}
                                            />
                                            <span>{item.name}</span>
                                        </>
                                    )}
                                </NavLink>
                            );
                        })}
                    </nav>
                </div>

                {/* Logout */}
                <div className="border-t border-slate-100 pt-4">
                    <button
                        onClick={logoutHandler}
                        className="group flex w-full items-center gap-3.5 rounded-xl px-3.5 py-2.5 text-sm font-medium text-rose-600 transition-all duration-200 hover:bg-rose-50/80 hover:text-rose-700 active:scale-[0.98]"
                    >                      
                        <LogOut
                            size={19}
                            className="text-rose-500 transition-transform cursor-pointerduration-200 group-hover:-translate-x-0.5 group-hover:text-rose-600"
                        />
                        
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;