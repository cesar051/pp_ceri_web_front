import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider";

const UserLogueado = () => {

    const auth = useAuth();
    if (auth.isAuthenticated) {
        console.log("user");

        console.log(auth.getUser());
        console.log(auth.getUser().perfil);
    }
    return auth.isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

export default UserLogueado;