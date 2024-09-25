import React from 'react';
import { Table } from 'react-bootstrap';

const ExcelViewer = ({ excelData }) => {

    return (
        <>
            {excelData && (
                <div>
                    <h3>Vista previa de los datos del Excel:</h3>
                    {/* Contenedor para la tabla con scroll */}
                    <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    {/* Renderizar las cabeceras de la tabla */}
                                    {Object.keys(excelData[0]).map((key) => (
                                        <th key={key}>{key}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {/* Renderizar los datos de cada fila */}
                                {excelData.map((row, index) => (
                                    <tr key={index}>
                                        {Object.values(row).map((val, i) => (
                                            <td key={i}>{val}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            )}
        </>
    );
};

export default ExcelViewer;
