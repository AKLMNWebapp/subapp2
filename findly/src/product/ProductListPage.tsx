import React, { useEffect, useState } from "react";
import { Button, Container, Form } from 'react-bootstrap';
import ProductGrid from "./ProductGrid";
import { Product } from "types/product";
import API_URL from "../apiConfig";
import { fetchProducts } from "../functions/data";

const ProductListPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const loadProducts = async () => {
        setLoading(true);
        setError(null);

        try {
            const productData = await fetchProducts(API_URL);
            setProducts(productData);
        } catch (error) {
            console.error(`There was a problem with the fetch operation: ${error.message}`);
            setError('Failed to fetch products')
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const filteredProducts = products.filter(product => {
        const name = product.Name || '';
        const description = product.Description || '';
        return name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        description.toLowerCase().includes(searchQuery.toLowerCase())
    });

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
            <Button onClick={loadProducts} className="btn btn-primary" disabled={loading}>
                {loading ? 'Loading...' : 'Refresh Items'}
            </Button>
            <Button href="/productcreate" className="btn btn-secondary ms-2">Create a product!</Button>
            <Form.Group className="mb-3">
                <Form.Control 
                type="text" 
                placeholder="search by name or description" 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                />
            </Form.Group>
            {error && <p style={{ color : 'red'}}>{error}</p>}
            <ProductGrid products={filteredProducts} apiUrl={API_URL} />
        </Container>

    );
};

export default ProductListPage;
