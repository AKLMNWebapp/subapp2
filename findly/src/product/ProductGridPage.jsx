import React from "react";
import { Table } from 'react-bootstrap';

const ProductGridPage = () => {
    console.log('ProductPage rendered');
    const products = [];

    return (
       <div>
         <div text-center mb-4>
            <h1>Products</h1>
            <p text-muted>
                This page showcases all the available products in our inventory. Here, you can explore a wide range of products from our food producer partners. 
                Each product includes detailed information about nutritional values, allergens, and other essential details, which you can find in the "Details" section. 
                As a user, you can also leave a review for a specific product and add it to a collection of your choice.
            </p>
        </div>

        <div container>
            <div row>
                {products.map(product =>(
                    <div key={product.productId} col-md-4 mb-4>
                        <div card>
                            <img src={product.ImageUrl} alt={product.Name} card-img-top />
                            <div car-body>
                                <h5 card-title>{product.Name}</h5>
                                <p card-text>
                                    <h6> Nutritional value pr 100g</h6>
                                    <strong>Energy: </strong>{product.Energy}<br/>
                                    <strong>Fat: </strong>{product.Fat}<br/>
                                    <strong>Protein: </strong>{product.Protein}<br/>
                                    <strong>Carbohydrates: </strong>{product.Carbohydrated}<br/>
                                    <strong>Category: </strong>{product.Category}
                                </p>
                            </div>
                        </div>
                    </div>   
                ))}
            </div>
        </div>
       </div>

    );
};

export default ProductGridPage;
