export function queryGET(url, callBackFunction, catchCallBackFunction) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('La solicitud no fue exitosa');
            }
            return response.json(); // Si esperas una respuesta JSON
        })
        .then(result => callBackFunction(result))
        .catch(error => {
            if (catchCallBackFunction) {
                catchCallBackFunction()
            }
            console.error('Hubo un problema con la solicitud fetch:', error);
        });
}

export function queryWithBody(url, requestData, callBackFunction, errorCallBackFunction, authParams, method, catchCallBackFunction) {

    // Opciones para la petición
    const requestOptions = {
        method: method,
        headers: authParams.requiereAuthentication ? {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authParams.token}`
        } : {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData) // Convertir el objeto a JSON
    };
    //console.log(requestOptions);

    fetch(url, requestOptions)
        .then(response => {
            if (!response.ok) {
                console.log("saliendo");
                errorCallBackFunction()
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => callBackFunction(data))
        .catch(error => {
            if (catchCallBackFunction) {
                catchCallBackFunction()
            }
            console.error('Error:', error);
            // Aquí puedes manejar el error como desees
        });
}