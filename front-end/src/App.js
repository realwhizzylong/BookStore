import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
    return (
        <Router>
            <Header />
            <main className="py-3">
                <Container>
                    <h3>Welcome to BookStore</h3>
                </Container>
            </main>
            <Footer />
        </Router>
    )
};

export default App;