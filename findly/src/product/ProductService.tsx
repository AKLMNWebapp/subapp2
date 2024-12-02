import { Product } from "types/product";
import { formattedSelect } from "types/FormattedSelect";
import API_URL from "../apiConfig";
import { Category } from "types/category";

const headers = {
    'Content-type':'application/json',
};

const handleResponse = async (response: Response) => {
    if (response.ok) {
        if(response.status === 204) {
            return null;
        }
        return response.json();
    } else {
        const errorText = await response.text();
        throw new Error(errorText || 'Network response was not ok!');
    }
};

export const fetchProducts = async (): Promise<Product[]> => {
    const response = await fetch(`${API_URL}/api/ProductAPI/productList`);
    return handleResponse(response);

};

export const fetchProductById = async (ProductId: string) => {
    const response = await fetch(`${API_URL}/api/ProductAPI/${ProductId}`);
    return handleResponse(response);
};

export const createProduct = async (product: Product) => {
    const response = await fetch(`${API_URL}/api/ProductAPI/create`, {
        method: 'POST',
        headers,
        body: JSON.stringify(product),
    });
    return handleResponse(response);
};

export const updateProduct = async (ProductId: number,product: Product) => {
    const response = await fetch(`${API_URL}/api/ProductAPI/update/${ProductId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(product),
    });

    return handleResponse(response);
};

export const deleteProduct = async (productId: number) => {
    const response = await fetch(`${API_URL}/api/productAPI/delete/${productId}`, {
        method: 'DELETE',
    });
    return handleResponse(response);
};

export const fetchCategories = async (): Promise<formattedSelect[]> => {
    try {
        const response = await fetch(`${API_URL}/api/categoryAPI/categorylist`);
        const data: Category[] = await handleResponse(response);  // Using handleResponse here
        return data.map(category => ({
            label: category.Name,
            value: category.CategoryId
        }));
    } catch (error) {
        console.error(`There was a problem with the fetch operation: ${error.message}`);
        throw error;
    }
};