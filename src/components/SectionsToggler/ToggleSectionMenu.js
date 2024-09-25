import React from "react";
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ToggleSectionMenu = (props) => {

    return (
        <>
            <ToggleButtonGroup
                type="radio"
                name="options"
                defaultValue="section1"
                onChange={props.handleSectionChange}
                className="mb-3"
            >

                {props.toggleSectionsElements.sections.map((section, index) => (
                    // Renderizamos cada elemento del arreglo como un <li>
                    <ToggleButton key={index} id={section.idMenuButton} value={section.labelValueButton}>
                        {section.labelMenuButton}
                    </ToggleButton>
                ))}

            </ToggleButtonGroup>
        </>
    );
}

export default ToggleSectionMenu;