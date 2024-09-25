import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { is18OrOlder, isValidMail, isValidPassword, areStringsEqual, isAValidLength } from '../helpers/stringValidations';
import { verifyFields } from '../helpers/formValidator';
import { queryWithBody } from "../helpers/queryCall";

const SignUpForm = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        nit: '',
        numero: '',
        fechaNacimiento: '',
        password: '',
        passwordValidation: ''
    });

    let validacionesCamposRegistro = [
        {
            hook: is18OrOlder,
            params: { dateString: formData.fechaNacimiento },
            errorMessage: "Debes ser mayor de 18 años para registrarte."
        },
        {
            hook: isValidMail,
            params: { mailString: formData.email },
            errorMessage: "Mail no válido"
        },
        {
            hook: isAValidLength,
            params: {
                isExact: true,
                string: formData.nit,
                minLength: 9
            },
            errorMessage: "El NIT debe tener 9 digitos"
        },
        {
            hook: areStringsEqual,
            params: { string1: formData.password, string2: formData.passwordValidation },
            errorMessage: "Las contraseñas no coinciden"
        },
        {
            hook: isValidPassword,
            params: { passwordString: formData.password },
            errorMessage: "Contraseña invalida"
        }
    ]

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const createNewUser = (data) => {

        const url = `${process.env.REACT_APP_API_URL}/userSignUp`;
        const requestData = data;

        const callBackREgisterNewUser = (data) => {
            console.log(data)
            if (data && data.statusCode == 200 && data.dataInsertedId[0].id) {
                toast.success(`se ha creado el usuario `)
                navigate("/");
            } else if (data && data.statusCode === 400 && data.message === "mail already exist") {
                toast.info(`El correo ya se encuentra registrado `)
            } else {
                toast.info(`Ha ocurrido un error interno`)
            }
        }
        const errorCallBackFunctionRegister = () => { }
        const authParams = {
            requiereAuthentication: false
        }

        queryWithBody(url, requestData, callBackREgisterNewUser, errorCallBackFunctionRegister, authParams, 'POST');

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(process.env.REACT_APP_API_URL);
        // Aquí realizarías la lógica para enviar los datos al servidor
        //console.log('data:', formData);

        //console.log("formulario valido " + verifyFields(validacionesCamposRegistro));
        if (verifyFields(validacionesCamposRegistro)) {
            //console.log('data:', formData);
            createNewUser(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Nombre o Razon Social</label>
                <input type="name" className="form-control"
                    id="name" placeholder="" name="name" value={formData.name} onChange={(e) => handleInputChange(e)} />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control"
                    id="email" placeholder="Email" name="email" value={formData.email} onChange={(e) => handleInputChange(e)} />
            </div>
            <div className="form-group">
                <label htmlFor="nit">NIT</label>
                <input type="number" className="form-control"
                    id="nit" placeholder="Ingrese su NIT" name="nit" value={formData.nit} onChange={(e) => handleInputChange(e)} />
            </div>
            <div className="form-group">
                <label htmlFor="numero">Numero de contacto</label>
                <input type="number" className="form-control"
                    id="numero" placeholder="3158654798" name="numero" value={formData.numero} onChange={(e) => handleInputChange(e)} />
            </div>
           
            <div className="form-group">
                <label htmlFor="password">Contraseña</label>

                <input type="password" className="form-control"
                    id="password" placeholder="Contraseña" name="password" value={formData.password} onChange={(e) => handleInputChange(e)} />
            </div>
            <div className="form-group">
                <label htmlFor="passwordValidation">Repetir Contraseña</label>
                <input type="password" className="form-control"
                    id="passwordValidation" placeholder="Repita su contraseña" name="passwordValidation" value={formData.passwordValidation} onChange={(e) => handleInputChange(e)} />
            </div>
            <div className="form-group form-group-margin"> {/* Create a dedicated margin class */}
                <button type="submit" className="btn btn-primary">
                    Registrarse
                </button>
            </div>
        </form>
    );
};

export default SignUpForm;