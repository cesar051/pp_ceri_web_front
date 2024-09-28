import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { AVAILABLE_YEARS_FOR_EXPORT, AVAILABLE_PERIODS_FOR_EXPORT } from "../../constants";
import { useAuth } from "../../auth/AuthProvider";
import { generatePDF } from "./generatePDF";

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
        setPdfUrl(generatePDF())
    }


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
            Exportar certificado {actionExport}

            <div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="year">Año</label>
                        <select id="select" value={year} onChange={(e) => handleYearChange(e)}>
                            {AVAILABLE_YEARS_FOR_EXPORT.map((item, index) => (
                                <option key={index} value={item.value}>{item.label}</option>
                            ))}
                        </select>

                    </div>
                    <div className="form-group">
                        <label htmlFor="periodo">Periodo</label>
                        <select id="select" value={periodo} onChange={(e) => handlePeriodoChange(e)}>
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