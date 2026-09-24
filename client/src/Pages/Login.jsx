

// const Login = () => {


//     return (
//         <div>

//             <form onSubmit={handleSubmit} >
//                 <input type="email" placeholder="Enter email" />
//                 <input type="password" placeholder="Enter password" />
//                 <button >Login</button>
//             </form>
//             not registered yet 
//             <div>  <button >Register</button></div>

//         </div>
//     )
// };

// export default Login;



import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();
    const { login } = useAuth();

    const toRegister = () => {
        navigate("/register");
    };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const location = useLocation();

    {
        location.state?.message && (
            <p>{location.state.message}</p>
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        try {
            await login(email, password);

            navigate("/dashboard", {
                state: {
                    message: "Login successful."
                }

            });
            console.log("User Login successfully");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>

            {error && (
                <p className="text-sm text-red-600">
                    {error}
                </p>
            )}
            <div className="min-h-screen bg-zinc-200 text-white flex items-center justify-center px-4">
                <div className="w-full max-w-md">
                    {/* Logo / Brand */}
                    <div className="text-center mb-8">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-black">
                            <span className="text-xl font-bold">M</span>
                        </div>

                        <h1 className="text-3xl font-bold tracking-tight">
                            Welcome back
                        </h1>

                        <p className="mt-2 text-sm text-zinc-400">
                            Sign in to continue to your account
                        </p>
                    </div>

                    {/* Card */}
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-2xl">
                        <form className="space-y-5" onSubmit={handleSubmit}>

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
                                        value={email} onChange={(e) => setEmail(e.target.value)} 
                                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950 py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-zinc-600 transition focus:border-zinc-500"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <label className="text-sm font-medium text-zinc-300">
                                        Password
                                    </label>

                                    <button
                                        type="button"
                                        className="text-xs text-zinc-400 hover:text-white transition"
                                    >
                                        Forgot password?
                                    </button>
                                </div>

                                <div className="relative">
                                    <Lock
                                        size={18}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                                    />

                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        value={password} onChange={(e) => setPassword(e.target.value)}
                                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950 py-3 pl-10 pr-11 text-sm text-white outline-none placeholder:text-zinc-600 transition focus:border-zinc-500"
                                    />

                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                                    >
                                        <Eye size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Login button */}
                            <button
                                type="submit"
                                className="flex w-full items-center justify-center gap-2 rounded-lg bg-white py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
                            >
                                Sign in
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

                        {/* Register */}
                        <p className="mt-6 text-center text-sm text-zinc-500">
                            Don't have an account?{" "}
                            <a
                                
                                className="font-medium text-white hover:underline"
                                onClick={toRegister}
                            >
                                Create account
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;