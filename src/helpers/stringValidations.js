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
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
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

