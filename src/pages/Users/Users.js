import React from "react";
import SectionHeader from "../../components/SectionHeader";
import { Link } from "react-router-dom";
import SignUpForm from "../../components/SignUpForm";
import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { Table, Container, Row, Col } from 'react-bootstrap';
import PaginatedTable from "../../components/Pagination/PaginatedTable";

const sampleData = [
    {
        "id": 1,
        "nit": "1022334705",
        "nombres": "Cesar",
        "correo": "cesar_051@hotmail.com",
        "celular": "3184879105",
        "estado": "A"
    },
    {
        "id": 2,
        "nit": "123456789",
        "nombres": "Esteban Carranza",
        "correo": "cesar_051@hotmaikl.com",
        "celular": "2313",
        "estado": "A"
    },
    {
        "id": 3,
        "nit": "123456789",
        "nombres": "Esteban Carranza",
        "correo": "juanes@mail.com",
        "celular": "2313",
        "estado": "A"
    },
    {
        "id": 4,
        "nit": "123456789",
        "nombres": "Esteban Carranza",
        "correo": "juanes@mailo.com",
        "celular": "2313",
        "estado": "A"
    },
    {
        "id": 5,
        "nit": "123456789",
        "nombres": "Esteban Carranza",
        "correo": "juanes@mailos.com",
        "celular": "2313",
        "estado": "A"
    },
    {
        "id": 6,
        "nit": "123456789",
        "nombres": "Esteban Carranza",
        "correo": "juanescs08@gmail.com",
        "celular": "2313",
        "estado": "A"
    },
    {
        "id": 7,
        "nit": "123456789",
        "nombres": "Esteban Carranza",
        "correo": "juanescs089@gmail.com",
        "celular": "2313",
        "estado": "A"
    }
];

const Users = () => {
    return (
        <>
            <div>
                Pagina de usuarios
                <PaginatedTable data={sampleData} />
            </div>
        </>
    );
}

export default Users;