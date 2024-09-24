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
            console.log(value);

            return isValidDate({ value: value })
        }
    }

    // Verificar que todas las columnas necesarias estén presentes
    const columns = Object.keys(jsonData[0]);
    const missingColumns = Object.keys(requiredColumnsUploadIVA).filter(col => !columns.includes(col));

    if (missingColumns.length > 0) {
        alert(`Faltan las siguientes columnas: ${missingColumns.join(", ")}`);
        return false;
    }

    // Validar el formato de los datos en cada fila
    for (let row of jsonData) {
        for (let [key, type] of Object.entries(requiredColumnsUploadIVA)) {
            const value = row[key];
            console.log(row);
            console.log(key);

            if (!rowValidator[type.type](value, type.length, type.canBeNull)) {
                alert(`El valor en la columna "${key}" debe ser un ${type.type}`);
                return false;
            }
        }
    }

    return true;
}