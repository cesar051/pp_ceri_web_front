import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { AVAILABLE_YEARS_FOR_EXPORT, AVAILABLE_PERIODS_FOR_EXPORT } from "../../constants";
import { useAuth } from "../../auth/AuthProvider";

export function generatePDF() {

    const cellValues = {
        '0,6': ['Fecha de Expedición (Dia.mes.año)', '15.03.2024'],
        '1,6': ['Año fiscal', '2024'],
        '2,0': ['Ciudad donde se consignó la retención', 'Bogotá, D.C.'],
        '3,0': ['Nombre o Razón Social a quien se le practica la retención', 'LABORATORIOS DERMANET S.A.S.'],
        '3,6': ['CC o NIT', '800082633'],
        '4,0': ['Razón Social completa', 'ALMACENES MAXIMO S.A.S.'],
        '4,6': ['CC o NIT', '800082633'],
        '5,0': ['Dirección del agente retenedor', 'Carrera 106 No.15A'],
        '5,4': ['Municipio', 'Bogotá'],
        '5,6': ['Departamento', 'Cundinamarca'],
    }

    const doc = new jsPDF();

    // Crear tabla que engloba todo el contenido
    doc.autoTable({
        theme: 'grid',
        body: [
            [{
                content: 'CERTIFICADO DE RETENCIÓN EN LA FUENTE DE I.V.A',
                colSpan: 6, // Esto hace que la celda ocupe 6 columnas
                rowSpan: 2,
                styles: { halign: 'center', valign: 'center', fontStyle: 'bold', fontSize: 12 },
            },
            {
                content: ` \n `,
                colSpan: 2, // Ocupa las 6 columnas
                styles: { halign: 'center', fontSize: 10 },
            }],
            [{
                content: ' \n ',
                colSpan: 2, // Ocupa las 6 columnas
                styles: { halign: 'center', fontSize: 10 },
            }],
            [{
                content: ' \n ',
                colSpan: 8, // Ocupa las primeras 3 columnas
                styles: { fontSize: 10 },
            }],
            [{
                content: ' \n ',
                colSpan: 6, // Ocupa las últimas 3 columnas
                styles: { fontSize: 10 },
            }, {
                content: ` \n `,
                colSpan: 2, // Ocupa 2 columnas
                styles: { fontSize: 10 },
            }],
            [{
                content: ' \n ',
                colSpan: 6, // Ocupa 4 columnas
                styles: { fontSize: 10 },
            }, {
                content: ' \n ',
                colSpan: 2, // Ocupa 2 columnas
                styles: { fontSize: 10 },
            }],
            [{
                content: ' \n ',
                colSpan: 4, // Ocupa las 3 columnas completas
                styles: { fontSize: 10 },
            }, {
                content: ' \n ',
                colSpan: 2, // Ocupa las 2 columnas completas
                styles: { fontSize: 10 },
            }, {
                content: ' \n ',
                colSpan: 2, // Ocupa las 2 columnas completas
                styles: { fontSize: 10 },
            }],
        ],
        didDrawCell: (data) => {
            // Identificamos la celda donde queremos aplicar el estilo mixto
            // Verificar si la celda y textPos existen antes de acceder a ellas
            console.log(data);

            if (cellValues[`${data.row.index},${data.column.index}`]) {
                const doc = data.doc;
                const cell = data.cell;
                const textPos = cell;

                // Dibujar texto en negrita
                doc.setFont('helvetica', 'bold');
                doc.text(cellValues[`${data.row.index},${data.column.index}`][0], textPos.x + 1, textPos.y + 5);

                // Dibujar texto normal (ajustando la posición)
                doc.setFont('helvetica', 'normal');
                doc.text(cellValues[`${data.row.index},${data.column.index}`][1], textPos.x + 1, textPos.y + 5 + 4);
            }
        }
    });

    doc.autoTable({
        theme: 'grid',
        head: [
            [
                {
                    content: 'Concepto',
                    colSpan: 8, // Esto hace que la celda ocupe 6 columnas
                    styles: { halign: 'center', fontStyle: 'bold', fontSize: 10, valign: 'center' },
                },
                {
                    content: `Periodo`,
                    colSpan: 2, // Ocupa las 6 columnas
                    styles: { halign: 'center', fontSize: 10, valign: 'center' },
                },
                {
                    content: `% retención`,
                    colSpan: 2, // Ocupa las 6 columnas
                    styles: { halign: 'center', fontSize: 10 },
                },
                {
                    content: `Monto Total`,
                    colSpan: 2, // Ocupa las 6 columnas
                    styles: { halign: 'center', fontSize: 10 },
                },
                {
                    content: `Valor IVA`,
                    colSpan: 2, // Ocupa las 6 columnas
                    styles: { halign: 'center', fontSize: 10, valign: 'center' },
                },
                {
                    content: `Valor retenido`,
                    colSpan: 2, // Ocupa las 6 columnas
                    styles: { halign: 'center', fontSize: 10 },
                }
            ]
        ],
        body: [

            [{
                content: 'reteiva',
                colSpan: 8, // Esto hace que la celda ocupe 6 columnas
                styles: { halign: 'left', fontSize: 10 },
            },
            {
                content: `1`,
                colSpan: 2, // Ocupa las 6 columnas
                styles: { halign: 'center', fontSize: 10 },
            },
            {
                content: `15% `,
                colSpan: 2, // Ocupa las 6 columnas
                styles: { halign: 'center', fontSize: 10 },
            },
            {
                content: `7656767`,
                colSpan: 2, // Ocupa las 6 columnas
                styles: { halign: 'center', fontSize: 10 },
            },
            {
                content: `323123`,
                colSpan: 2, // Ocupa las 6 columnas
                styles: { halign: 'center', fontSize: 10 },
            },
            {
                content: `2312331`,
                colSpan: 2, // Ocupa las 6 columnas
                styles: { halign: 'center', fontSize: 10 },
            }],
            [{
                content: 'Total',
                colSpan: 10, // Esto hace que la celda ocupe 6 columnas
                styles: { halign: 'left', fontStyle: 'bold', fontSize: 10 },
            },
            {
                content: ``,
                colSpan: 2, // Ocupa las 6 columnas
                styles: { halign: 'center', fontSize: 10 },
            },
            {
                content: `7656767`,
                colSpan: 2, // Ocupa las 6 columnas
                styles: { halign: 'center', fontSize: 10 },
            },
            {
                content: `323123`,
                colSpan: 2, // Ocupa las 6 columnas
                styles: { halign: 'center', fontSize: 10 },
            },
            {
                content: `2312331`,
                colSpan: 2, // Ocupa las 6 columnas
                //styles: { halign: 'center', fontSize: 10 },
            }],
            [{
                content: ' ',
                colSpan: 2, // Ocupa las 6 columnas
                styles: { halign: 'center', fontSize: 10 },
            }]
        ],
        didParseCell: function (data) {
            // Eliminar los bordes de la última fila (índice 3)
            if (data.row.index === 2) {
                // Eliminar los bordes izquierdo, derecho y abajo
                data.cell.styles.lineWidth = { top: 0.5, bottom: 0, left: 0, right: 0 };
            }
        }
    });

    // Agregar la nota final dentro de la tabla principal
    doc.autoTable({
        startY: doc.lastAutoTable.finalY + 10,
        body: [
            [{
                content:
                    'De acuerdo con el Artículo 7 parágrafo decreto reglamentario 380 de 1996 los certificados expedidos por computador no requieren firma autógrafa.',
                styles: { fontSize: 10, halign: 'left' },
            }],
        ],
    });

    // Generar el blob del PDF para renderizar
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    //setPdfUrl(pdfUrl);
    return pdfUrl
};