import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';
import "jspdf-autotable";
import { AVAILABLE_YEARS_FOR_EXPORT, AVAILABLE_PERIODS_FOR_EXPORT } from "../../constants";
import { useAuth } from "../../auth/AuthProvider";
import { generatePDF } from "./generatePDF";
import { toast } from "react-toastify";
import { queryWithBody } from "../../helpers/queryCall";
import './ExportCertificate.css';

const ExportCertificate = () => {

    const location = useLocation();
    const { actionExport } = location.state || {}; // Recibe el objeto user
    const auth = useAuth();
    //console.log(actionExport);

    const [pdfUrl, setPdfUrl] = useState(null);
    const [year, setYear] = useState('');
    const [periodo, setPeriodo] = useState('');

    //const generatePDF = () => 
    const getPDFURL = () => {

        if (!periodo) {
            toast.warn("Recuerde llenar periodo")
            return
        }

        if (!year) {
            toast.warn("Recuerde llenar año")
            return
        }

        if (!auth || !auth.getUser() || !auth.getUser().nit || !actionExport || !auth.getAccessToken()) {
            toast.warn("Error interno")
            return
        }

        const url = `${process.env.REACT_APP_API_URL}/getCertificateInfo`;
        const requestData = {
            nit: auth.getUser().nit,
            periodo: periodo,
            year: year,
            concepto: actionExport
        };

        const callBackGetCertificateInfo = (data) => {
            if (data.statusCode === 200) {

                if (data.data.length < 1) {
                    toast.info("No hay datos para el año y periodo especificados")
                    return
                }

                console.log(data);
                console.log(data.data.length);

                setPdfUrl(generatePDF({
                    nit: auth.getUser().nit,
                    periodo: periodo,
                    year: year,
                    concepto: actionExport,
                    DBData: data.data
                }))
            }
        }
        const errorCallBackFunctionGetUserBasicInfo = () => { }
        const authParams = {
            requiereAuthentication: true,
            token: auth.getAccessToken()
        }

        queryWithBody(url, requestData, callBackGetCertificateInfo, errorCallBackFunctionGetUserBasicInfo, authParams, 'POST');

        //setPdfUrl(generatePDF())
    }

    useEffect(() => {
        setPdfUrl(null)
        setYear('')
        setPeriodo('')
    }, [location.state])


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(process.env.REACT_APP_API_URL);

    };

    const handleYearChange = (e) => {
        setYear(e.target.value)
    };
    const handlePeriodoChange = (e) => {
        setPeriodo(e.target.value)
    };

    return (
        <>
        <p></p>
        
          <h2>Exportar certificado {actionExport}</h2>  

            <div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="year">Año : </label>
                        <select id="select" value={year} onChange={(e) => handleYearChange(e)}>
                            <option value="">Seleccione</option>
                            {AVAILABLE_YEARS_FOR_EXPORT.map((item, index) => (
                                <option key={index} value={item.value}>{item.label}</option>
                            ))}
                        </select>

                    </div>
                    <div className="form-group">
                        <label htmlFor="periodo">Periodo: </label>
                        <select id="select" value={periodo} onChange={(e) => handlePeriodoChange(e)}>
                            <option value="">Seleccione</option>
                            {AVAILABLE_PERIODS_FOR_EXPORT.map((item, index) => (
                                <option key={index} value={item.value}>{item.label}</option>
                            ))}
                        </select>
                    </div>
                </form>

                <button onClick={getPDFURL}>Generar PDF</button>

                {pdfUrl && (
                    <iframe
                        src={pdfUrl}
                        style={{ width: "100%", height: "500px" }}
                        title="Vista previa del PDF"
                    />
                )}
            </div>
        </>
    );
}

export default ExportCertificate;