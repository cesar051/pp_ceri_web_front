// Menu.js
import React from 'react';
import './menu.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';

const menu_left_home = () => {

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
    <div className="containerdasboard">
      <section className="layout">
        <div className="main">
          <Accordion defaultActiveKey="0" flush>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Certificados</Accordion.Header>
              <Accordion.Body>
                <Accordion defaultActiveKey="0" flush>
                  {/* Opción Importar */}
                  <Accordion.Item eventKey="0">
                    <Accordion.Header className='no-accordeon'>Importar</Accordion.Header>

                  </Accordion.Item>

                  {/* Opción Exportar (desplegable) */}
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Exportar</Accordion.Header>
                    <Accordion.Body>
                      {/* Aquí las opciones con apariencia de acordeón pero sin desplegar */}
                      <div className="accordion-item">
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
          </Accordion>

        </div>
      </section>
    </div>

  );
};

export default
  menu_left_home;