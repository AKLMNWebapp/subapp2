import React from "react";
import { Table, Container } from 'react-bootstrap';
import { Review } from "types/Review";

interface ReviewGridProps {
    reviews: Review[];
    apiUrl: string;
}

const ReviewTable: React.FC<ReviewGridProps> = ({reviews}) => {
    return (
        <Container>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Review</th>
                        <th>Created at</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.map(review => (
                        <tr key={review.ReviewId}>
                            <td>{review.ReviewId}</td>
                            <td>{review.Comment}</td>
                            <td>{review.CreatedAt}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default ReviewTable;