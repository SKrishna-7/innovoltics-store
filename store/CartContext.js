import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { getCookie, setCookie } from "@/utils/cookieUtils";

// Create Cart Context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [guestId, setGuestId] = useState(null);
    const [userId, setUserId] = useState(null); // Set when user logs in
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchCart = async () => {
            setLoading(true);
            try {
                let storedGuestId = getCookie("guest_id"); // Get guest ID from cookies
                let storedUserId = localStorage.getItem("user_id"); // Get user ID from localStorage

                // If no guest ID exists, create a new one
                if (!storedGuestId) {
                    const newGuestId = Math.floor(100000 + Math.random() * 900000).toString();
                    setCookie("guest_id", newGuestId, 30); // Save for 30 days
                    setGuestId(newGuestId);
                    
                } else {
                    setGuestId(storedGuestId);
                    
                }

                setUserId(storedUserId);

                // Fetch cart from API

                const response = await axios.get(`http://localhost:8000/api/cart`, {
                    params: { user_id: storedUserId, guest_id: storedGuestId }
                });

                if (response.data.items) {
                    setCart(response.data.items);
                }
            } catch (error) {
                console.log("Error fetching cart:", error);
                setError(error?.response?.data?.detail || "Error fetching cart");
            }
            finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, []);

    const addToCart = async (item) => {
        console.log(item)
        setLoading(true);
        try {
            console.log(guestId)
            const response = await axios.post(`http://localhost:8000/api/cart/add`, 
                { item }, // Fixed issue: Send item inside an object
                { params: { user_id: userId, guest_id: guestId } }
            );

            if (response.data.message === "Item added to cart") {
                setCart((prevCart) => [...prevCart, { ...item, product_id: response.data.product_id }]);
                fetchCart();
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            setError(error?.response?.data?.detail || "Error adding to cart");
        }
        finally {
            setLoading(false);
        }
    };

    const updateQuantity = (productId, change) => {
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.product_id === productId
              ? { ...item, quantity: Math.max(1, (item.quantity || 1) + change) } // Ensure quantity never goes below 1
              : item
          )
        );
      };
      

    const removeFromCart = async (cartItemId) => {
        setLoading(true);
        try {
            await axios.delete(`http://localhost:8000/api/cart/remove/${cartItemId}`, {
                params: { user_id: userId, guest_id: guestId }
            });

            setCart((prevCart) => prevCart.filter((item) => item.product_id !== cartItemId));
        } catch (error) {
            console.error("Error removing item from cart:", error);
            setError(error?.response?.data?.detail || "Error removing item from cart");
        }
        finally{
            setLoading(false);
        }
    };

    const clearCart = async () => {
        try {
            await axios.post(`http://localhost:8000/api/cart/clear`, {
                user_id: userId || null,
                guest_id: guestId || null
            });
            setCart([]);
        } catch (error) {
            console.error("Error clearing cart:", error);
            setError(error?.response?.data?.detail || "Error clearing cart");
        }
    };

    const setUserIdAndMergeCart = async (newUserId) => {
        try {
            const response = await axios.post(`http://localhost:8000/api/cart/merge`, {
                guest_id: guestId,
                user_id: newUserId
            });

            if (response.data.message === "Cart merged") {
                setCart(response.data.items);
                setUserId(newUserId);
                localStorage.setItem("user_id", newUserId);
            }
        } catch (error) {
            console.error("Error merging guest cart:", error);
            setError(error?.response?.data?.detail || "Error merging guest cart");
        }
    };

    return (
        <CartContext.Provider value={{ 
            cart, addToCart, removeFromCart, updateQuantity, clearCart, setUserIdAndMergeCart, loading, error, isLoggedIn
        }}>
            {children}
        </CartContext.Provider>
    );
};
