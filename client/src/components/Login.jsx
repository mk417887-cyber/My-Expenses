import { useState } from "react"
import { useLocation } from "react-router-dom"

const Login = () => {

    const location = useLocation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const[error , setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault(); // no page refresh
       
try{
        const response = await fetch( // It is a JavaScript Response object containing information about the HTTP response
            "http://localhost:3001/api/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password
                })
            }
        )

        const data = await response.json();
        
        if (!response.ok) {
            // login failed
            setError(data.message);
        } else {
            // login successful
            setError("");
            console.log("User Login successfully");
            // localStorage.setItem(key, value)
            localStorage.setItem("token", data.token);

        }

        console.log("Status:", response.status);
        console.log("Response:", data);

    } catch (error) {
        console.error("Error:", error);
        setError("Something went wrong");
    }
    }

  return (
    <div>
        {location.state?.message && (
    <p>{location.state.message}</p>
)}
        <form onSubmit = {handleSubmit} >
            <input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button type="submit">Login</button>
        </form>
    </div>
  )
}

export default Login