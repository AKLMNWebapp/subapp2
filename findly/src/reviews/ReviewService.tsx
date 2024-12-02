import API_URL from "../apiConfig";
import { formattedSelect } from "types/FormattedSelect";
import { Product } from "types/product";
import { Review } from "types/Review";

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

export const fetchReviews = async (): Promise<Review[]> => {
    const response = await fetch(`${API_URL}/api/ReviewAPI/reviewList`);
    return handleResponse(response);
};

export const fetchReviewById = async (ReviewId: string) => {
    const response = await fetch(`${API_URL}/api/ReviewAPI/${ReviewId}`);
    return handleResponse(response);
};

export const createReview = async (review: Review) => {
    const response = await fetch(`${API_URL}/api/ReviewAPI/create`, {
        method: 'POST',
        headers,
        body: JSON.stringify(review),
    });
    return handleResponse(response);
};

export const fetchProductsSelect = async (): Promise<formattedSelect[]> => {
    try {
        const response = await fetch(`${API_URL}/api/ProductAPI/productList`);
        const data: Product[] = await handleResponse(response);  // Using handleResponse here
        return data.map(product => ({
            label: product.Name,
            value: product.ProductId
        }));
    } catch (error) {
        console.error(`There was a problem with the fetch operation: ${error.message}`);
        throw error;
    }
};

export const updateReview = async (ReviewId: number,review: Review) => {
    const response = await fetch(`${API_URL}/api/ReviewAPI/update/${ReviewId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(review),
    });

    return handleResponse(response);
};

export const deleteReview = async (ReviewId: number) => {
    const response = await fetch(`${API_URL}/api/ReviewAPI/delete/${ReviewId}`, {
        method: 'DELETE',
    });
    return handleResponse(response);
};

