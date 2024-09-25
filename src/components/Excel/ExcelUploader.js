import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Button, Container, Toast } from 'react-bootstrap';
import ExcelFileInput from './ExcelFileInput';
import ExcelViewer from './ExcelViewer';
import { ExcelDataValidator } from '../../helpers/ExcelFunctions/ExcelDataValidator';
import { toast } from 'react-toastify';
import { queryWithBody } from '../../helpers/queryCall';
import { useAuth } from '../../auth/AuthProvider';

const ExcelUploader = ({ handleFileUpload, fileName, excelData, handleSubmit }) => {

    return (
        <Container>
            <ExcelFileInput handleFileUpload={handleFileUpload} fileName={fileName} />

            <ExcelViewer excelData={excelData} />

            <Button onClick={handleSubmit} disabled={!excelData} className="mt-3">
                Subir a la base de datos
            </Button>
        </Container>
    );
};

export default ExcelUploader;
