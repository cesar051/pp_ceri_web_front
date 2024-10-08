export function is18OrOlder(params) {
    const currentDate = new Date();
    const birthdate = new Date(params.dateString);
    let ageDifference = currentDate.getFullYear() - birthdate.getFullYear();
    if (currentDate.getMonth() < birthdate.getMonth() ||
        (currentDate.getMonth() === birthdate.getMonth() && currentDate.getDate() < birthdate.getDate())) {
        // Restar un año si el mes actual es anterior al mes de nacimiento,
        // o si es el mismo mes pero el día actual es anterior al día de nacimiento.
        ageDifference--;
    }
    if (ageDifference < 18) {
        return false;
    }

    return true
}

export function isValidMail(params) {
    // Validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(params.mailString)) {
        return false;
    }
    return true
}

export function isValidPassword(params) {
    // Validar la contraseña
    const passwordRegex = /^[A-Za-z\d\W]{8,}$/;
    if (!passwordRegex.test(params.passwordString)) {
        return false;
    }
    return true
}

export function areStringsEqual(params) {
    return params.string1 === params.string2
}

export function isAValidLength(params) {
    if (params.isExact) {
        // en caso de que la longitud deba ser exacta, se toma nimLength
        return params.string.length === params.minLength
    } else {
        return params.string.length >= params.minLength && params.string.length <= params.maxLength
    }
}

export function isNumericVariable({ value, maxDigits, maxDecimals }) {
    // Convertir a string si es un número
    if (typeof value === 'number') {
        value = value.toString();
    }

    // Verificar si es una cadena numérica válida (con o sin punto decimal)
    if (typeof value !== 'string' || isNaN(value)) {
        return false;
    }

    // Remover posible signo negativo
    value = value.replace("-", "");

    // Separar la parte entera y la parte decimal
    const [integerPart, decimalPart = ""] = value.split(".");

    // Verificar longitud de la parte entera
    if (integerPart.length > maxDigits - maxDecimals) {
        return false;
    }

    // Verificar longitud de la parte decimal (si existe)
    if (decimalPart.length > maxDecimals) {
        return false;
    }

    // Si pasó todas las verificaciones, es válido
    return true;
}

export function isVarchar(params) {
    // Verificar si el valor es null
    if (params.value === null) {
        return true; // Válido si es null
    }

    // Convertir números a cadenas
    if (typeof params.value === 'number') {
        params.value = params.value.toString(); // Convertir a cadena
    } else if (typeof params.value !== 'string') {
        return false; // No es válido si no es una cadena ni un número
    }

    // Verificar que la longitud no exceda el máximo permitido
    return params.value.length <= params.maxLength;
}

export function isValidDate(params) {

    let date
    // Verificar si es una cadena
    if (typeof params.value !== 'string') {
        if (Number.isInteger(params.value)) {
            date = new Date(1899, 11, 30 + params.value)
        } else {
            return false; // No es válido si no es una cadena
        }
    } else { // si es un string
        const regex = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$/; // reconoce fechas en el formato dd/mm/yyyy
        if (regex.test(params.value)) {
            const [day, month, year] = params.value.split("/");
            params.value = `${year}-${month}-${day}`;
        }
        date = new Date(params.value);
    }

    // Verificar si la fecha es válida
    return !isNaN(date.getTime());
}