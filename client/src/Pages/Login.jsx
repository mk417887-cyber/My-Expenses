import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const location = useLocation();

    {location.state?.message && (
        <p>{location.state.message}</p>
    )}

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
            <form onSubmit={handleSubmit} >
                <input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </div>
    )
};

export default Login;