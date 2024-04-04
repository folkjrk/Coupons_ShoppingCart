import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelectedProducts } from '../../SelectedProductsContext';
import './Product.css';
import { toast } from 'react-toastify';

function Product() {
    const [products, setProducts] = useState([]);
    const { selectedProducts, setSelectedProducts } = useSelectedProducts();

    const getProduct = async () => {
        try {
            const response = await axios.get('http://localhost:3004/products/');
            setProducts(response.data);
        } catch (err) {
            console.log(err);
            toast.error('Error fetching products.', { className: 'toast-message' });
        }
    };

    const addProduct = (productId, productName, productCategories, PriceProduct) => {
        try {
            const productToAdd = {
                id: productId,
                productName: productName,
                productCategories: productCategories,
                productQuantity: 1,
                actualPrice: PriceProduct,
                price: PriceProduct
            };
    
            setSelectedProducts(prevSelectedProducts => {
                const updatedProducts = Array.isArray(prevSelectedProducts) ? [...prevSelectedProducts] : [];
    
                const existingProduct = updatedProducts.find(item => item.id === productId);
    
                if (existingProduct) {
                    updatedProducts.forEach(item => {
                        if (item.id === productId) {
                            item.productQuantity += 1;
                            item.price = item.productQuantity * PriceProduct;
                        }
                    });
    
                    return updatedProducts;
                } else {
                    updatedProducts.push(productToAdd);
                    return updatedProducts;
                }
            });
    
            toast.success(`${productName} added to cart successfully`, { className: "toast-message" });
        } catch (err) {
            console.log(err);
            toast.error('Error adding product to cart.', { className: 'toast-message' });
        }
    };
    
    useEffect(() => {
        getProduct();
    }, []);

    useEffect(() => {
        console.log('Selected Products:', selectedProducts);
    }, [selectedProducts]);

    return (
        <div>
            <div className='card-container'>
                {products.map((product, index) => (
                    <div className='card' key={index}>
                        <img className='card-image' src={product.image} alt='product' />
                        <div className='topic-card'>{product.name}</div>
                        <div className='description'>{product.description}</div>
                        <div className='price'>Price: {product.price} THB</div>
                        <button className='button' onClick={() => addProduct(product.id, product.name, product.categories, product.price)}>
                            Add to cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Product;
