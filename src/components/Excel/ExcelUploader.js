import React from 'react';
import { Button, Container } from 'react-bootstrap';
import ExcelFileInput from './ExcelFileInput';
import ExcelViewer from './ExcelViewer';
import './ExcelFileInput.css';

const ExcelUploader = ({ handleFileUpload, fileName, excelData, handleSubmit }) => {

    return (
        <Container>
            <ExcelFileInput handleFileUpload={handleFileUpload} fileName={fileName} />

            <ExcelViewer excelData={excelData} />

            <Button onClick={handleSubmit} disabled={!excelData} className="mt-3">
                Guardar
            </Button>
        </Container>
    );
};

export default ExcelUploader;
