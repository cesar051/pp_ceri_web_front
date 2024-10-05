import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

const UserAdmin = () => {

    const auth = useAuth();
    if (auth.isAuthenticated) {
        console.log("userADmin");
        console.log(auth.getUser());
    }
    return auth.getUser().perfil === "1" ? <Outlet /> : <Navigate to="/my/home" />;
}

export default UserAdmin;