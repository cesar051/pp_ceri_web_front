const express = require('express');
const mssql = require('mssql'); // Ensure correct library name

const app = express();
const port = 3001;

// Improved error handling and security considerations
const config = {
  user: process.env.SQL_SERVER_USER || 'your_username',
  password: process.env.SQL_SERVER_PASSWORD || 'your_password',
  server: process.env.SQL_SERVER_HOST || 'your_server',
  database: process.env.SQL_SERVER_DATABASE || 'your_database',
  options: {
    encrypt: true, // Enable encryption for secure connection (consider using a certificate)
  },
};

// Route for login with prepared statements for enhanced security
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Create the connection to the database
    const pool = await mssql.connect(config);

    // Use prepared statements to prevent SQL injection vulnerabilities
    const request = pool.request();
    request.input('email', mssql.VarChar, email);
    request.input('password', mssql.VarChar, password);

    const result = await request.query(`
      SELECT * FROM usuarios
      WHERE email = @email AND password = @password
    `);

    if (result.recordset.length > 0) {
      res.json({ message: 'Inicio de sesión exitoso' });
    } else {
      res.status(401).json({ message: 'Credenciales inválidas' });
    }
  } catch (err) {
    console.error(err);

    // Provide informative error messages without revealing sensitive details
    res.status(500).json({ message: 'Error del servidor' }); // Generic error message
  } finally {
    // Ensure proper connection closure to avoid resource leaks
    if (pool && pool.connected) pool.close();
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});