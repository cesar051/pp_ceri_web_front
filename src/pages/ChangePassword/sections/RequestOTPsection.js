import React from "react";
import './Changepassword.css';

const RequestOTPsection = (props) => {

    return (
        <>
            <div className="containerdasboard">

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control"
                        id="email" placeholder="Ingrese su email" value={props.email} onChange={(e) => props.setEmail(e.target.value)} />
                </div>

                <div className="form-group form-group-margin"> {/* Create a dedicated margin class */}
                    <button type="submit" className="btn btn-primary" onClick={() => props.requestOTPByEmail()}>
                        Enviar codigo de seguridad
                    </button>
                </div>
            </div>
        </>
    );
}

export default RequestOTPsection;