import { toast } from "react-toastify";
import { isNumericVariable, isValidDate, isVarchar } from "../stringValidations";

export function ExcelDataValidator(jsonData, requiredColumnsUploadIVA) {

    const rowValidator = {
        "VARCHAR": (value, length, canBeNull) => {
            if (value === null) {
                return canBeNull; // Válido si es null
            }
            return isVarchar({ value: value, maxLength: length })
        },
        "NUMERIC": (value, length, canBeNull) => {
            if (value === null) {
                return canBeNull; // Válido si es null
            }
            return isNumericVariable({ value: value, maxDigits: length[0], maxDecimals: length[1] })
        },
        "DATE": (value, length, canBeNull) => {
            if (value === null) {
                return canBeNull; // Válido si es null
            }
            console.log("llega a switch");
            console.log(value);

            return isValidDate({ value: value })
        }
    }
    console.log("entra validator");

    // Verificar que todas las columnas necesarias estén presentes
    const columns = Object.keys(jsonData[0]);
    const missingColumns = [];
    const changeColumns = [];
    const optionalColumnsTofill = [];
    // Recorrer cada columna requerida
    for (const [col, requirements] of Object.entries(requiredColumnsUploadIVA)) {
        // Verificar si el nombre de la columna o alguno de los nombres opcionales está presente en columns
        let hasColumn = columns.includes(col);

        if (!hasColumn) {
            const indexFound = requirements.optional_names.findIndex(name => columns.includes(name))
            hasColumn = indexFound != -1
            if (hasColumn) {
                changeColumns.push({ from: requirements.optional_names[indexFound], to: col })
            }
        }
        // si no la tiene y no es obligatoria hay que rellenarla
        if (!hasColumn && !requirements.mandatory) {
            optionalColumnsTofill.push(col)
        }
        // Si no se encuentra, agregar a missingColumns
        if (!hasColumn && requirements.mandatory) {
            missingColumns.push(col);
        }
    }
    console.log("faltantes");
    console.log(missingColumns);
    console.log("a cambiar");
    console.log(changeColumns);
    console.log("a llenar");
    console.log(optionalColumnsTofill);

    if (missingColumns.length > 0) {
        //alert(`Faltan las siguientes columnas: ${missingColumns.join(", ")}`);
        toast.warn(`Faltan las siguientes columnas: ${missingColumns.join(", ")}`)
        return false;
    }
    console.log("pasan columnas");

    // Validar el formato de los datos en cada fila
    let indice = 1;
    for (let row of jsonData) {
        console.log('entra row');
        indice++;

        changeColumns.forEach((item) => {
            row[item.to] = row[item.from]
            delete row[item.from]
        })

        optionalColumnsTofill.forEach((col) => {
            row[col] = requiredColumnsUploadIVA[col].default_value
        })

        console.log(row);

        for (let [key, type] of Object.entries(requiredColumnsUploadIVA)) {

            if (type.cast) {
                try {
                    console.log(`castea ${key}`);
                    console.log(row[key]);

                    row[key] = type.cast(row[key])
                } catch {
                    toast.warn(`El valor en la fila ${indice} columna "${key}" debe ser un ${type.type}`)
                    //alert(`El valor en la fila ${indice} columna "${key}" debe ser un ${type.type}`);
                    return false;
                }
            }

            const value = row[key];
            console.log(value);

            if (!rowValidator[type.type](value, type.length, type.canBeNull)) {
                toast.warn(`El valor en la fila ${indice} columna "${key}" debe ser un ${type.type}`)
                //alert(`El valor en la fila ${indice} columna "${key}" debe ser un ${type.type}`);
                return false;
            }
        }
    }

    console.log("editado");
    console.log(jsonData);


    return true;
}