import React from "react";
import { Table, Container } from 'react-bootstrap';
import { formattedSelect } from "types/FormattedSelect";
import { Review } from "types/Review";
import { Link } from "react-router-dom";
import { format } from "date-fns";

interface ReviewGridProps {
    products: formattedSelect[];
    reviews: Review[];
    onReviewDeleted: (reviewId: number) => void
    apiUrl: string;
}

const ReviewTable: React.FC<ReviewGridProps> = ({reviews, products, onReviewDeleted}) => {
    return (
        <Container>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Review</th>
                        <th>Created at</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.map(review => (
                        <tr key={review.ReviewId}>
                            <td>{products.find(product => product.value === review.ProductId)?.label}</td>
                            <td>{review.Comment}</td>
                            <td>{format(new Date(review.CreatedAt), 'MMMM dd, yyyy HH:mm')}</td>
                            <td className="text-center">
                                <Link className="btn btn-primary ms-2" to={`/reviewupdate/${review.ReviewId}`}>Update</Link>
                                <Link className="btn btn-danger ms-2" to="#" onClick={(event) => onReviewDeleted(review.ReviewId)}>Delete</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default ReviewTable;