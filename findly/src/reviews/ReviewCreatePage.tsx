import React from "react";
import ReviewForm from "./ReviewForm";
import { Review } from "types/Review";
import { createReview } from "./ReviewService";
import { useNavigate } from "react-router-dom";

const ReviewCreatePage: React.FC = () => {

    const navigate = useNavigate();

    const handleReviewCreated = async (review: Review) => {
        try {
            const data = await createReview(review);
            console.log("Review created successfully", data);
            navigate('/review');
        } catch (error) {
            console.error('There was a problem with the fetch operation', error);
        }
    }
    return(
        <div>
            <h2>Create new Review</h2>
            <ReviewForm onReviewChanged={handleReviewCreated} />
        </div>
    );
};

export default ReviewCreatePage;