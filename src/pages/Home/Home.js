import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";

const Home = () => {
    const auth = useAuth();
    const handleSignOut = () => {
        console.log("saliendo")
        auth.signOut()
    };
    return (
        <>
            <div>
                esto es un home
                <button onClick={handleSignOut}>
                    Salir
                </button>
                <Link to="/admin/users">admin users</Link>
                <Link to="/admin/upload">admin subir iva</Link>
            </div>
        </>
    );
}

export default Home;