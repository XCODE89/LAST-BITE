import { createContext, useState } from "react";
import { productsData } from "../api/products";

export const AppContext = createContext({})

const ContextProvider = ({children}) => {

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (dessert, amount=1) => {
        setCartItems(prevItems => {
        const existingItem = prevItems.find(item => item.id === dessert.id);
        
        if (existingItem) {
            return prevItems.map(item => 
            item.id === dessert.id ? {...item, quantity: item.quantity + amount} : item
            );
        } else {
            return [...prevItems, {...dessert, quantity: amount}];
        }
        });
        
        // Mostrar brevemente el carrito si está cerrado
        if (!isCartOpen) {
        setIsCartOpen(true);
        setTimeout(() => {
            setIsCartOpen(false);
        }, 2000);
        }
    };

    // Eliminar producto del carrito
    const removeFromCart = (id) => {
        console.log("removiendo ", id)
        setCartItems(prevItems => 
        prevItems.filter(item => item.id !== id)
        );
    };
  
    // Modificar cantidad de un producto
    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) {
        removeFromCart(id);
        return;
        }
        
        setCartItems(prevItems => 
        prevItems.map(item => 
            item.id === id ? {...item, quantity: newQuantity} : item
        )
        );
    };

    const [activeCategory, setActiveCategory] = useState("Todos");
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredProducts, setFilteredProducts] = useState(productsData);

    return (
        <AppContext.Provider value={{ isCartOpen, setIsCartOpen, cartItems, setCartItems, addToCart, updateQuantity, removeFromCart, activeCategory, setActiveCategory, searchQuery, setSearchQuery, filteredProducts, setFilteredProducts }}>
            {children}
        </AppContext.Provider>
    )
}

export { ContextProvider }