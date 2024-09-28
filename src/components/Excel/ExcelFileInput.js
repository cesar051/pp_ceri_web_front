import React from 'react';
import  './ExcelFileInput.css';


const ExcelFileInput = ({ handleFileUpload, fileName }) => {

    return (
        <>
            <h2>Importar archivo Excel   .xls</h2>
            <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
                className="mb-3"
            />
            {fileName && <p>Archivo seleccionado: {fileName}</p>}
        </>
    );
};

export default ExcelFileInput;
