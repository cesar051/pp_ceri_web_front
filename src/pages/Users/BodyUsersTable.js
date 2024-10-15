import React from "react";
import { USER_STATES } from "../../constants";
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { FaCheck, FaTimes } from 'react-icons/fa'; // Para los íconos

const BodyUsersTable = (props) => {

    return (
        <>
            {props.currentItems.map((item, index) => (
                <tr key={index}>
                    <td style={{ verticalAlign: 'middle' }}>{item.id}</td>
                    <td style={{ verticalAlign: 'middle' }}>{item.nit}</td>
                    <td style={{ verticalAlign: 'middle' }}>{item.nombres}</td>
                    <td style={{ verticalAlign: 'middle' }}>
                        <input
                            type="email"
                            name="email"
                            value={props.userMails[item.id] || ''}
                            onChange={(e) => props.handleMailChange(index, e, item.id)}></input>
                        {/* Botón de Commit */}
                        {props.originalUsersData[item.id].correo !== props.userMails[item.id] ?
                            <Button variant="success" size="sm" className="m-1"
                                onClick={(e) => { props.UpdateNewMailChange(index, e, item.id) }}>
                                <FaCheck />
                            </Button> : <div></div>}

                        {/* Botón de Cancelar */}
                        {props.originalUsersData[item.id].correo !== props.userMails[item.id] ?
                            <Button variant="danger" size="sm" className="m-1"
                                onClick={(e) => { props.cancelEmailChange(item.id) }}>
                                <FaTimes />
                            </Button>
                            : <div></div>}
                    </td>
                    <th style={{ verticalAlign: 'middle' }}>
                        <Form.Select
                            style={{ backgroundColor: USER_STATES[props.selectedValues[item.id]].color || 'white', color: 'white' }}
                            value={props.selectedValues[item.id] || ''}
                            onChange={(e) => props.handleSelectChange(index, e, item.id)}
                        >
                            {Object.values(USER_STATES).map((state, indexS) => (
                                <option key={indexS} value={state["BD_KEY"]}>{state["label"]}</option>
                            ))}

                        </Form.Select>
                    </th>
                </tr>
            ))}
        </>
    );
}

export default BodyUsersTable;