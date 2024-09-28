

import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from "../../auth/AuthProvider";
import { Link } from "react-router-dom";

const menu = ({ auth, handleSignOut }) => {
  const handleIVAClick = () => {
    console.log('Hiciste clic en IVA');
    // Aquí puedes agregar lógica adicional, como redireccionar a otra página
  };

  const handleICAClick = () => {
    // ...
  };

  const handleRTFClick = () => {
    // ...
  };
  return (


    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Portal Proveedores </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"

          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">

          <div className="navbar-nav ms-auto">
            {auth.getUser().perfil === "1" && (
              <Link to="/admin/users">
                <div className="nav-link active" aria-current="page" >Usuarios</div>
              </Link>
            )}
            
             <Link to="/">
                <div className="nav-link active" aria-current="page" >Salir</div>
              </Link>

          </div>
        </div>
      </div>
    </nav >


  );
};

export default
  menu;