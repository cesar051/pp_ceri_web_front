import React, { useState } from 'react';
import { useAuth } from "../../auth/AuthProvider";
import ExcelUploader from "../../components/Excel/ExcelUploader";
import { requiredColumnsUploadIVA } from "../../constants";
import * as XLSX from 'xlsx';
import { ExcelDataValidator } from "../../helpers/ExcelFunctions/ExcelDataValidator";
import { toast } from "react-toastify";
import { queryWithBody } from "../../helpers/queryCall";

const UploadReteIVA = () => {

    const convertKeysToLowerCaseAndRemoveSpaces = (array) => {
        return array.map(obj => {
            return Object.keys(obj).reduce((acc, key) => {
                const cleanedKey = key.trim().toLowerCase().replace(/\s+/g, ''); // Quita espacios y convierte a minúsculas
                acc[cleanedKey] = obj[key]; // Añadir la clave ajustada y su valor
                return acc;
            }, {});
        });
    };

    const [excelData, setExcelData] = useState(null);
    const [fileName, setFileName] = useState("");

    const auth = useAuth();

    const castDate = (date) => {
        return new Date(1899, 11, 30 + date).toLocaleDateString()
    }

    const handleFileUpload = (e) => {
        const file = e.target.files[0];

        if (!file || !file.name) {
            setExcelData(null)
            toast.warn("ha ocurrido un error, por favor recargue la página")
            return
        }

        setFileName(file.name);

        const reader = new FileReader();

        reader.onload = (event) => {
            const arrayBuffer = event.target.result;
            const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });
            const sheetName = workbook.SheetNames[0]; // Obtiene la primera hoja
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet); // Convierte la hoja a JSON
            const jsonDataFormated = convertKeysToLowerCaseAndRemoveSpaces(jsonData);
            console.log(jsonDataFormated);
            if (ExcelDataValidator(jsonDataFormated, requiredColumnsUploadIVA)) {
                setExcelData(jsonDataFormated); // Guarda los datos para renderizarlos y luego enviarlos
            } else {
                console.log("data no valida");
                toast.warn("Los campos del archivo no coinciden con los esperados")
                setExcelData(null)
            }
        };

        reader.readAsArrayBuffer(file); // Leer el archivo como ArrayBuffer
    };


    const handleSubmit = async () => {
        if (!excelData) {
            alert('No hay datos para enviar.');
            return;
        }

        const url = `${process.env.REACT_APP_API_URL}/uploadDataIVA`;
        const requestData = {
            jsonData: excelData
        }
        const callBackGetUserBasicInfo = (data) => {
            console.log(data);

            if (data.statusCode === 200) {
                console.log("enviado");
                toast.success("Se ha subido exitosamente")

            } else {
                console.log(data)
                toast.warn("Ha ocurrido un error")
            }
        }
        const errorCallBackFunctionGetUserBasicInfo = () => {
            toast.warn("Ha ocurrido un error")
        }
        const authParams = {
            requiereAuthentication: true,
            token: auth.getAccessToken()
        }

        queryWithBody(url, requestData, callBackGetUserBasicInfo, errorCallBackFunctionGetUserBasicInfo, authParams, 'POST');
    };

    return (
        <>
            <ExcelUploader
                handleFileUpload={handleFileUpload}
                fileName={fileName}
                excelData={excelData}
                handleSubmit={handleSubmit} />
        </>
    );
}

export default UploadReteIVA;