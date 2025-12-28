import { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = localStorage.getItem('zaheen-cart');
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (error) {
                setCart([]);
            }
        }
    }, []);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existing = prevCart.find(item => item._id === product._id);
            let updatedCart;
            if (existing) {
                updatedCart = prevCart.map(item =>
                    item._id === product._id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
                );
            } else {
                updatedCart = [...prevCart, { ...product, quantity: 1 }];
            }
            localStorage.setItem('zaheen-cart', JSON.stringify(updatedCart));
            return updatedCart;
        });
        alert("Product added to cart!");
    };

    const removeFromCart = (id) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.filter(item => item._id !== id);
            localStorage.setItem('zaheen-cart', JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('zaheen-cart');
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};


export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}