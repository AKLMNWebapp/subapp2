import React from "react";
import { Row, Col, Card, Container, Button} from 'react-bootstrap';
import { Product } from "types/product";
import { Link } from "react-router-dom";

interface ProductGridProps {
    products: Product[];
    apiUrl: string;
    onProductDeleted: (productId: number) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, apiUrl , onProductDeleted}) => {
    return (
        <Container>
            <Row xs={1}>
                {products.map(product => (
                    <Col key={product.ProductId} className="col-md-4 mb-4">
                        <Card>
                            <Card.Img src={`${apiUrl}${product.ImageUrl}`} alt={product.Name} variant="top"/>
                            <Card.Body>
                                <Card.Title>{product.ProductId}{product.Name}</Card.Title>
                                <Card.Text>
                                    <h6> Nutritional value pr 100g</h6>
                                    <strong>Energy: </strong>{product.Energy}<br />
                                    <strong>Fat: </strong>{product.Fat}<br />
                                    <strong>Protein: </strong>{product.Protein}<br />
                                    <strong>Carbohydrates: </strong>{product.Carbohydrates}<br />
                                    <strong>Category: </strong>{product.CategoryId}
                                </Card.Text>
                            <Button href={"/review"} variant="primary">Show reviews</Button>
                            <Button href={`/productupdate/${product.ProductId}`} variant="secondary" >Update</Button>
                            <Button onClick={(event) => onProductDeleted(product.ProductId)} variant="danger">Delete</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ProductGrid;