import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Review } from "types/Review";
import ReviewForm from "./ReviewForm";
import { fetchReviewById, updateReview } from "./ReviewService";

const ReviewUpdatePage: React.FC = () => {
    const {ReviewId} = useParams<{ReviewId: string}>();
    const navigate = useNavigate();
    const [review, setReview] = useState<Review | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReview = async () => {
            try {
                const data = await fetchReviewById(ReviewId);
                setReview(data);
            } catch (error) {
                setError('Failed to fetch product');
                console.error("There was a problem with the fetch operation:",error);
            } finally {
                setLoading(false);
            }
        };

        fetchReview();
    }, [ReviewId]);

    const handleReviewUpdated = async (review: Review) => {
        try {
            const data = await updateReview(review.ReviewId,review);
            console.log('Review updated successfully:', data);
            navigate('/review');
        } catch (error) {
            console.error('There was a problem with the fetch operation');
        }
    }

    if(loading) return <p>Loading...</p>
    if(error) return <p>{error}</p>
    if(!review) return <p>No review found</p>

    return (
        <div>
            <h2>Update product</h2>
            <ReviewForm onReviewChanged={handleReviewUpdated} ReviewId={review.ReviewId} isUpdate={true} initialData={review} />
        </div>
    );

};

export default ReviewUpdatePage;