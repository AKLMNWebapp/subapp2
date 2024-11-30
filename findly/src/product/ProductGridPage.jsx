import React, { useEffect, useState } from "react";
import { Button, Container } from 'react-bootstrap';

const API_URL = 'http://localhost:5003'

const ProductGridPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState([false]);
    const [error, setError] = useState([null]);

    const fetchItems = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_URL}/api/ProductAPI/productList`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setProducts(data);
            console.log(data);
        } catch (error) {
            console.error(`There was a problem with the fetch operation: ${error.message}`);
            setError('Failed to fetch products')
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <Container>
            <div className="text-center mb-4">
                <h1>Products</h1>
                <p className="text-muted">
                    This page showcases all the available products in our inventory. Here, you can explore a wide range of products from our food producer partners.
                    Each product includes detailed information about nutritional values, allergens, and other essential details, which you can find in the "Details" section.
                    As a user, you can also leave a review for a specific product and add it to a collection of your choice.
                </p>
            </div>
            <Button onClick={fetchItems} className="btn btn-primary mb-3" disabled={loading}>
                {loading ? 'Loading...' : 'Refresh Items'}
            </Button>
            {error && <p style={{ color : 'red'}}>{error}</p>}
            <div className="container">
                <div className="row">
                    {products.map(product => (
                        <div key={product.productId} className="col-md-4 mb-4">
                            <div className="card">
                                <img src={`${API_URL}${product.ImageUrl}`} alt={product.Name} className="card-img-top" />
                                <div className="card-body">
                                    <h5 className="card-title">{product.Name}</h5>
                                    <p className="card-text">
                                        <h6> Nutritional value pr 100g</h6>
                                        <strong>Energy: </strong>{product.Energy}<br />
                                        <strong>Fat: </strong>{product.Fat}<br />
                                        <strong>Protein: </strong>{product.Protein}<br />
                                        <strong>Carbohydrates: </strong>{product.Carbohydrates}<br />
                                        <strong>Category: </strong>{product.Category}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Container>

    );
};

export default ProductGridPage;
