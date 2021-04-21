import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getBooks } from '../actions/bookAction';
import Book from "../components/Book";
import Message from '../components/Message';
import SearchBar from '../components/SearchBar';

const HomePage = ({ match }) => {
    const type = match.params.type;

    const keyword = match.params.keyword;

    const dispatch = useDispatch();

    const { books, error } = useSelector(state => state.bookList);

    useEffect(() => {
        dispatch(getBooks(type, keyword))
    }, [dispatch, keyword])

    return (
        <>
            <h1>Books for Sale</h1>
            <Row className="mt-3">
                <Col md={4}>
                    <SearchBar type="title" />
                </Col>
                <Col md={4}>
                    <SearchBar type="author" />
                </Col>
                <Col md={4}>
                    <SearchBar type="category" />
                </Col>
            </Row>
            {error ? (
                <Message>{error}</Message>
            ) : (
                <Row className="mt-3">
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