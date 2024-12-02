import React, { useEffect, useState } from "react";
import { Button, Container, Form } from 'react-bootstrap';
import ProductGrid from "./ProductGrid";
import { Product } from "types/product";
import API_URL from "../apiConfig";
import { deleteProduct, fetchCategories, fetchProducts } from './ProductService';
import { formattedSelect } from "types/FormattedSelect";

const ProductListPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<formattedSelect[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const loadProducts = async () => {
        setLoading(true);
        setError(null);

        try {
            const productData = await fetchProducts();
            setProducts(productData);
        } catch (error) {
            console.error(`There was a problem with the fetch operation: ${error.message}`);
            setError('Failed to fetch products')
        } finally {
            setLoading(false);
        }
    };

    const loadCategories = async () => {
        setLoading(true);
        setError(null);

        try {
            const catData = await fetchCategories();
            setCategories(catData);
        } catch (error) {
            console.error(`There was a problem with the fetch operation: ${error.message}`);
            setError('Failed to fetch categories')
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
        loadCategories();
    }, []);

    const filteredProducts = products.filter(product => {
        const category = categories.find(category => category.value === product.CategoryId);
        const catName = category?.label || '';
        const description = product.Description || '';
        const name = product.Name || '';
        return catName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        description.toLowerCase().includes(searchQuery.toLowerCase()) || name.toLowerCase().includes(searchQuery.toLowerCase())
    });

    const handleProductDeleted = async (productId: number) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this item');
        if(confirmDelete) {
            try {
                await deleteProduct(productId)
                setProducts(prevProducts => prevProducts.filter(product => product.ProductId !== productId));
                console.log('Product deleted: ', productId);
            } catch (error) {
                console.error('Error deleting product:', error);
                setError('Failed to delete product');
            }
        }
    };

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
                placeholder="search by name, description or category" 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                />
            </Form.Group>
            {error && <p style={{ color : 'red'}}>{error}</p>}
            <ProductGrid products={filteredProducts} categories={categories} apiUrl={API_URL} onProductDeleted={handleProductDeleted} />
        </Container>

    );
};

export default ProductListPage;
