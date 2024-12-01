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
                    <Col key={product.ProductId} className="col-md-4 mb-4">
                        <Card>
                            <Card.Img src={`${apiUrl}${product.ImageUrl}`} alt={product.Name} variant="top"/>
                            <Card.Body>
                                <Card.Title>{product.Name}</Card.Title>
                                <Card.Text>
                                    <h6> Nutritional value pr 100g</h6>
                                    <strong>Energy: </strong>{product.Energy}<br />
                                    <strong>Fat: </strong>{product.Fat}<br />
                                    <strong>Protein: </strong>{product.Protein}<br />
                                    <strong>Carbohydrates: </strong>{product.Carbohydrates}<br />
                                    <strong>Category: </strong>{product.CategoryId}
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