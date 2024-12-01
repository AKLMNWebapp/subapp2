import { formattedSelect } from "types/FormattedSelect";
import { Category } from "types/category";
import { Allergy } from "types/allergy";
import { Product } from "types/product";
import { Review } from "types/Review";


export const fetchProducts = async (apiUrl:string): Promise<Product[]> => {
    try {
        const response = await fetch(`${apiUrl}/api/ProductAPI/productList`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data: Product[] = await response.json();
        return data;
    } catch (error) {
        console.error(`There was a problem with the fetch operation: ${error.message}`);
        throw error;
    }
};

export const fetchReviews = async (apiUrl:string): Promise<Review[]> => {
    try {
        const response = await fetch(`${apiUrl}/api/ReviewAPI/reviewlist`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data: Review[] = await response.json();
        return data;
    } catch (error) {
        console.error(`There was a problem with the fetch operation: ${error.message}`);
        throw error;
    }
};

export const fetchProductsSelect = async (apiUrl:string): Promise<formattedSelect[]> => {
    try {
        const response = await fetch(`${apiUrl}/api/ProductAPI/productList`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data: Product[] = await response.json();
        return data.map(product => ({
            label: product.Name,
            value: product.ProductId
        }));
    } catch (error) {
        console.error(`There was a problem with the fetch operation: ${error.message}`);
        throw error;
    }
}

export const fetchCategories = async (apiUrl:string): Promise<formattedSelect[]> => {
    try {
        const response = await fetch(`${apiUrl}/api/CategoryAPI/categorylist`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data: Category[] = await response.json();
        return data.map(category => ({
            label: category.Name,
            value: category.CategoryId
        }));
    } catch (error) {
        console.error(`There was a problem with the fetch operation: ${error.message}`);
        throw error;
    }
};

export const fetchAllergies = async (apiUrl:string): Promise<formattedSelect[]> => {
    try {
        const response = await fetch(`${apiUrl}/api/AllergyAPI/allergylist`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data: Allergy[] = await response.json();
        return data.map(allergy => ({
            label: allergy.Name,
            value: allergy.AllergyCode
        }));
    } catch (error) {
        console.error(`There was a problem with the fetch operation: ${error.message}`);
        throw error;
    }
};