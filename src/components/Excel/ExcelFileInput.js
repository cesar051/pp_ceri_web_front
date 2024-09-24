import React from 'react';

const ExcelFileInput = ({ handleFileUpload, fileName }) => {

    return (
        <>
            <h2>Subir archivo Excel</h2>
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
