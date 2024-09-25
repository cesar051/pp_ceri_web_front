import React from "react";
import { USER_STATES } from "../../constants";
import { Form, Accordion } from 'react-bootstrap';

const UsersFilter = (props) => {

    return (
        <>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Filtrar</Accordion.Header>
                    <Accordion.Body>
                        <Form>
                            <Form.Group controlId="filtroEstadoSelect">
                                <Form.Label>Filtrar por Estado</Form.Label>
                                <Form.Control as="select" value={props.filtroEstado} onChange={props.manejarCambioEstado}>
                                    <option value="">Seleccione un estado</option>
                                    {Object.values(USER_STATES).map((state, indexS) => (
                                        <option key={indexS} value={state["BD_KEY"]}>{state["label"]}</option>
                                    ))}

                                </Form.Control>
                            </Form.Group>
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    );
}

export default UsersFilter;