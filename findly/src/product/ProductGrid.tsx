import React from "react";
import { Row, Col, Card, Container } from 'react-bootstrap';
import { Product } from "types/product";

interface ProductGridProps {
    products: Product[];
    apiUrl: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, apiUrl }) => {
    return (
        <Container>
            <Row xs={1}>
                {products.map(product => (
                    <Col key={product.productId} className="col-md-4 mb-4">
                        <Card>
                            <Card.Img src={`${apiUrl}${product.imageUrl}`} alt={product.name} variant="top"/>
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>
                                    <h6> Nutritional value pr 100g</h6>
                                    <strong>Energy: </strong>{product.energy}<br />
                                    <strong>Fat: </strong>{product.fat}<br />
                                    <strong>Protein: </strong>{product.protein}<br />
                                    <strong>Carbohydrates: </strong>{product.carbohydrates}<br />
                                    <strong>Category: </strong>{product.category}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ProductGrid;