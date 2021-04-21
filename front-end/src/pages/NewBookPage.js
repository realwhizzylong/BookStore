import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createBook } from '../actions/bookAction';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import { BOOK_CREATE_RESET } from '../constants/bookConstants';

const NewBookPage = ({ history }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState(0);
    const [condition, setCondition] = useState('');

    const dispatch = useDispatch();

    const { userInfo } = useSelector(state => state.login);

    const { success, error } = useSelector(state => state.bookCreate);

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }
        if (success) {
            dispatch({ type: BOOK_CREATE_RESET })
            history.push('/mybooks')
        }
    }, [dispatch, userInfo, success, history])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const { data } = await axios.post('/upload', formData, config);
            setImage(data);
        } catch (error) {
            console.error(error);
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createBook({ user: userInfo._id, title, author, category, image, price, condition }))
    };

    return (
        <>
            <Link to="/" className="btn btn-dark my-3">
                Go Back
            </Link>
            <FormContainer>
                <h1>New Book</h1>
                {error && <Message variant="danger">{error}</Message>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="author">
                        <Form.Label>Author</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter author"
                            value={author}
                            onChange={e => setAuthor(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter category"
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="image">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Upload image / Enter image url"
                            value={image}
                            onChange={e => setImage(e.target.value)}
                        />
                        <Form.File id="image-file" label="Choose file" custom onChange={uploadFileHandler} />
                    </Form.Group>
                    <Form.Group controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter price"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="condition">
                        <Form.Label>Condition</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter condition"
                            value={condition}
                            onChange={e => setCondition(e.target.value)}
                        />
                    </Form.Group>
                    <Button type="submit" variant="primary">
                        Create Book
                </Button>
                </Form>
            </FormContainer>
        </>
    )
}

export default NewBookPage;