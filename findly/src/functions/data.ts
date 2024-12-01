import React from "react";
import { formattedSelect } from "types/FormattedSelect";
import { Category } from "types/category";
import { Allergy } from "types/allergy";

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