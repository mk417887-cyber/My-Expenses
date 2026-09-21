import { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Register = () => {

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(name, email, password);

        setLoading(true);
        try {
            const response = await fetch( // It is a JavaScript Response object containing information about the HTTP response
                "http://localhost:3001/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password
                    })
                }
            )

            const data = await response.json();
            // it will give us
            // {
            //     success: true,
            //     message: "User created successfully"
            // }


            if (!response.ok) {
                // registration failed
                setError(data.message);
            } else {
                // registration succeeded
                setError("");
                console.log("User created successfully");
                navigate("/login", {
                    state: { // The state here is not React useState. It's data attached to this particular navigation.
                        message: "Registration successful. Please login."
                    }
                });
            }
            console.log(data);
        }
        catch (error){
            console.log(error);
            setError("Something went wrong");
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit} >
                <input type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
    )
}

export default Register