import React, { useState, useEffect } from 'react'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBookDetails } from '../actions/bookAction';
import { getUserDetails } from '../actions/userAction';
import Rating from '../components/Rating';
import Message from '../components/Message';

const BookScreen = ({ match, history }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const bookId = match.params.id;

    const dispatch = useDispatch();

    const { book, error } = useSelector(state => state.bookDetails);

    const { user } = useSelector(state => state.userDetails);

    useEffect(() => {
        dispatch(getBookDetails(bookId))
        if (!user || !user.name) {
            dispatch(getUserDetails(book.user))
        } else {
            setName(user.name)
            setEmail(user.email)
        }
    }, [dispatch, user, bookId, book])

    const addToCartHandler = () => {
        history.push(`/cart/${bookId}`)
    };

    return (
        <>
            <Link className="btn btn-dark my-3" to="/">Go Back</Link>
            {error ? (
                <Message>{error}</Message>
            ) : (
                <Row>
                    <Col md={4}>
                        <Image src={book.image} alt={book.title} fluid />
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
                            <ListGroup.Item>
                                Seller Name: {name}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Seller Email: <a href={email}>{email}</a>
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
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>{book.isSold ? 'Unavailable' : 'Available'}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Button
                                        className="btn-block"
                                        type="button"
                                        onClick={addToCartHandler}
                                        disabled={book.isSold}
                                    >
                                        Add to Cart
                                </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            )}
        </>
    )
}

export default BookScreen;