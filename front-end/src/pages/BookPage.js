import React, { useState, useEffect } from 'react'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBookDetails, addReview } from '../actions/bookAction';
import Rating from '../components/Rating';
import Message from '../components/Message';
import { BOOK_REVIEW_RESET } from '../constants/bookConstants';

const BookScreen = ({ match, history }) => {
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');

    const bookId = match.params.id;

    const dispatch = useDispatch();

    const { userInfo } = useSelector(state => state.login);

    const { book, error } = useSelector(state => state.bookDetails);

    const { cartItems } = useSelector(state => state.cart);

    const { success, error: errorReview } = useSelector(state => state.bookReview);

    useEffect(() => {
        if (success) {
            alert('Review added')
            setRating(0)
            setComment('')
            dispatch({ type: BOOK_REVIEW_RESET })
        }
        dispatch(getBookDetails(bookId))
    }, [dispatch, bookId, success])

    const addToCartHandler = () => {
        history.push(`/cart/${bookId}`)
    };

    const submitReviewHandler = (e) => {
        e.preventDefault();
        dispatch(addReview(match.params.id, { rating, comment }));
    };

    return (
        <>
            <Link className="btn btn-dark my-3" to="/">Go Back</Link>
            {error ? (
                <Message>{error}</Message>
            ) : (
                <>
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
                                            <Col>{book.isSold ? 'Unavailable - Sold' : 'Available'}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        {cartItems.length > 0 &&
                                            <Message variant="danger">You cannot have more than 1 item in cart.</Message>}
                                        <Button
                                            className="btn-block"
                                            type="button"
                                            onClick={addToCartHandler}
                                            disabled={book.isSold || cartItems.length > 0}
                                        >
                                            Add to Cart
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <h3>Reviews</h3>
                            {book.reviews.length === 0 && <Message>No Reviews</Message>}
                            <ListGroup variant="flush">
                                {book.reviews.map(review => (
                                    <ListGroup.Item key={review._id}>
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating} />
                                        <p>Reviewed on {review.createdAt.substring(0, 10)}</p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                            <h3>Add a Review</h3>
                            {errorReview && <Message variant='danger'>{errorReview}</Message>}
                            <ListGroup variant="flush">
                                {userInfo ? (
                                    <Form onSubmit={submitReviewHandler}>
                                        <Form.Group controlId="rating">
                                            <Form.Label>Rating</Form.Label>
                                            <Form.Control
                                                as="select"
                                                value={rating}
                                                onChange={e => setRating(e.target.value)}
                                            >
                                                <option value="">Select...</option>
                                                <option value="1">1 - Poor</option>
                                                <option value="2">2 - Fair</option>
                                                <option value="3">3 - Good</option>
                                                <option value="4">4 - Very Good</option>
                                                <option value="5">5 - Excellent</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId="comment">
                                            <Form.Label>Comment</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows="3"
                                                value={comment}
                                                onChange={e => setComment(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Button type="submit" variant="primary">Submit</Button>
                                    </Form>
                                ) : (
                                    <Message><Link to="/login">Login</Link> to write a review</Message>
                                )}
                            </ListGroup>
                        </Col>
                    </Row>
                </>
            )}
        </>
    )
}

export default BookScreen;