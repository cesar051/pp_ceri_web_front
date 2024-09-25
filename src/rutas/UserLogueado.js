import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

const UserLogueado = () => {

    const auth = useAuth();
    if (auth.isAuthenticated) {
        console.log(auth.getUser());
    }
    return auth.isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

export default UserLogueado;