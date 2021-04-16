import React, { useEffect } from 'react';
import { Row, Col, Button, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getMyOrders } from '../actions/orderAction';
import Message from '../components/Message';

const MyOrdersPage = ({ history }) => {
    const dispatch = useDispatch();

    const { userInfo } = useSelector(state => state.login);

    const { orders, error } = useSelector(state => state.myOrders);

    useEffect(() => {
        if (!userInfo) {
            history.push('/login');
        } else {
            dispatch(getMyOrders())
        }
    }, [dispatch, userInfo, history])

    return (
        <Row className="justify-content-md-center">
            <Col md={10}>
                <h2>My Orders</h2>
                {!orders ? (
                    <>
                    </>
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    <Table striped bordered hover responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th>DETAILS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>${order.totalPrice}</td>
                                    <td>
                                        {order.isPaid ? (
                                            order.paidAt.substring(0, 10)
                                        ) : (
                                            <i className="fas fa-times" style={{ color: 'red' }} />
                                        )}
                                    </td>
                                    <td>
                                        {order.isDelivered ? (
                                            order.deliveredAt.substring(0, 10)
                                        ) : (
                                            <i className="fas fa-times" style={{ color: 'red' }} />
                                        )}
                                    </td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button className="btn-sm" variant="light">Details</Button>
                                        </LinkContainer>
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

export default MyOrdersPage;
