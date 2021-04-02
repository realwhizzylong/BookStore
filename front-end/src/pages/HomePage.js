import React from 'react';
import { Row, Col } from 'react-bootstrap';
import books from '../books';
import Book from "../components/Book";

const HomePage = () => {
    return (
        <>
            <h1>Books for Sale</h1>
            <Row>
                {books.map(book => (
                    <Col key={book._id} sm={12} md={6} lg={4} xl={3}>
                        <Book book={book} />
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default HomePage;
