import 'bootstrap/dist/css/bootstrap.min.css';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { COMPANY_INFO } from "../../constants";

export function generatePDF(data) {

    const moneyFormater = new Intl.NumberFormat('es-CO', { minimumFractionDigits: 0 })//new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'COP' });

    const getCurrentDate = () => {
        return new Date().toLocaleDateString('es-ES').replace(/\//g, '.');
    }

    const valuesDBConcepto = {
        'iva': 'reteiva',
        'ica': 'reteica',
        'rtf': 'retefte'
    }

    const cellValues = {
        '0,6': ['Fecha de Expedición (Dia.mes.año)', getCurrentDate()],
        '1,6': ['Año fiscal', data.year],
        '2,0': ['Ciudad donde se consignó la retención', data.DBData.ciudad_pago],
        '3,0': ['Nombre o Razón Social a quien se le practica la retención', data.DBData.descripcion],
        '3,6': ['CC o NIT', data.nit],
        '4,0': ['Razón Social completa', COMPANY_INFO.razon_social_completa],
        '4,6': ['CC o NIT', COMPANY_INFO.nit],
        '5,0': ['Dirección del agente retenedor', COMPANY_INFO.direccion],
        '5,4': ['Municipio', COMPANY_INFO.municipio],
        '5,6': ['Departamento', COMPANY_INFO.departamento],
    }

    const doc = new jsPDF();

    // Crear tabla que engloba todo el contenido
    doc.autoTable({
        theme: 'grid',
        body: [
            [{
                content: `CERTIFICADO DE RETENCIÓN EN LA FUENTE DE ${data.concepto}`.toUpperCase(),
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
                    colSpan: 4, // Esto hace que la celda ocupe 6 columnas
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
                    colSpan: 4, // Ocupa las 6 columnas
                    styles: { halign: 'center', fontSize: 10 },
                },
                {
                    content: `Valor \n${data.concepto}`.toUpperCase(),
                    colSpan: 3, // Ocupa las 6 columnas
                    styles: { halign: 'center', fontSize: 10 },
                },
                {
                    content: `Valor retenido`,
                    colSpan: 3, // Ocupa las 6 columnas
                    styles: { halign: 'center', fontSize: 10 },
                }
            ]
        ],
        body: [

            [{
                content: valuesDBConcepto[data.concepto],
                colSpan: 4, // Esto hace que la celda ocupe 6 columnas
                styles: { halign: 'left', fontSize: 10 },
            },
            {
                content: data.periodo,
                colSpan: 2, // Ocupa las 6 columnas
                styles: { halign: 'center', fontSize: 10 },
            },
            {
                content: `${data.DBData.porcentaje}% `,
                colSpan: 2, // Ocupa las 6 columnas
                styles: { halign: 'center', fontSize: 10 },
            },
            {
                content: moneyFormater.format(data.DBData.base),
                colSpan: 4, // Ocupa las 6 columnas
                styles: { halign: 'center', fontSize: 10 },
            },
            {
                content: moneyFormater.format(data.DBData.retenido),
                colSpan: 3, // Ocupa las 6 columnas
                styles: { halign: 'center', fontSize: 10 },
            },
            {
                content: moneyFormater.format(data.DBData.retenido),
                colSpan: 3, // Ocupa las 6 columnas
                styles: { halign: 'center', fontSize: 10 },
            }],
            [{
                content: 'Total',
                colSpan: 6, // Esto hace que la celda ocupe 6 columnas
                styles: { halign: 'left', fontStyle: 'bold', fontSize: 10 },
            },
            {
                content: ``,
                colSpan: 2, // Ocupa las 6 columnas
                styles: { halign: 'center', fontSize: 10 },
            },
            {
                content: `$${moneyFormater.format(data.DBData.base)}`,
                colSpan: 4, // Ocupa las 6 columnas
                styles: { halign: 'center', fontSize: 10, fontStyle: 'bold' },
            },
            {
                content: `$${moneyFormater.format(data.DBData.retenido)}`,
                colSpan: 3, // Ocupa las 6 columnas
                styles: { halign: 'center', fontSize: 10, fontStyle: 'bold' },
            },
            {
                content: `$${moneyFormater.format(data.DBData.retenido)}`,
                colSpan: 3, // Ocupa las 6 columnas
                styles: { halign: 'center', fontSize: 10, fontStyle: 'bold' },
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