import React from "react";
import { useAuth } from "../../auth/AuthProvider";
import Menu_left_home from './Menu_left_home';
import Menu from './menu';
import './menu.css';

const Home = ({ renderElement }) => {
    const auth = useAuth();
    const handleSignOut = (e) => {
        e.preventDefault();
        console.log("saliendo")
        auth.signOut()
    };

    return (
        <>
            <div className="col">
                <Menu auth={auth} handleSignOut={handleSignOut} />
            </div>
            <div className="container text-center">
                <div className="row align-items-start">
                    <div className="col leftColumnContainer">
                        <Menu_left_home auth={auth} />
                    </div>
                    <div className="col">
                        {renderElement}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;