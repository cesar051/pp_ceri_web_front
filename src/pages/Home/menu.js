

import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from "../../auth/AuthProvider";
const menu = () => {
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
            <a className="nav-link active" aria-current="page" href="#">Inicio</a>
            <a className="nav-link" href="#">Certificados
      <ul className="submenu">
        <li><span onClick={handleIVAClick}>IVA</span></li>
        <li><span onClick={handleICAClick}>ICA</span></li>
        <li><span onClick={handleRTFClick}>RTF</span></li>
      </ul>
    </a>
            <a className="nav-link" href="#">Salir</a>   

          </div>
        </div>
      </div>
    </nav>
    

  );
};

export default   
 menu;