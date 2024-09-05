const sql = require('mssql');

// Configuración de la conexión
const config = {
    user: 'your_user',
    password: 'your_password',
    server: 'your_server',
    database: 'your_database'
};

// Función para conectar a la base de datos
async function connectToDb() {
    try {
        await sql.connect(config);
        console.log("Conectado a la base de datos");
    } catch (err) {
        console.error("Error al conectar a la base de datos", err);
    }
}

// Función para verificar las credenciales
async function validateCredentials(username, password) {
    try {
        const result = await sql.query(`SELECT * FROM users WHERE username = '<span class="math-inline">\{username\}' AND password \= '</span>{password}'`);
        return result.recordset.length > 0;
    } catch (err) {
        console.error("Error al validar credenciales", err);
        return false;
    }
}

module.exports = {
    connectToDb,
    validateCredentials
};