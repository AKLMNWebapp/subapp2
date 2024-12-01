import React, { useEffect, useState } from "react";
import { Button, Container, Form } from 'react-bootstrap';
import API_URL from "../apiConfig";
import { Review } from "types/Review";
import { fetchReviews } from "../functions/data";
import ReviewTable from "./ReviewTable";

const ReviewListPage: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const loadReviews = async () => {
        setLoading(true);
        setError(null);

        try {
            const productData = await fetchReviews(API_URL);
            setReviews(productData);
        } catch (error) {
            console.error(`There was a problem with the fetch operation: ${error.message}`);
            setError('Failed to fetch products')
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadReviews();
    }, []);

    return (
        <Container>
            <div className="text-center mb-4">
                <h1>Products</h1>
                <p className="text-muted">
                    This page showcases all the available reviews for this product.
                </p>
            </div>
            <Button onClick={loadReviews} className="btn btn-primary" disabled={loading}>
                {loading ? 'Loading...' : 'Refresh Items'}
            </Button>
            <Button href="/reviewcreate" className="btn btn-secondary ms-2">Create a Reaview!</Button>
            {error && <p style={{ color : 'red'}}>{error}</p>}
            <ReviewTable reviews={reviews} apiUrl={API_URL} />
        </Container>

    );
};

export default ReviewListPage;
