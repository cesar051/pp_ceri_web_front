import React from "react";
import SignUpForm from "../../components/SignUpForm";
import './Registro.css';
import p_menu from '../Home/menu';

const Registro = () => {
    return (
        <>

<div>
              
                <p_menu />
          
</div>
            <div  className="body_col-color">
            <p className="P-color">Registre su Informacion Para crear su respectivo usuario.</p>
            
                <SignUpForm />
            </div>
        </>
    );
}

export default Registro;