// Hum kya kar rahe hain?
// Hum AuthContext bana rahe hain taaki poori React application ko pata rahe ki kaunsa user login hai aur uska JWT token kya hai.

// Kyon?
// Agar Context nahi use karenge, toh user aur token ko Navbar → Layout → Pages → Components mein props ke through baar-baar pass karna padega.
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

    const navigate = useNavigate();

    const [token, setToken] = useState(
        () => localStorage.getItem("token")
    );

    const [user, setUser] = useState(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            return null;
        }

        try {
            return jwtDecode(token);
        } catch (error) {
            return null;
        }
    });

    console.log(user);

    const isAuthenticated = Boolean(token);
    //------------------
    //--Register Fetching--
    //------------------
    const register = async (name, email, password) => { // backend mein account create karega.
        const response = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/api/auth/register`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Registration failed");
        }

        return data;
    };
    // ------------------
    //--Login Fetching--
    // ------------------

    const login = async (email, password) => { // credentials verify karke JWT token dega aur frontend token save karega.

        
        const response = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Login failed");
        }

        localStorage.setItem("token", data.token);
        setToken(data.token);

        const decodedUser = jwtDecode(data.token);
        setUser(decodedUser); // Ab hum JWT ke andar jo id, name, aur email hai usko frontend ke user state mein la rahe hain.


        return data;

    };

    // ------------------
    //--Logout Fetching--
    // ------------------

    const logout = () => { // JWT delete karega aur user ko logged-out state mein le jayega.
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    
useEffect(() => { // "React, after rendering this component, I want you to perform this external operation."
    
    const handleUnauthorized = () => {
        logout();


        navigate("/login", {
            replace: true,
            state: {
                message: "Your session has expired. Please log in again.",
            },
        });

    };
        // side effect
        window.addEventListener( // "Browser, whenever an unauthorized event happens, run handleUnauthorized."
            "unauthorized",
            handleUnauthorized
        );
    
        return () => { // "React, after unmounting this component, I want you to perform this external operation."
            window.removeEventListener(
                "unauthorized",
                handleUnauthorized
            );
        };
    }, []); // Run this effect when this component is mounted, rather than after every render.
    

    return (
        <AuthContext.Provider value={{ //    available to any component using useAuth()

            user,
            token,
            isAuthenticated,
            login,
            logout,
            register
        }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => {
    return useContext(AuthContext);
};