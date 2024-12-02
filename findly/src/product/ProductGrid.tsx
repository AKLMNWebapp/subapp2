import React, { useState } from "react";
import { Row, Col, Card, Container, Button} from 'react-bootstrap';
import { Product } from "types/product";
import { formattedSelect } from "types/FormattedSelect";
import { format } from "date-fns";

interface ProductGridProps {
    products: Product[];
    categories: formattedSelect[];
    apiUrl: string;
    onProductDeleted: (productId: number) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, apiUrl, categories , onProductDeleted}) => {
    const [showDescription, setShowDescription] = useState<boolean>(false);
    const toggleDescription = () => setShowDescription(prevShowDescription => !prevShowDescription);
    return (
        <Container>
            <Button onClick={toggleDescription} className="btn btn-secondary">
                {showDescription ? 'Hide descriptions' : "Show descriptions"}
            </Button>
            <Row xs={1} sm={2}>
                {products.map(product => (
                    <Col key={product.ProductId} className="col-md-4 mb-4">
                        <Card>
                            <Card.Img src={`${apiUrl}${product.ImageUrl}`} alt={product.Name} variant="top"/>
                            <Card.Body>
                                <Card.Title>{product.Name}</Card.Title>
                                <Card.Subtitle> Nutritional value pr 100g</Card.Subtitle>
                                <Card.Text>
                                    <strong>Energy: </strong>{product.Energy}<br />
                                    <strong>Fat: </strong>{product.Fat}<br />
                                    <strong>Protein: </strong>{product.Protein}<br />
                                    <strong>Carbohydrates: </strong>{product.Carbohydrates}<br />
                                    <strong>Category: </strong>{categories.find(category => category.value === product.CategoryId)?.label}<br />
                                    <strong>Created: </strong>{format(new Date(product.CreatedAt), 'MMMM dd, yyyy HH:mm')}<br />
                                </Card.Text>
                                {showDescription && <p>{product.Description}</p>}
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