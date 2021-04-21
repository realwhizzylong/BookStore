import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router';

const Searchbar = ({ history, type }) => {
    const [keyword, setKeyword] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            history.push(`/search/${type}/${keyword}`);
        } else {
            history.push('/');
        }
    }

    return (
        <Form onSubmit={submitHandler} inline>
            <Form.Control
                type="text"
                name="q"
                onChange={e => setKeyword(e.target.value)}
                placeholder={`Search by ${type}...`}
                className="mr-sm-2 ml-sm-5"
            />
            <Button type="submit" variant="outline-success" className="p-2">
                Search
            </Button>
        </Form>
    )
}

export default withRouter(Searchbar);