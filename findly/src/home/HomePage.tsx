import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const HomePage: React.FC = () => {
    console.log('HomePage rendered');
    return (
        <div className="home-page">
            <Container>
                <Row className="row align-items-center">
                    <Col className="col-md-6">
                        <h1>Welcome to Findly</h1>
                        <p>
                            Findly is a powerful and intuitive food registration tool designed for managing food products and detailed information, such as nutritional details. 
                            Whether you’re a food producer, or a regular user, Findly has everything you need to make food management easy and efficient. 
                        </p>
                        <p>
                            As a user you are able to create and read product reviews, explore different products, and create personalized collections. 
                        </p>
                        <Button href="/product" className="action-buttons mt-4">View products!</Button>
                    </Col>

                    <Col>
                        <img src="/images/header.jpeg" alt="chicken" className="img-fluid rounded"/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default HomePage;