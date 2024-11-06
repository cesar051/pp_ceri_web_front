import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import { queryGET } from '../helpers/queryCall';
import { isAValidLength, isValidMail, isValidPassword } from '../helpers/stringValidations';
import { toast } from 'react-toastify';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const auth = useAuth();

  const emailAndPasswordValid = () => {
    return (isValidMail({ mailString: email }) || isAValidLength({ string: email, isExact: false, minLength: 4, maxLength: 50 })) && isValidPassword({ passwordString: password })
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
        toast.warn("Contraseña/Usuario no coinciden");
      }

    } else {
      toast.warn("Contraseña/Usuario no coinciden");
    }
    // Aquí puedes trabajar con los datos obtenidos en la respuesta  
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (emailAndPasswordValid()) {

      const url = `${process.env.REACT_APP_API_URL}/userLogin?userEmail=${encodeURIComponent(email)}&userPassword=${encodeURIComponent(password)}`;
      queryGET(url, loginQueryCallback, () => {
        toast.warn("Contraseña/Usuario no coinciden");
      })

    } else {
      toast.warn("Correo/contraseña no coinciden")
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">Email/NIT</label>
        <input type="" className="form-control"
          id="email" placeholder="Ingrese su email o NIT" value={email} onChange={(e) => setEmail(e.target.value)} />
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