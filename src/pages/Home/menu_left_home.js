// Menu.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './menu.css';
import Accordion from 'react-bootstrap/Accordion';
import { Link, useNavigate } from "react-router-dom";

const Menu_left_home = ({ auth }) => {

  const navigate = useNavigate();

  const handleIVAClick = () => {
    console.log('Hiciste clic en IVA');
    // Aquí puedes agregar lógica adicional, como redireccionar a otra página
    const actionExport = "iva";
    navigate('/my/home/export', { state: { actionExport } });
  };

  const handleICAClick = () => {
    console.log('Hiciste clic en ica');
    // Aquí puedes agregar lógica adicional, como redireccionar a otra página
    const actionExport = "ica";
    navigate('/my/home/export', { state: { actionExport } });
  };

  const handleRTFClick = () => {
    console.log('Hiciste clic en rtf');
    // Aquí puedes agregar lógica adicional, como redireccionar a otra página
    const actionExport = "rtf";
    navigate('/my/home/export', { state: { actionExport } });
  };

  return (
    <div className="containerdasboard">
      <section className="layout">
        <div className="main">
          <Accordion defaultActiveKey="0" flush className='leftMenuMain'>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Certificados Tributarios</Accordion.Header>
              <Accordion.Body>
                <Accordion /*defaultActiveKey="0"*/ flush>
                  {/* Opción Importar */}
                  {auth.getUser().perfil === "1" ?
                    <Accordion.Item eventKey="0">
                      <Link to="/admin/upload">
                        <Accordion.Header className='no-accordeon'>
                          Importar
                        </Accordion.Header>
                      </Link>
                    </Accordion.Item> : ""}

                  {/* Opción Exportar (desplegable) */}
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>Exportar</Accordion.Header>
                    <Accordion.Body>
                      {/* Aquí las opciones con apariencia de acordeón pero sin desplegar */}
                      <div className="accordion-item ">
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button collapsed no-accordeon"
                            type="button"
                            onClick={handleIVAClick}
                          >
                            IVA
                          </button>
                        </h2>
                      </div>
                      <div className="accordion-item">
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button collapsed no-accordeon"
                            type="button"
                            onClick={handleICAClick}
                          >
                            ICA
                          </button>
                        </h2>
                      </div>
                      <div className="accordion-item">
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button collapsed no-accordeon"
                            type="button"
                            onClick={handleRTFClick}
                          >
                            Retefuente
                          </button>
                        </h2>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>Manual de usuario</Accordion.Header>
              <Accordion.Body>
                <Accordion.Header className='no-accordeon'>Detalle</Accordion.Header>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header>Soporte</Accordion.Header>
              <Accordion.Body>
                <Accordion.Header className='no-accordeon'>Contacto</Accordion.Header>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="5">
              <Accordion.Header>Politicas de Uso</Accordion.Header>
              <Accordion.Body>
                <Accordion.Header className='no-accordeon'>Regulacion</Accordion.Header>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

        </div>
      </section >
    </div >

  );
};

export default Menu_left_home;