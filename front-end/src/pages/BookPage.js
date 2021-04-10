import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';

const BookScreen = ({ match }) => {
    const [book, setBook] = useState({});

    useEffect(() => {
        const fetchBook = async () => {
            const { data } = await axios.get(`/books/${match.params.id}`);
            setBook(data);
        }
        fetchBook();
    }, [match])

    return (
        <>
            <Link className="btn btn-dark my-3" to="/">Go Back</Link>
            <Row>
                <Col md={4}>
                    <Image src={book.image} alt={book.name} fluid />
                </Col>
                <Col md={4}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{book.title}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Author: {book.author}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Category: {book.category}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={book.rating} text={`${book.numReviews} reviews`} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: ${book.price}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>${book.price}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Condition:</Col>
                                    <Col>{book.condition}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button className="btn-block" type="button">
                                    Add to Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default BookScreen;