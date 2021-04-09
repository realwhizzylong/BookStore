import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BookPage from './pages/BookPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const App = () => {
    return (
        <Router>
            <Header />
            <main className="py-3">
                <Container>
                    <Route path="/" component={HomePage} exact />
                    <Route path="/books/:id" component={BookPage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                </Container>
            </main>
            <Footer />
        </Router>
    )
};

export default App;