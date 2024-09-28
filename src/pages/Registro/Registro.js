import React from "react";
import SignUpForm from "../../components/SignUpForm";
import './registro.css';

const Registro = () => {
    return (
        <>
            <div  className="body_col-color">
            <p className="P-color">Registre su Informacion Para crear su respectivo usuario.</p>
            
                <SignUpForm />
            </div>
        </>
    );
}

export default Registro;