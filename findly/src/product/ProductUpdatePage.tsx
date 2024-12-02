import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Product } from "types/product";
import ProductForm from "./ProductForm";
import { fetchProductById, updateProduct } from "./ProductService";

const ProductUpdatePage: React.FC = () => {
    const {ProductId} = useParams<{ProductId: string}>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await fetchProductById(ProductId);
                setProduct(data);
            } catch (error) {
                setError('Failed to fetch product');
                console.error("There was a problem with the fetch operation:",error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [ProductId]);

    const handleProductUpdated = async (product: Product) => {
        try {
            const data = await updateProduct(product.ProductId,product);
            console.log('Product updated successfully:', data);
            navigate('/product');
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