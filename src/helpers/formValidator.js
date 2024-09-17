import { toast } from 'react-toastify';

export function verifyFields(validacionesCamposRegistro) {
    let error = true
    validacionesCamposRegistro.forEach((validacion) => {
        //console.log(validacion);
        if (!validacion.hook(validacion.params)) {
            //console.log(validacion.errorMessage)
            toast.info(validacion.errorMessage);
            error = false
        }
    })
    return error
}