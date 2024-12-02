import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import { Review } from 'types/Review';
import { fetchProductsSelect } from './ReviewService';
import { formattedSelect } from 'types/FormattedSelect';

interface ReviewFormProps {
    onReviewChanged: (newReview: Review) => void;
    ReviewId?: number;
    isUpdate?: boolean;
    initialData?: Review;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
    onReviewChanged, 
    ReviewId, 
    isUpdate=false, 
    initialData}) => {
    const [Comment, setComment] = useState<string>(initialData?.Comment || '');
    const [Products, setProducts] = useState<formattedSelect[]>([]);
    const [ProductId, setProductId] = useState<number>(initialData?.ProductId || 0);
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
            const productData = await fetchProductsSelect();
            setProducts(productData);
        } catch (error) {
            console.error(`There was a problem with the fetch operation: ${error.message}`);
            setError('Failed to fetch products');
        }
    };

    const handleProductChange = (selectedProduct: formattedSelect | null) => {
        setProductId(selectedProduct ? selectedProduct.value : undefined);
    };      

    return (
        <Form onSubmit={handleSubmit}>
            {!isUpdate ? (
                <Form.Group controlId='formReviewProduct'>
                    <Form.Label>Product</Form.Label>
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
            ) : (
                <Form.Group>
                    <Form.Label>Product</Form.Label>
                    <Form.Control
                        type='hidden'
                        value={initialData?.ProductId}
                        required
                    />
                </Form.Group>
            )}
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
            
            <Button variant='primary' type='submit'>{isUpdate ? 'Update Review' : 'Create Review'}</Button>
            <Button variant='secondary' onClick={onCancel} className='ms-2'>Cancel</Button>
        </Form>
    );

};

export default ReviewForm;