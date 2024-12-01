import API_URL from "../apiConfig";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "types/product";
import ProductForm from "./ProductForm";

const ProductCreatePage: React.FC = () => {
    const navigate = useNavigate();

    const handleProductCreated = async (product: Product) => {
        try {
            const response = await fetch(`${API_URL}/api/ProductAPI/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });

            if(!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Product created successfully', data);
            navigate('/products');

        } catch (error) {
            console.error('There was a problem with the fetch operation', error);
        }
    }
    return(
        <div>
            <h2>Create new product</h2>
            <ProductForm onProductChanged={handleProductCreated} />
        </div>
    );
};

export default ProductCreatePage;