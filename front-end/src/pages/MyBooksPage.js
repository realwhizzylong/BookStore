import React, { useEffect } from 'react';
import { Row, Col, Button, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getMyBooks, deleteBook } from '../actions/bookAction';
import Message from '../components/Message';
import { MY_BOOKS_RESET } from '../constants/bookConstants';

const MyBooksPage = ({ history }) => {
    const dispatch = useDispatch();

    const { userInfo } = useSelector(state => state.login);

    const { books, error } = useSelector(state => state.myBooks);

    const { success } = useSelector(state => state.bookDelete);

    useEffect(() => {
        dispatch({ type: MY_BOOKS_RESET })
        if (!userInfo) {
            history.push('/login')
        } else {
            dispatch(getMyBooks())
        }
    }, [dispatch, userInfo, success, history])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteBook(id))
        }
    }

    return (
        <Row className="justify-content-md-center">
            <Col md={12}>
                <h2>My Books</h2>
                {!books ? (
                    <>
                    </>
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    <Table striped bordered hover responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Condition</th>
                                <th>isSold</th>
                                <th>Details</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map(book => (
                                <tr key={book._id}>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.category}</td>
                                    <td>${book.price}</td>
                                    <td>{book.condition}</td>
                                    <td>
                                        {book.isSold ? (
                                            <i className="fas fa-check" style={{ color: 'green' }}></i>
                                        ) : (
                                            <i className="fas fa-times" style={{ color: 'red' }}></i>
                                        )}
                                    </td>
                                    <td>
                                        <LinkContainer to={`/book/${book._id}`}>
                                            <Button className="btn-sm" variant="light">Details</Button>
                                        </LinkContainer>
                                    </td>
                                    <td>
                                        <LinkContainer to={`/book/${book._id}/edit`}>
                                            <Button variant="light" className="btn-sm">
                                                <i className="fas fa-edit"></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(book._id)}>
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    )
}

export default MyBooksPage;