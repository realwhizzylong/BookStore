import React, { useEffect } from 'react';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../actions/orderAction';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';

const OrderPlacementPage = ({ history }) => {
    const dispatch = useDispatch();

    const { cartItems, shippingAddress, paymentMethod } = useSelector(state => state.cart);

    const totalPrice = Number(cartItems.reduce((acc, item) => acc + item.price, 0));

    const { success, order, error } = useSelector(state => state.orderCreate);

    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`)
        }
    }, [success, history])

    const submitHandler = () => {
        dispatch(createOrder({ orderItems: cartItems, shippingAddress, paymentMethod, totalPrice }))
    };

    return (
        <>
            <CheckoutSteps step1 step2 step3 />
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping Details</h2>
                            <p>
                                <strong>Address: </strong>
                                {shippingAddress.address},
                                {' '}
                                {shippingAddress.city},
                                {' '}
                                {shippingAddress.zipcode},
                                {' '}
                                {shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>Method: </strong>
                            {paymentMethod}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cartItems.length === 0 ? (
                                <Message>Nothing in Cart</Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/book/${item.id}`}>
                                                        {item.title}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    ${item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    {error && <Message variant='danger'>{error}</Message>}
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Item Price</Col>
                                    <Col>${totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping Price</Col>
                                    <Col>$0.00</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax Price</Col>
                                    <Col>$0.00</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn-block'
                                    disabled={cartItems.length === 0}
                                    onClick={submitHandler}
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

export default OrderPlacementPage;
