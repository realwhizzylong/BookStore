import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getBooks } from '../actions/bookAction';
import Book from "../components/Book";
import Message from '../components/Message';

const HomePage = () => {
    const dispatch = useDispatch();

    const { books, error } = useSelector(state => state.bookList);

    useEffect(() => {
        dispatch(getBooks())
    }, [dispatch])

    return (
        <>
            <h1>Books for Sale</h1>
            {error ? (
                <Message>{error}</Message>
            ) : (
                <Row>
                    {books.map(book => (
                        <Col key={book._id} sm={12} md={6} lg={4} xl={3}>
                            <Book book={book} />
                        </Col>
                    ))}
                </Row>
            )}
        </>
    )
}

export default HomePage;