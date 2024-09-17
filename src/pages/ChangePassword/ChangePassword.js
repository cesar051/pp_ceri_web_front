import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import RequestOTPsection from "./sections/RequestOTPsection";
import CheckOTPsection from "./sections/CheckOTPsection";
import ChangePasswordsection from "./sections/ChangePasswordsection";
import { areStringsEqual, isAValidLength, isValidMail, isValidPassword } from "../../helpers/stringValidations";
import { toast } from "react-toastify";
import { queryWithBody } from "../../helpers/queryCall";
import { useNavigate } from 'react-router-dom';
import ToogleSectionsTable from "../../components/SectionsToggler/ToogleSectionsTable";

const ChangePassword = () => {
    const [selectedSection, setSelectedSection] = useState('section1');

    const [email, setEmail] = useState('');
    const [OTP, setOTP] = useState('');
    const [password, setPassword] = useState('');
    const [passwordValidation, setPasswordValidation] = useState('');

    const navigate = useNavigate();

    const requestPasswordChange = () => {
        console.log(OTP, password, passwordValidation);

        if (!isAValidLength({ isExact: true, string: OTP, minLength: 6 })) {
            toast.warn("Coloque un codigo de 6 digitos")
            handleSectionChange("section2")
            return;
        }

        if (!isValidPassword({ passwordString: password })) {
            toast.warn("La contraseña debe tener más de 8 caracteres")
            return;
        }

        if (!areStringsEqual({ string1: password, string2: passwordValidation })) {
            toast.warn("Las contraseñas no concuerdan")
            return;
        }
        console.log("pasa");


        const url = `${process.env.REACT_APP_API_URL}/changePassword`;
        const requestData = {
            "email": email,
            "OTPCode": OTP,
            "password": password
        }
        const callBackGetUserBasicInfo = (data) => {
            if (data.statusCode === 200) {
                console.log("enviado");
                toast.success("Se ha cambiado exitosamente")
                navigate("/");
            } else if (data.statusCode === 400 && data.message === "invalid code") {
                toast.warn("Verifique el codigo ")
                handleSectionChange("section2")
            } else {
                console.log(data)
                toast.warn("Ha ocurrido un error")
            }
        }
        const errorCallBackFunctionGetUserBasicInfo = () => {
            toast.warn("Ha ocurrido un error")
        }
        const authParams = {
            requiereAuthentication: false
        }

        queryWithBody(url, requestData, callBackGetUserBasicInfo, errorCallBackFunctionGetUserBasicInfo, authParams, 'POST');

        //handleSectionChange("section2")
    }

    const advanceToPasswordChange = () => {
        console.log(email, isValidMail({ mailString: email }));
        if (!isAValidLength({ isExact: true, string: OTP, minLength: 6 })) {
            toast.warn("Coloque un codigo de 6 digitos")
            return;
        }

        handleSectionChange("section3")
    }

    const requestOTPByEmail = () => {

        console.log(email, isValidMail({ mailString: email }));
        if (!isValidMail({ mailString: email })) {
            toast.warn("Coloque un correo valido")
            return;
        }

        const url = `${process.env.REACT_APP_API_URL}/generatePasswordChange`;
        const requestData = {
            "email": email
        };
        const callBackGetUserBasicInfo = (data) => {
            if (data.statusCode === 200) {
                console.log("enviado");
                handleSectionChange("section2")
            } else {
                toast.warn("Ha ocurrido un error")
            }
        }
        const errorCallBackFunctionGetUserBasicInfo = () => {
            toast.warn("Ha ocurrido un error")
        }
        const authParams = {
            requiereAuthentication: false
        }

        queryWithBody(url, requestData, callBackGetUserBasicInfo, errorCallBackFunctionGetUserBasicInfo, authParams, 'POST');

    }

    const handleSectionChange = (value) => {
        setSelectedSection(value);
    };

    const toggleSectionsElements = {
        haveMenu: false,
        sections: [
            {
                idMenuButton: 'tbg-section1',
                labelMenuButton: 'Sección 1',
                labelValueButton: 'section1',
                element: <RequestOTPsection
                    email={email}
                    setEmail={setEmail}
                    requestOTPByEmail={requestOTPByEmail} />
            },
            {
                idMenuButton: 'tbg-section2',
                labelMenuButton: 'Sección 2',
                labelValueButton: 'section2',
                element: <CheckOTPsection
                    OTP={OTP}
                    setOTP={setOTP}
                    advanceToPasswordChange={advanceToPasswordChange} />
            },
            {
                idMenuButton: 'tbg-section3',
                labelMenuButton: 'Sección 3',
                labelValueButton: 'section3',
                element: <ChangePasswordsection
                    password={password}
                    setPassword={setPassword}
                    passwordValidation={passwordValidation}
                    setPasswordValidation={setPasswordValidation}
                    requestPasswordChange={requestPasswordChange} />
            },

        ]
    }

    return (
        <>
            <ToogleSectionsTable
                toggleSectionsElements={toggleSectionsElements}
                selectedSection={selectedSection}
                setSelectedSection={setSelectedSection}
                handleSectionChange={handleSectionChange}
            />
        </>
    );
}

export default ChangePassword;