import React from "react";
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ToggleSectionMenu from "./ToggleSectionMenu";

const ToogleSectionsTable = (props) => {

    return (
        <>
            <div>
                <Container className="mt-4">
                    {props.toggleSectionsElements.haveMenu && (
                        <ToggleSectionMenu
                            handleSectionChange={props.handleSectionChange}
                            toggleSectionsElements={props.toggleSectionsElements}
                        />
                    )}

                    <div>
                        {props.toggleSectionsElements.sections.map((section, index) => (
                            // Renderizamos cada elemento del arreglo como un <li>
                            props.selectedSection === section.labelValueButton && (
                                <div key={index} className="section-content">
                                    {section.element}
                                </div>
                            )
                        ))}

                    </div>
                </Container>
            </div>
        </>
    );
}

export default ToogleSectionsTable;