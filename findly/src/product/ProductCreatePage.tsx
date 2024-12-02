import React from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "types/product";
import ProductForm from "./ProductForm";
import { createProduct } from "./ProductService";

const ProductCreatePage: React.FC = () => {
    const navigate = useNavigate();

    const handleProductCreated = async (product: Product) => {
        try {
            const data = await createProduct(product);
            console.log('Product created successfully', data);
            navigate('/product');

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