import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import { Product } from 'types/product';
import API_URL from '../apiConfig';
import { formattedSelect } from 'types/FormattedSelect';
import { fetchAllergies, fetchCategories } from '../functions/data';

interface ProductFormProps {
    onProductChanged: (newProduct: Product) => void;
    ProductId?: number;
}

const ProductForm: React.FC<ProductFormProps> = ({onProductChanged, ProductId}) => {
    const [Name, setName] = useState<string>('');
    const [Energy, setEnergy] = useState<number>(0);
    const [Fat, setFat] = useState<number>(0);
    const [Protein, setProtein] = useState<number>(0);
    const [Carbohydrates, setCarbohydrates] = useState<number>(0);
    const [Description, setDescription] = useState<string>('');
    const [ImageUrl, setImageUrl] = useState<string>('');
    const [CategoryId, setCategoryId] = useState<number>();
    const [categories, setCategories] = useState<formattedSelect[]>([]);
    const [allergies, setAllergies] = useState<formattedSelect[]>([]);
    const [selectedAllergyOptions, setSelectedAllergyOptions] = useState<formattedSelect[]>([]);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        loadCategories();
        loadAllergies();
    }, []);


    const onCancel = () => {
        navigate(-1);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const product: Product = {ProductId, Name, Energy, Fat, Protein, Carbohydrates, Description, ImageUrl, CategoryId};
        onProductChanged(product);
    };

    const loadCategories = async () => {
        setError(null);

        try {
            const categoriesData = await fetchCategories(API_URL);
            setCategories(categoriesData);
        } catch (error) {
            console.error(`There was a problem with the fetch operation: ${error.message}`);
            setError('Failed to fetch products')
        }
    };

    const loadAllergies= async () => {
        setError(null);

        try {
            const allergyData = await fetchAllergies(API_URL);
            setAllergies(allergyData);
        } catch (error) {
            console.error(`There was a problem with the fetch operation: ${error.message}`);
            setError('Failed to fetch allergies')
        }
    };

    const handleCategoryChange = (selectedCategory: formattedSelect | null) => {
        setCategoryId(selectedCategory ? selectedCategory.value : undefined);
    }    

    const handleAllergyChange = (selectedAllergyOptions: formattedSelect[] | null) => {
        setSelectedAllergyOptions(selectedAllergyOptions || []);
    }    

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId='formProductName'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter product name'
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    pattern='[0-9a-zA-ZæøåÆØÅ. \-]{2,20}'
                    title='The name must be numbers or letters and between 2 and 20 characters'
                />
            </Form.Group>
            <Form.Group controlId='formProductEnergy'>
                <Form.Label>Energy</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter Energy'
                    value={Energy}
                    onChange={(e) => setEnergy(Number(e.target.value))}
                    required
                />
            </Form.Group>
            <Form.Group controlId='formProductFat'>
                <Form.Label>Fat</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter Fat content'
                    value={Fat}
                    onChange={(e) => setFat(Number(e.target.value))}
                    required
                />
            </Form.Group>
            <Form.Group controlId='formProductProtein'>
                <Form.Label>Protein</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter Protein content'
                    value={Protein}
                    onChange={(e) => setProtein(Number(e.target.value))}
                    required
                />
            </Form.Group>
            <Form.Group controlId='formProducCarbohydrates'>
                <Form.Label>Carbohydrates</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter product Carbohydrates'
                    value={Carbohydrates}
                    onChange={(e) => setCarbohydrates(Number(e.target.value))}
                    required
                />
            </Form.Group>
            <Form.Group controlId='formProductDescription'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as='textarea'
                    rows={3}
                    placeholder='Enter product name'
                    value={Description}
                    onChange={(e) => setDescription(e.target.value)}
                    pattern='[0-9a-zA-ZæøåÆØÅ. \-]{2,500}'
                    title='The name must be numbers or letters and between 2 and 500 characters'
                />
            </Form.Group>
            <Form.Group controlId='formProductImage'>
                <Form.Label>upload image</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter product image Url'
                    value={ImageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId='formProductCategory'>
                <Form.Label>Category</Form.Label>
                <Select 
                    options={categories}
                    onChange={handleCategoryChange}
                    value={categories.find(category => category.value === CategoryId)}
                    placeholder='select a category'
                    required
                />
                <Form.Control
                    type='hidden'
                    required
                />
            </Form.Group>
            <Form.Group controlId='formProductAllergy'>
                <Form.Label>Category</Form.Label>
                <Select 
                    options={allergies}
                    onChange={handleAllergyChange}
                    value={selectedAllergyOptions}
                    placeholder='select allergies!'
                    isMulti
                    required
                />
                <Form.Control
                    type='hidden'
                    value={selectedAllergyOptions.map(allergy => allergy.value.toString())}
                    required
                />
            </Form.Group>
            {error && <p style={{ color : 'red'}}>{error}</p>}
            
            <Button variant='primary' type='submit'>Create Product</Button>
            <Button variant='secondary' onClick={onCancel} className='ms-2'>Cancel</Button>
        </Form>
    );

};

export default ProductForm;