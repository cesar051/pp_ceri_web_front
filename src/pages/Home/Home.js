import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";
import Menu_left_home from './menu_left_home';
import Menu from './menu';

const Home = () => {
    const auth = useAuth();
    const handleSignOut = () => {
        console.log("saliendo")
        auth.signOut()
    };
    return (
        <>
         <div className="col">
    <Menu />
    </div>
   <div className="container text-center">
  <div className="row align-items-start">
    <div className="col">
    <Menu_left_home />
    </div>
    <div className="col">
      One of two columns
    </div>
    </div>
</div>



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