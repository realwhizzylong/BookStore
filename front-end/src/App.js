import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BookPage from './pages/BookPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import OrderPlacementPage from './pages/OrderPlacementPage';
import OrderPage from './pages/OrderPage';
import MyOrdersPage from './pages/MyOrdersPage';
import NewBookPage from './pages/NewBookPage';
import MyBooksPage from './pages/MyBooksPage';
import BookEditPage from './pages/BookEditPage';
import MyDeliveryPage from './pages/MyDeliveryPage';

const App = () => {
    return (
        <Router>
            <Header />
            <main className="py-3">
                <Container>
                    <Route path="/" component={HomePage} exact />
                    <Route path="/search/:keyword" component={HomePage} exact />
                    <Route path="/search/:type/:keyword" component={HomePage} exact />
                    <Route path="/book/:id" component={BookPage} exact />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                    <Route path="/cart/:id?" component={CartPage} />
                    <Route path="/profile" component={ProfilePage} />
                    <Route path="/shipping" component={ShippingPage} />
                    <Route path="/payment" component={PaymentPage} />
                    <Route path="/placeorder" component={OrderPlacementPage} />
                    <Route path="/order/:id" component={OrderPage} />
                    <Route path="/myorders" component={MyOrdersPage} />
                    <Route path="/newbook" component={NewBookPage} />
                    <Route path="/mybooks" component={MyBooksPage} />
                    <Route path="/book/:id/edit" component={BookEditPage} exact />
                    <Route path="/mydelivery" component={MyDeliveryPage} />
                </Container>
            </main>
            <Footer />
        </Router>
    )
};

export default App;