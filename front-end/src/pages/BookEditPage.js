import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBookDetails, editBook } from '../actions/bookAction';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import { BOOK_EDIT_RESET } from '../constants/bookConstants';

const BookEditPage = ({ match, history }) => {
    const bookId = match.params.id;

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState(0);
    const [condition, setCondition] = useState('');

    const dispatch = useDispatch();

    const { book, error } = useSelector(state => state.bookDetails);

    const { success, error: errorEdit } = useSelector(state => state.bookEdit);

    useEffect(() => {
        if (success) {
            dispatch({ type: BOOK_EDIT_RESET })
            history.push('/mybooks');
        } else {
            if (!bookId || book._id !== bookId) {
                dispatch(getBookDetails(bookId));
            } else {
                setTitle(book.title);
                setAuthor(book.author);
                setCategory(book.category);
                setImage(book.image);
                setPrice(book.price);
                setCondition(book.condition);
            }
        }
    }, [dispatch, success, bookId, book, history])

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
        e.preventDefault();
        dispatch(editBook({ _id: bookId, title, author, category, image, price, condition }));
    };

    return (
        <>
            <Link to="/mybooks" className="btn btn-dark my-3">
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit Book Details</h1>
                {errorEdit && <Message variant="danger">{errorEdit}</Message>}
                {error ? (
                    <Message variant="danger">
                        {error}
                    </Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="name">
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
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    )
}

export default BookEditPage;