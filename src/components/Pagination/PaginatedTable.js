import React from 'react';
import ReactPaginate from 'react-paginate';
import { Table, Container, Row, Col } from 'react-bootstrap';

const PaginatedTable = ({ firstRow,
    bodyTable,
    numberOfUsers,
    itemsPerPage,
    handlePageClick }) => {

    return (
        <>
            <Container className="mt-5">
                <Row>
                    <Col>
                        <div className="table-responsive">
                            <Table bordered hover>
                                <thead className="thead-dark">
                                    {firstRow}
                                </thead>
                                <tbody>
                                    {bodyTable}
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
        </>

    );
};

export default PaginatedTable;
