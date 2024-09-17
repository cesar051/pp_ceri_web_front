import React from "react";

const CheckOTPsection = (props) => {

    return (
        <>
            <div>
                <div className="form-group">
                    <label htmlFor="codigo">Ingrese el codigo de 6 digitos que le enviamos al correo</label>
                    <input type="number" className="form-control"
                        id="codigo" placeholder="Ingrese su codigo" value={props.OTP} onChange={(e) => props.setOTP(e.target.value)} />
                </div>

                <div className="form-group form-group-margin"> {/* Create a dedicated margin class */}
                    <button type="submit" className="btn btn-primary" onClick={() => props.advanceToPasswordChange()}>
                        Continuar
                    </button>

                </div>
            </div>
        </>
    );
}

export default CheckOTPsection;