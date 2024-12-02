import React, { useEffect, useState } from "react";
import { Button, Container, Form } from 'react-bootstrap';
import API_URL from "../apiConfig";
import { Review } from "types/Review";
import ReviewTable from "./ReviewTable";
import { formattedSelect } from "types/FormattedSelect";
import { deleteReview, fetchProductsSelect, fetchReviews } from "./ReviewService";

const ReviewListPage: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [products, setProducts] = useState<formattedSelect[]>([])
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        loadReviews();
        loadProducts();
    }, []);


    const loadReviews = async () => {
        setLoading(true);
        setError(null);

        try {
            const productData = await fetchReviews();
            setReviews(productData);
        } catch (error) {
            console.error(`There was a problem with the fetch operation: ${error.message}`);
            setError('Failed to fetch products')
        } finally {
            setLoading(false);
        }
    };

    const loadProducts = async () => {
        setError(null);
        try {
            const productData = await fetchProductsSelect();
            setProducts(productData);
        } catch (error) {
            console.error(`There was a problem with the fetch operation: ${error.message}`);
            setError('Failed to fetch products')
        }
    };

    const filteredReviews = reviews.filter(review => {
        const product = products.find(product => product.value === review.ProductId);
        const name = product?.label;
        return name ? name.toLowerCase().includes(searchQuery.toLowerCase()) : false;
    });

    const handleReviewDeleted = async (ReviewId: number) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this review?');
        if(confirmDelete) {
            try {
                await deleteReview(ReviewId);
                setReviews(prevReviews => prevReviews.filter(review => review.ReviewId !== ReviewId));
                console.log('Review deleted: ', ReviewId);
            } catch (error) {
                console.error('Error deleting product:', error);
                setError('Failed to delete product');
            }
        }
    };

    return (
        <Container>
            <div className="text-center mb-4">
                <h1>Products</h1>
                <p className="text-muted">
                    This page showcases all the available reviews, you can search for the product you wish to view reviews for!
                </p>
            </div>
            <Form.Group className="mb-3">
                <Form.Control 
                type="text" 
                placeholder="search by name" 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                />
            </Form.Group>
            <Button onClick={loadReviews} className="btn btn-primary" disabled={loading}>
                {loading ? 'Loading...' : 'Refresh Items'}
            </Button>
            <Button href="/reviewcreate" className="btn btn-secondary ms-2">Create a Review!</Button>
            {error && <p style={{ color : 'red'}}>{error}</p>}
            <ReviewTable reviews={filteredReviews} onReviewDeleted={handleReviewDeleted} products={products} apiUrl={API_URL} />
        </Container>

    );
};

export default ReviewListPage;
