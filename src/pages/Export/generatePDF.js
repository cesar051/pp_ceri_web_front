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
    const imageData = 'data:image/webp;base64,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DtJV/1/1/1X/X/X/Vf//b8IAVlA4IIoCAAAwJgCdASpiAewAPlEmkEYjoiGhJT8YIHAKCWVu4XShA1tfyn8Mf3/3Gnof4efk7Sq/sA91f9z0QHmA/gH8j/WT3gP0z1SX0AP0r62X0n9PO6AfQABZ+vh7sY95DpgjyJCaVWIdMEeRITSqxDpgjyJCaVWIdMEeRITSqxDpgjyJCaVWIdMEeRITSqxDpgjyJCaVWIdMC+GE93BlldOCtLz29e1zZWuCsyzhyXEFkPqHexqHVJfp04ujKVqg/QzQ9o0RDkQPWZbIvfi+RFOVTSquBYIUpo8iQeJcX8t5bzz8SYoxlxX1OSwpuvLiGjz0pSOr7PFiMHqZA4CQ1uxj3Wz+4ajpvuRaMvIdMEXobHrDD17ZmWcOS4huAIVTSqxDpgjyJCajKmlViHTBHkSE0s2NKrEOmCPIkJpQAAD+/7WQAAAAAAAAAABCf8SJ//4ciNvImr24svFZl6n/SXjKHbMUEMpFy0qjya0c7uzkS+Tr80Q0xs8fVBJt3/bmocixvkCA2qQKstMORr87OElK0Ta/BLv9uaYkNYxcvdz7LXjX3LUQmKJE915XL3PXuNIlA6i1SxSuubTgU1eRHkgyPTkuI7+qN3TjwrMLsHUXZCfWG8uFf8MCaWfC94MvX//4qm4bz+dOBNLrktWLBJTeozgFSxAYWiOQ7hT9OrIuIUfpd5qVQKVKoKO9x2TtcJ7XvWNne3Eo7NJfLoD9ggZRMxFi+zvzPsWXisA7sYk1B0hpPIKovcRUIgrlYWJa747qt2OaWQyYzr+U49VK6qYGfQIlv+HCzBRxSIE3akzrp+/C/YjrP6uNKF6icthzoaXtJD+jRqURimwUkQMx/aQACifkgOZ3SBRPyQAAAEVYSUa6AAAARXhpZgAASUkqAAgAAAAGABIBAwABAAAAAQAAABoBBQABAAAAVgAAABsBBQABAAAAXgAAACgBAwABAAAAAgAAABMCAwABAAAAAQAAAGmHBAABAAAAZgAAAAAAAABIAAAAAQAAAEgAAAABAAAABgAAkAcABAAAADAyMTABkQcABAAAAAECAwAAoAcABAAAADAxMDABoAMAAQAAAP//AAACoAQAAQAAAGIBAAADoAQAAQAAAOwAAAAAAAAAWE1QINsAAAA8P3hwYWNrZXQgYmVnaW49IiIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJHbyBYTVAgU0RLIDEuMCI+PHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj48L3JkZjpSREY+PC94OnhtcG1ldGE+Cjw/eHBhY2tldCBlbmQ9InciPz4A';   
 

    // Crear tabla que engloba todo el contenido
    doc.autoTable({
        theme: 'grid',
   didDrawCell: (data) => {
        // ... your existing didDrawCell logic ...

        // Check if we're at the first row and first column to add the image
        if (data.row.index === 0 && data.column.index === 0) {
            const cell = data.cell;
            const doc = data.doc;

            // Calculate the image width and height based on the cell width
            const imgWidth = cell.width * 0.8; // Adjust the scaling factor as needed
            const imgHeight = doc.getImageProperties(imageData).height * (imgWidth / doc.getImageProperties(imageData).width);

            // Position the image slightly above the center of the cell
            doc.addImage(imageData, 'WEBP', cell.x + (cell.width - imgWidth) / 2, cell.y - imgHeight - 5, imgWidth, imgHeight);
        }
    },
        body: [
            
            [
           
                
                {  content: `CERTIFICADO DE RETENCIÓN EN LA FUENTE DE ${data.concepto}`.toUpperCase(),
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