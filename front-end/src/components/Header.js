import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userAction';

const Header = () => {
    const dispatch = useDispatch();

    const { userInfo } = useSelector(state => state.login);

    const logoutHandler = () => {
        dispatch(logout());
    };

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>BookStore</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            {userInfo &&
                                <LinkContainer to="/newbook">
                                    <Nav.Link><i className="fas fa-plus"></i> New Book</Nav.Link>
                                </LinkContainer>}
                            <LinkContainer to="/cart">
                                <Nav.Link><i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
                            </LinkContainer>
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id="username">
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/myorders">
                                        <NavDropdown.Item>My Orders</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/mybooks">
                                        <NavDropdown.Item>My Books</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/mydelivery">
                                        <NavDropdown.Item>My Delivery</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/">
                                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link><i className="fas fa-user"></i> Login</Nav.Link>
                                </LinkContainer>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </header>
    )
};

export default Header;