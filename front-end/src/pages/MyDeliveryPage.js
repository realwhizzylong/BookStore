import React, { useEffect } from 'react';
import { Row, Col, Button, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getSellerOrders } from '../actions/orderAction';
import Message from '../components/Message';

const MyDeliveryPage = ({ history }) => {
    const dispatch = useDispatch();

    const { userInfo } = useSelector(state => state.login);

    const { orders, error } = useSelector(state => state.sellerOrders);

    useEffect(() => {
        if (!userInfo) {
            history.push('/login');
        } else {
            dispatch(getSellerOrders())
        }
    }, [dispatch, userInfo, history])

    return (
        <Row className="justify-content-md-center">
            <Col md={12}>
                <h2>Orders To Be Delivered</h2>
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
                                <th>Date</th>
                                <th>Total</th>
                                <th>Paid</th>
                                <th>Delivered</th>
                                <th>Details</th>
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

export default MyDeliveryPage;