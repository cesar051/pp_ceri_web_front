import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { Table, Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../../auth/AuthProvider';
import { queryWithBody } from '../../helpers/queryCall';
import { toast } from 'react-toastify';

const PaginatedTable = () => {
    const [data, setData] = useState([[]])
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage] = useState(5);
    const [numberOfUsers, setNumberOfUsers] = useState(0);

    const auth = useAuth();

    const getPageDataFromDB = (pageIndex, successFunction) => {
        const url = `${process.env.REACT_APP_API_URL}/getUsers`;
        const requestData = {
            "quantity_per_page": itemsPerPage,
            "page_number": pageIndex
        };

        const callBackGetUsers = (data) => {
            console.log(data)
            if (data && data.statusCode == 200) {
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

        queryWithBody(url, requestData, callBackGetUsers, errorCallBackFunctionRegister, authParams, 'POST');
    }

    const handlePageClick = (event) => {
        console.log(data[event.selected])
        const successGEttingUserForPage = (datas) => {

            let dataP = data
            dataP[event.selected] = datas.data[0]
            setData(dataP)
            setCurrentPage(event.selected);
        }

        if (data[event.selected].length === 0) {
            getPageDataFromDB(event.selected, successGEttingUserForPage)
        } else {
            setCurrentPage(event.selected);
        }

    };

    const offset = currentPage * itemsPerPage;
    const currentItems = data[currentPage];//data.slice(offset, offset + itemsPerPage);

    useEffect(() => {
        //console.log(auth.getAccessToken());
        const successGEttingUsers = (data) => {

            const numberPages = Math.ceil(data.NumberOfUsers / itemsPerPage)
            let dataP = [data.data[0]]
            for (let i = 0; i < numberPages - 1; i++) {
                dataP.push([])
            }
            console.log(dataP);
            setData(dataP)
            setNumberOfUsers(data.NumberOfUsers)
        }
        getPageDataFromDB(0, successGEttingUsers)

    }, [])

    return (
        <Container className="mt-5">
            <Row>
                <Col>
                    <div className="table-responsive">
                        <Table bordered hover>
                            <thead className="thead-dark">
                                <tr>
                                    <th>Id</th>
                                    <th>Nit</th>
                                    <th>Nombre</th>
                                    <th>Correo</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.nit}</td>
                                        <td>{item.nombres}</td>
                                        <td>{item.correo}</td>
                                        <th>{item.estado}</th>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                    <ReactPaginate
                        previousLabel={"<"}
                        nextLabel={">"}
                        breakLabel={"..."}
                        pageCount={Math.ceil(numberOfUsers / itemsPerPage)}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination justify-content-center"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                        breakClassName={"page-item"}
                        breakLinkClassName={"page-link"}
                        activeClassName={"active"}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default PaginatedTable;
