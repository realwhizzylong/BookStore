import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartAction';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingPage = ({ history }) => {
    const { shippingAddress } = useSelector(state => state.cart);

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [zipcode, setZipcode] = useState(shippingAddress.zipcode);
    const [country, setCountry] = useState(shippingAddress.country);

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, zipcode, country }))
        history.push('/payment')
    };

    return (
        <FormContainer>
            <CheckoutSteps step1 />
            <h1>Shipping Details</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="address"
                        placeholder="Enter address"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter city"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="zipcode">
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter zip code"
                        value={zipcode}
                        onChange={e => setZipcode(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter country"
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                    />
                </Form.Group>
                <Button type="submit" variant="primary">
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingPage;