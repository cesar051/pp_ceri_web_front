import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import { queryGET } from '../helpers/queryCall';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const auth = useAuth();
  const emailAndPasswordValid = () => {
    return true
  }

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/my/home");
    }
  }, [])

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/my/home");
    }
  }, [auth.isAuthenticated])

  const loginQueryCallback = (result) => {

    if (result) {

      if (result.statusCode === 200) {
        if (result.accessToken && result.refreshToken) {

          auth.saveUser(result)
          navigate("/my/home");

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

    if (emailAndPasswordValid()) {

      const url = `${process.env.REACT_APP_API_URL}/userLogin?userEmail=${encodeURIComponent(email)}&userPassword=${encodeURIComponent(password)}`;
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