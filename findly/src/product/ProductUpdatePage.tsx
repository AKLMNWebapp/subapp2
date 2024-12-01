import API_URL from "../apiConfig";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Product } from "types/product";
import ProductForm from "./ProductForm";

const ProductUpdatePage: React.FC = () => {
    const {productId} = useParams<{productId: string}>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${API_URL}/api/productAPI/${productId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProduct(data);
            } catch {
                setError('Failed to fetch product');
                console.error("There was a problem with the fetch operation:",error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    const handleProductUpdated = async (product: Product) => {
        try {
            const response = await fetch(`${API_URL}/api/productAPI/update/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Product updated successfully:', data);
            navigate('/products');
        } catch (error) {
            console.error('There was a problem with the fetch operation');
        }
    }

    if(loading) return <p>Loading...</p>
    if(error) return <p>{error}</p>
    if(!product) return <p>No product found</p>

    return (
        <div>
            <h2>Update product</h2>
            <ProductForm onProductChanged={handleProductUpdated} ProductId={product.ProductId} isUpdate={true} initialData={product} />
        </div>
    );

};

export default ProductUpdatePage;