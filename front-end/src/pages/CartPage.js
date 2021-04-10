import React, { useEffect } from 'react';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartAction';
import Message from '../components/Message';

const CartScreen = ({ match, history }) => {
    const bookId = match.params.id;

    const dispatch = useDispatch();

    const { cartItems } = useSelector(state => state.cart);

    useEffect(() => {
        if (bookId) {
            dispatch(addToCart(bookId))
        }
    }, [dispatch, bookId])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    };

    const checkoutHandler = () => {
        history.push('/login?redirect=order')
    };

    return (
        <>
            <h1>Shopping Cart</h1>
            <Row>
                <Col md={8}>
                    {cartItems.length === 0 ? (
                        <Message>
                            Your cart is empty. <Link to="/">Go back.</Link>
                        </Message>
                    ) : (
                        <ListGroup variant="flush">
                            {cartItems.map(item => (
                                <ListGroup.Item key={item.id}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.title} fluid rounded />
                                        </Col>
                                        <Col md={4}>
                                            <Link to={`/products/${item.id}`}>
                                                {item.title}
                                            </Link>
                                        </Col>
                                        <Col md={2}>
                                            {item.author}
                                        </Col>
                                        <Col md={2}>
                                            ${item.price}
                                        </Col>
                                        <Col md={2}>
                                            <Button
                                                variant="light"
                                                onClick={() => removeFromCartHandler(item.id)}
                                            >
                                                <i className="fas fa-trash"></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h4>Subtotal {cartItems.length} Books</h4>
                                ${cartItems.reduce((acc, item) => acc + item.price, 0)}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type="block"
                                    className="btn-block"
                                    disabled={cartItems.length === 0}
                                    onClick={checkoutHandler}
                                >
                                    Place Order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default CartScreen;
