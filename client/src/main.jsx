import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";

createRoot(document.getElementById("root")).render(
    
        <BrowserRouter>
            <AuthProvider>       {/* // poori application ko authentication state available hai. // Taaki authentication data ko baar-baar props ke through pass na karna pade.  */}
                <Toaster position="top-right" />
                <App />
            </AuthProvider>
        </BrowserRouter>
   
);