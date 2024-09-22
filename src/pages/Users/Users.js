import React from "react"
import { useState, useEffect } from 'react';
import PaginatedTable from "../../components/Pagination/PaginatedTable";
import UsersFilter from "./UsersFilter";
import { queryWithBody } from '../../helpers/queryCall';
import { toast } from 'react-toastify';
import { useAuth } from "../../auth/AuthProvider";
import FirstRowUsersTable from "./FirstRowUsersTable";
import BodyUsersTable from "./BodyUsersTable";

const Users = () => {

    const [data, setData] = useState([[]])
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage] = useState(5);
    const [numberOfUsers, setNumberOfUsers] = useState(0);
    const currentItems = data[currentPage];

    const auth = useAuth();

    const filtarLista = (estado) => {
        const successGettingPagedataFiltered = (data) => {
            console.log(data)
            const numberPages = Math.ceil(data.NumberOfUsers / itemsPerPage)
            console.log(`number pages ${numberPages}`);

            let dataP = [data.data[0]]
            for (let i = 0; i < numberPages - 1; i++) {
                dataP.push([])
            }
            dataP.forEach((element) => {
                element.forEach((user) => {
                    setSelectedValues((prevValues) => ({
                        ...prevValues,
                        [user.id]: user.estado// Actualiza el valor del select correspondiente en el objeto
                    }));
                })
            })
            console.log(dataP);
            setCurrentPage(0)
            setData(dataP)
            setNumberOfUsers(data.NumberOfUsers)

        }
        getPageDataFromDB(0, successGettingPagedataFiltered, estado)
    }

    const [filtroEstado, setFiltroEstado] = useState('');

    const manejarCambioEstado = (e) => {
        setFiltroEstado(e.target.value);
        console.log(`cambaindo a ${e.target.value}`)
        filtarLista(e.target.value)
    };

    const getPageDataFromDB = (pageIndex, successFunction, estadoAfiltrar) => {
        console.log(estadoAfiltrar);
        const esFiltrado = estadoAfiltrar !== null && estadoAfiltrar !== '' && estadoAfiltrar !== undefined;
        console.log(esFiltrado);

        const url = esFiltrado ? `${process.env.REACT_APP_API_URL}/getFilteredUsers` : `${process.env.REACT_APP_API_URL}/getUsers`;
        const requestData = esFiltrado ? {
            "quantity_per_page": itemsPerPage,
            "page_number": pageIndex,
            "user_state": estadoAfiltrar
        } : {
            "quantity_per_page": itemsPerPage,
            "page_number": pageIndex
        };

        const callBackGetUsers = (data) => {
            console.log(data)
            if (data && data.statusCode === 200) {
                successFunction(data)
            } else {
                toast.info(`Ha ocurrido un error interno`)
            }
        }
        const errorCallBackFunctionRegister = () => { }
        const authParams = {
            requiereAuthentication: true,
            token: auth.getAccessToken()
        }
        console.log("authp");

        console.log(authParams)
        queryWithBody(url, requestData, callBackGetUsers, errorCallBackFunctionRegister, authParams, 'POST');
    }

    const handlePageClick = (event) => {
        console.log(data[event.selected])
        const successGEttingUserForPage = (datas) => {

            let dataP = data
            dataP[event.selected] = datas.data[0]
            setData(dataP)
            setCurrentPage(event.selected);

            dataP.forEach((element) => {
                element.forEach((user) => {
                    setSelectedValues((prevValues) => ({
                        ...prevValues,
                        [user.id]: user.estado// Actualiza el valor del select correspondiente en el objeto
                    }));
                })
            })

        }

        if (data[event.selected].length === 0) {
            getPageDataFromDB(event.selected, successGEttingUserForPage, filtroEstado)
        } else {
            setCurrentPage(event.selected);
        }

    };

    const [selectedValues, setSelectedValues] = useState({});


    const UpdateNewSelectChange = (userId, newUserState, prevUserState) => {
        const url = `${process.env.REACT_APP_API_URL}/updateUserState`;
        const requestData = {
            "userIdToUpdate": userId,
            "newUserState": newUserState
        };

        const callBackUpdateUserState = (data) => {
            console.log(data)
            if (data && data.statusCode === 200) {

            } else { // se devuelve al valor original
                setSelectedValues((prevValues) => ({
                    ...prevValues,
                    [userId]: prevUserState
                }));
                toast.info(`No se ha podido actualizar el estado del usuario ${userId}`)
            }
        }
        const errorCallBackFunctionRegister = () => {
            setSelectedValues((prevValues) => ({
                ...prevValues,
                [userId]: prevUserState
            }));
            toast.info(`No se ha podido actualizar el estado del usuario ${userId}`)
        }
        const authParams = {
            requiereAuthentication: true,
            token: auth.getAccessToken()
        }

        queryWithBody(url, requestData, callBackUpdateUserState, errorCallBackFunctionRegister, authParams, 'POST', errorCallBackFunctionRegister);
    }

    const handleSelectChange = (id, event, userId) => {
        const prevFieldValue = selectedValues[userId];
        const value = event.target.value;
        setSelectedValues((prevValues) => ({
            ...prevValues,
            [userId]: value // Actualiza el valor del select correspondiente en el objeto
        }));
        UpdateNewSelectChange(userId, value, prevFieldValue)
        console.log(`Opción seleccionada cambia desde ${prevFieldValue} en select ${id} userid ${userId}:`, value);
    };

    useEffect(() => {
        //console.log(auth.getAccessToken());
        const successGEttingUsers = (data) => {

            const numberPages = Math.ceil(data.NumberOfUsers / itemsPerPage)
            let dataP = [data.data[0]]
            for (let i = 0; i < numberPages - 1; i++) {
                dataP.push([])
            }
            dataP.forEach((element) => {
                element.forEach((user) => {
                    setSelectedValues((prevValues) => ({
                        ...prevValues,
                        [user.id]: user.estado// Actualiza el valor del select correspondiente en el objeto
                    }));
                })
            })
            console.log(dataP);
            setData(dataP)
            setNumberOfUsers(data.NumberOfUsers)

        }
        getPageDataFromDB(0, successGEttingUsers)

    }, [])

    return (
        <>
            <div>
                <UsersFilter
                    filtroEstado={filtroEstado}
                    manejarCambioEstado={manejarCambioEstado}
                />

                <PaginatedTable
                    currentItems={currentItems}
                    selectedValues={selectedValues}
                    handleSelectChange={handleSelectChange}
                    numberOfUsers={numberOfUsers}
                    itemsPerPage={itemsPerPage}
                    handlePageClick={handlePageClick}
                    firstRow={<FirstRowUsersTable />}
                    bodyTable={<BodyUsersTable
                        currentItems={currentItems}
                        selectedValues={selectedValues}
                        handleSelectChange={handleSelectChange} />}
                />
            </div>
        </>
    );
}

export default Users;