import API_URL from "../apiConfig";
import React from "react";
import { useNavigate } from "react-router-dom";
import ReviewForm from "./ReviewForm";
import { Review } from "types/Review";

const ReviewCreatePage: React.FC = () => {
    const navigate = useNavigate();

    const handleReviewCreated = async (review: Review) => {
        try {
            const response = await fetch(`${API_URL}/api/ReviewAPI/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(review),
            });

            if(!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Product created successfully', data);
            navigate('/reviews');

        } catch (error) {
            console.error('There was a problem with the fetch operation', error);
        }
    }
    return(
        <div>
            <h2>Create new product</h2>
            <ReviewForm onReviewChanged={handleReviewCreated} />
        </div>
    );
};

export default ReviewCreatePage;