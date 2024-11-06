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
        '2,0': ['Ciudad donde se consignó la retención', data.DBData[0].ciudad_pago],
        '3,0': ['Nombre o Razón Social a quien se le practica la retención', data.DBData[0].descripcion],
        '3,6': ['CC o NIT', data.nit],
        '4,0': ['Razón Social completa', COMPANY_INFO.razon_social_completa],
        '4,6': ['CC o NIT', COMPANY_INFO.nit],
        '5,0': ['Dirección del agente retenedor', COMPANY_INFO.direccion],
        '5,4': ['Municipio', COMPANY_INFO.municipio],
        '5,6': ['Departamento', COMPANY_INFO.departamento],
    }

    const iconImageData = {}

    const doc = new jsPDF();

    const imageData = 'data:image/png;base64,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';

    // Crear tabla que engloba todo el contenido
    doc.autoTable({
        theme: 'grid',
        body: [
            [
                {
                    content: ` \nCERTIFICADO DE RETENCIÓN EN LA FUENTE DE ${data.concepto}`.toUpperCase(),
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

            if (data.row.index === 0 && data.column.index === 0) {
                const cell = data.cell;

                const doc = data.doc;

                iconImageData.x = cell.x + 1.5 //+ (cell.width - imgWidth) / 2
                iconImageData.y = cell.y - 14//- imgHeight - 5
                iconImageData.width = cell.width * 0.5  //* 0.8;
                iconImageData.height = iconImageData.width * doc.getImageProperties(imageData).height / doc.getImageProperties(imageData).width //doc.getImageProperties(imageData).height * (imgWidth / doc.getImageProperties(imageData).width);

            }

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

    let certificateContent = [];
    let sumatoriaMontos = 0;
    let sumatoriaRetenidos = 0;
    data.DBData.forEach(element => {
        certificateContent.push(
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
                content: `${element.porcentaje}% `,
                colSpan: 2, // Ocupa las 6 columnas
                styles: { halign: 'center', fontSize: 10 },
            },
            {
                content: data.concepto === 'iva' ? `$${moneyFormater.format(element.iva)}` : `$${moneyFormater.format(element.base)}`,
                colSpan: 4, // Ocupa las 6 columnas
                styles: { halign: 'center', fontSize: 10 },
            },
            {
                content: `$${moneyFormater.format(element.retenido)}`,
                colSpan: 3, // Ocupa las 6 columnas
                styles: { halign: 'center', fontSize: 10 },
            },
            {
                content: `$${moneyFormater.format(element.retenido)}`,
                colSpan: 3, // Ocupa las 6 columnas
                styles: { halign: 'center', fontSize: 10 },
            }]
        );
        sumatoriaMontos += data.concepto === 'iva' ? element.iva : element.base
        sumatoriaRetenidos += element.retenido
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
                    content: data.concepto === 'iva' ? 'IVA' : `Monto Total`,
                    colSpan: 4, // Ocupa las 6 columnas
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
            ...certificateContent
            ,
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
                content: `$${moneyFormater.format(sumatoriaMontos)}`,
                colSpan: 4, // Ocupa las 6 columnas
                styles: { halign: 'center', fontSize: 10, fontStyle: 'bold' },
            },
            {
                content: `$${moneyFormater.format(sumatoriaRetenidos)}`,
                colSpan: 3, // Ocupa las 6 columnas
                styles: { halign: 'center', fontSize: 10, fontStyle: 'bold' },
            },
            {
                content: `$${moneyFormater.format(sumatoriaRetenidos)}`,
                colSpan: 3, // Ocupa las 6 columnas
                styles: { halign: 'center', fontSize: 10, fontStyle: 'bold' },
            }]/*,
            [{
                content: ' ',
                colSpan: 2, // Ocupa las 6 columnas
                styles: { halign: 'center', fontSize: 10 },
            }]*/
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

    doc.addImage(imageData, 'PNG', iconImageData.x, -1 * iconImageData.y, iconImageData.width, iconImageData.height); // Añadir imagen: (imagen, formato, x, y, ancho, alto)
    // Generar el blob del PDF para renderizar
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    //setPdfUrl(pdfUrl);
    return pdfUrl
};