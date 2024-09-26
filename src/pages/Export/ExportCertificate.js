import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';

const ExportCertificate = () => {

    const location = useLocation();
    const { actionExport } = location.state || {}; // Recibe el objeto user

    console.log(actionExport);


    return (
        <>
            Exportar certificado {actionExport}
        </>
    );
}

export default ExportCertificate;