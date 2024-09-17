import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import { queryGET } from '../helpers/queryCall';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const baseUrl = "http://localhost:5000/";
  const navigate = useNavigate();
  const auth = useAuth();
  const emailAndPasswordValid = () => {
    return true
  }

  useEffect(() => {
    console.log("pagina login")
    console.log("autenticado " + auth.isAuthenticated);
    if (auth.isAuthenticated) {
      navigate("/my/home");
    }
  }, [])

  useEffect(() => {
    console.log("pagina login")
    console.log("autenticado " + auth.isAuthenticated);
    if (auth.isAuthenticated) {
      navigate("/my/home");
    }
  }, [auth.isAuthenticated])

  const loginQueryCallback = (result) => {
    console.log(result)
    console.log("llega")
    if (result) {

      if (result.statusCode === 200) {
        if (result.accessToken && result.refreshToken) {

          auth.saveUser(result)
          navigate("/my/home");
          console.log(result);

          console.log("logueado")
        } else {
          console.log("not enough parameters")
          //setLoginSuccessful(false);
        }
      } else if (result.statusCode === 400 && result.message === "wrong user/password") {
        //toast.warn("Contraseña/Usuario incorrectos");
      }

    }
    // Aquí puedes trabajar con los datos obtenidos en la respuesta  
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí realizarías la lógica para enviar los datos al servidor
    console.log('Email:', email);
    console.log('Password:', password);

    if (emailAndPasswordValid()) {

      const url = `${baseUrl}userLogin?userEmail=${encodeURIComponent(email)}&userPassword=${encodeURIComponent(password)}`;
      queryGET(url, loginQueryCallback)

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