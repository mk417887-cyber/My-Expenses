
// const Register = () => {
//    

//     return (
//         <div>
//          

//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     placeholder="Enter name"
//                     value={name}
//                   
//                 />

//                 <input
//                     type="email"
//                     placeholder="Enter email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                 />

//                 <input
//                     type="password"
//                     placeholder="Enter password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />

//                 <button type="submit" disabled={loading}>
//                     {loading ? "Registering..." : "Register"}
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default Register;

import {
    User,
    Mail,
    Lock,
    Eye,
    ArrowRight,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const Register = () => {

    const navigate = useNavigate();
    const { register } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            await register(name, email, password);

            navigate("/login", {
                state: {
                    message: "Registration successful. Please login."
                }
            });
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {error && <p>{error}</p>}
            <div className="min-h-screen bg-zinc-200 text-white flex items-center justify-center px-4 py-10">
                <div className="w-full max-w-md">

                    {/* Logo / Heading */}
                    <div className="text-center mb-8">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-black">
                            <span className="text-xl font-bold">M</span>
                        </div>

                        <h1 className="text-3xl font-bold tracking-tight">
                            Create an account
                        </h1>

                        <p className="mt-2 text-sm text-zinc-400">
                            Get started by creating your account
                        </p>
                    </div>

                    {/* Card */}
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-2xl">
                        <form className="space-y-5" onClick={handleSubmit}>

                            {/* Name */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-zinc-300">
                                    Full name
                                </label>

                                <div className="relative">
                                    <User
                                        size={18}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                                    />

                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950 py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-zinc-600 transition focus:border-zinc-500"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-zinc-300">
                                    Email
                                </label>

                                <div className="relative">
                                    <Mail
                                        size={18}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                                    />

                                    <input
                                        type="email"
                                        placeholder="you@example.com"
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950 py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-zinc-600 transition focus:border-zinc-500"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-zinc-300">
                                    Password
                                </label>

                                <div className="relative">
                                    <Lock
                                        size={18}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                                    />

                                    <input
                                        type="password"
                                        placeholder="Create a password"
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950 py-3 pl-10 pr-11 text-sm text-white outline-none placeholder:text-zinc-600 transition focus:border-zinc-500"
                                    />

                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                                    >
                                        <Eye size={18} />
                                    </button>
                                </div>

                                <p className="mt-2 text-xs text-zinc-600">
                                    Use at least 6 characters.
                                </p>
                            </div>

                            {/* Confirm password */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-zinc-300">
                                    Confirm password
                                </label>

                                <div className="relative">
                                    <Lock
                                        size={18}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                                    />

                                    <input
                                        type="password"
                                        placeholder="Confirm your password"
                                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950 py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-zinc-600 transition focus:border-zinc-500"
                                    />
                                </div>
                            </div>

                            {/* Register */}
                            <button
                                type="submit"
                                className="flex w-full items-center justify-center gap-2 rounded-lg bg-white py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
                            >
                                Create account
                                <ArrowRight size={17} />
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="my-6 flex items-center gap-3">
                            <div className="h-px flex-1 bg-zinc-800" />
                            <span className="text-xs text-zinc-600">OR</span>
                            <div className="h-px flex-1 bg-zinc-800" />
                        </div>

                        {/* Google */}
                        <button className="flex w-full items-center justify-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950 py-3 text-sm font-medium text-zinc-200 transition hover:bg-zinc-800">
                            Continue with Google
                        </button>

                        {/* Login */}
                        <p className="mt-6 text-center text-sm text-zinc-500">
                            Already have an account?{" "}
                            <a
                                href="/login"
                                className="font-medium text-white hover:underline"
                            >
                                Sign in
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;