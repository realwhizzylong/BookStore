import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {

    }, [])

    const submitHandler = () => {

    };

    return (
        <FormContainer>
            <h1>Log In</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button type="submit" variant="primary">
                    Log In
                </Button>
            </Form>
            <Row className="py-3">
                <Col>
                    New Customer? <Link to={'/register'}>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginPage;
