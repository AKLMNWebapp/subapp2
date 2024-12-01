import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import { Review } from 'types/Review';
import { fetchProductsSelect } from '../functions/data';
import { formattedSelect } from 'types/FormattedSelect';
import API_URL from '../apiConfig';

interface ReviewFormProps {
    onReviewChanged: (newReview: Review) => void;
    ReviewId?: number;
}

const ReviewForm: React.FC<ReviewFormProps> = ({onReviewChanged, ReviewId}) => {
    const [Comment, setComment] = useState<string>('');
    const [Products, setProducts] = useState<formattedSelect[]>([]);
    const [ProductId, setProductId] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        loadProducts();
    }, []);


    const onCancel = () => {
        navigate(-1);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const review: Review = {ReviewId, Comment, ProductId};
        onReviewChanged(review);
    };

    const loadProducts = async () => {
        setError(null);

        try {
            const productData = await fetchProductsSelect(API_URL);
            setProducts(productData);
        } catch (error) {
            console.error(`There was a problem with the fetch operation: ${error.message}`);
            setError('Failed to fetch products')
        }
    };

    const handleProductChange = (selectedProduct: formattedSelect | null) => {
        setProductId(selectedProduct ? selectedProduct.value : undefined);
    };      

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId='formReviewProduct'>
                <Form.Label>Category</Form.Label>
                <Select 
                    options={Products}
                    onChange={handleProductChange}
                    value={Products.find(product => product.value === ProductId)}
                    placeholder='select a category'
                    required
                />
                <Form.Control
                    type='hidden'
                    required
                />
            </Form.Group>
            <Form.Group controlId='formReviewComment'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as='textarea'
                    rows={3}
                    placeholder='Enter product name'
                    value={Comment}
                    onChange={(e) => setComment(e.target.value)}
                    pattern='[0-9a-zA-ZæøåÆØÅ. \-]{2,500}'
                    title='The name must be numbers or letters and between 2 and 500 characters'
                />
            </Form.Group>
            {error && <p style={{ color : 'red'}}>{error}</p>}
            
            <Button variant='primary' type='submit'>Create Review</Button>
            <Button variant='secondary' onClick={onCancel} className='ms-2'>Cancel</Button>
        </Form>
    );

};

export default ReviewForm;