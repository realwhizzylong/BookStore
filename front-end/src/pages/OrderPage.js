import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateBookToSold } from '../actions/bookAction';
import { deliverOrder, getOrderDetails, payOrder } from '../actions/orderAction';
import { BOOK_SOLD_RESET } from '../constants/bookConstants';
import { PAY_ORDER_RESET, DELIVER_ORDER_RESET } from '../constants/orderConstants';
import Message from '../components/Message';

const OrderPage = ({ match }) => {
    const [sdkReady, setSdkReady] = useState(false);

    const orderId = match.params.id;

    const dispatch = useDispatch();

    const { userInfo } = useSelector(state => state.login);

    const { order, error } = useSelector(state => state.orderDetails);

    const { success: successPay } = useSelector(state => state.payOrder);

    const { success: successDeliver } = useSelector(state => state.deliverOrder);

    const { success: successSold } = useSelector(state => state.bookSold);

    useEffect(() => {
        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }
        if (!order || successPay || successDeliver || successSold || order._id !== orderId) {
            dispatch({ type: PAY_ORDER_RESET })
            dispatch({ type: DELIVER_ORDER_RESET })
            dispatch({ type: BOOK_SOLD_RESET })
            dispatch(getOrderDetails(orderId))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, order, orderId, successPay, successDeliver, successSold])

    const paymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult))
        dispatch(updateBookToSold(order.orderItems[0].id))
    };

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    return (
        <>
            {!order ? (
                <>
                </>
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <>
                    <h1>Order {order._id}</h1>
                    <Row>
                        <Col md={8}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h2>Shipping</h2>
                                    <p>
                                        <strong>Name: </strong>
                                        {order.user.name}
                                    </p>
                                    <p>
                                        <strong>Email: </strong>
                                        <a href={order.user.email}>{order.user.email}</a>
                                    </p>
                                    <p>
                                        <strong>Address: </strong>
                                        {order.shippingAddress.address},
                                        {' '}
                                        {order.shippingAddress.city},
                                        {' '}
                                        {order.shippingAddress.zipcode},
                                        {' '}
                                        {order.shippingAddress.country}
                                    </p>
                                    {order.isDelivered ? (
                                        <Message variant="success">Delivered on {order.deliveredAt}</Message>
                                    ) : (
                                        <Message variant="danger">Not Delivered</Message>
                                    )}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h2>Payment Method</h2>
                                    <p>
                                        <strong>Method: </strong>
                                        {order.paymentMethod}
                                    </p>
                                    {order.isPaid ? (
                                        <Message variant="success">Paid on {order.paidAt}</Message>
                                    ) : (
                                        <Message variant="danger">Not Paid</Message>
                                    )}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h2>Order Items</h2>
                                    {order.orderItems.length === 0 ? (
                                        <Message>No Orders</Message>
                                    ) : (
                                        <ListGroup variant="flush">
                                            {order.orderItems.map((item, index) => (
                                                <ListGroup.Item key={index}>
                                                    <Row>
                                                        <Col md={1}>
                                                            <Image src={item.image} alt={item.name} fluid rounded />
                                                        </Col>
                                                        <Col>
                                                            <Link to={`/products/${item.product}`}>
                                                                {item.title}
                                                            </Link>
                                                        </Col>
                                                        <Col md={2}>
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
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h2>Order Summary</h2>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Item Price</Col>
                                            <Col>${order.totalPrice}</Col>
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
                                            <Col>${order.totalPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {!order.isPaid && (
                                        <ListGroup.Item>
                                            {sdkReady &&
                                                <PayPalButton
                                                    amount={order.totalPrice}
                                                    onSuccess={paymentHandler}
                                                />
                                            }
                                        </ListGroup.Item>
                                    )}
                                    {userInfo && order.seller === userInfo._id && order.isPaid && !order.isDelivered && (
                                        <ListGroup.Item>
                                            <Button type="button" className="btn btn-block" onClick={deliverHandler}>
                                                Mark As Delivered
                                            </Button>
                                        </ListGroup.Item>
                                    )}
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </>
            )}
        </>
    )
}

export default OrderPage;