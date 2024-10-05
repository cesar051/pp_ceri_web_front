import React from "react";
import { USER_STATES } from "../../constants";
import { Form } from 'react-bootstrap';

const BodyUsersTable = (props) => {

    return (
        <>
            {props.currentItems.map((item, index) => (
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.nit}</td>
                    <td>{item.nombres}</td>
                    <td>{item.correo}</td>
                    <th>
                        <Form.Select
                            style={{ backgroundColor: USER_STATES[props.selectedValues[item.id]].color, color: 'white' }}
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