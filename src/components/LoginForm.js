import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Navigate, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const baseUrl = "http://localhost:5000/";
  const navigate = useNavigate();

  const emailAndPasswordValid = () => {
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí realizarías la lógica para enviar los datos al servidor
    console.log('Email:', email);
    console.log('Password:', password);

    if (emailAndPasswordValid()) {
      const url = `${baseUrl}userLogin?userEmail=${encodeURIComponent(email)}&userPassword=${encodeURIComponent(password)}`;
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('La solicitud no fue exitosa');
          }
          return response.json(); // Si esperas una respuesta JSON
        })
        .then(result => {
          console.log(result)
          if (result) {
            if (result.statusCode === 200) {
              if (result.token) {
                localStorage.setItem('token', result.token)
                //setLoginSuccessful(true);

                //const tokenDecode = decodeJWT();
                //toast.success("Exitoso");
                //dispatch(login({ token: result.token.toString(), id: tokenDecode.userId, date: tokenDecode.exp }))

                navigate("/my/home");
                console.log("logueado")
              } else {
                //setLoginSuccessful(false);
              }
            } else if (result.statusCode === 400 && result.message === "wrong user/password") {
              //toast.warn("Contraseña/Usuario incorrectos");
            }

          }
          // Aquí puedes trabajar con los datos obtenidos en la respuesta            

        })
        .catch(error => {
          console.error('Hubo un problema con la solicitud fetch:', error);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" className="form-control"
          id="email" placeholder="Ingrese su email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="password">Contraseña</label>

        <input type="password" className="form-control"
          id="password" placeholder="Ingrese su contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className="form-group form-group-margin"> {/* Create a dedicated margin class */}
        <button type="submit" className="btn btn-primary">
          Iniciar Sesión
        </button>

      </div>
    </form>
  );
};

export default LoginForm;