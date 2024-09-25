// Menu.js
import React from 'react';
//import './menu.css';
import 'bootstrap/dist/css/bootstrap.min.css';
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
        <div className="accordion accordion-flush" id="accordionFlushExample">
          <div className="accordion-item">
            {/* ... (other accordion items remain the same) */}
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo"   
aria-expanded="false" aria-controls="flush-collapseTwo">
                Certificados   
Tributarios
              </button>
            </h2>
            <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
              <div className="accordion-body">   

                <div className="accordion accordion-flush" id="subAccordion">   

                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#subAccordion-collapseOne"   
aria-expanded="false" aria-controls="subAccordion-collapseOne">
                        Certificado A
                      </button>
                    </h2>
                    <div id="subAccordion-collapseOne" className="accordion-collapse collapse" data-bs-parent="#subAccordion">
                      <div className="accordion-body">Placeholder content for sub-accordion item 1.</div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"   
data-bs-target="#subAccordion-collapseTwo"   
aria-expanded="false" aria-controls="subAccordion-collapseTwo">
                        Certificado B
                      </button>
                    </h2>
                    <div id="subAccordion-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#subAccordion">
                      <div className="accordion-body">Placeholder content for sub-accordion item 2.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);
};

export default   
menu_left_home;