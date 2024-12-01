export interface Product {
    ProductId: number;
    Name: string;
    Energy: number;
    Fat: number;
    Carbohydrates: number;
    Protein: number;
    Description: string;
    ImageUrl: string;
    CategoryId: number;
    CreatedAt?: string;
    UserId: string;
}