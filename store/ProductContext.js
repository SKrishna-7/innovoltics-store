'use client';
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create Product Context
export const ProductContext = createContext();

// Product Provider
export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [productById, setProductById] = useState(null);
    const [productLoading, setProductLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch all products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/products');
                setProducts(response.data); 
                console.log(response.data);

            } catch (error) {
                setError(error?.response?.data?.detail || "Error fetching products");
                console.log('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
        
    }, []);

    // Function to fetch product by ID
    const fetchProductById = async (id) => {
        setProductLoading(true);
        try {
            console.log(id);
            const response = await axios.get(`http://localhost:8000/api/products/${id}`);
            console.log("API Response:", response.data); // Debugging line
            setProductById(response.data);
            return response.data;
        } catch (error) {
            setError(error?.response?.data?.detail || "Error fetching product");
            console.error('Error fetching product:', error);
        } finally {
            setProductLoading(false);
        }
    };
    const deleteProduct = async (id) => {
        setLoading(true);
        try {
            await axios.delete(`http://localhost:8000/api/products/${id}`);
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <ProductContext.Provider value={{ products, loading, productById, productLoading, fetchProductById, error, deleteProduct  }}>
            {children}
        </ProductContext.Provider>
    );
};
