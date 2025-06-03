import { createContext, useState } from "react";
import { productsData } from "../api/products";

export const AppContext = createContext({})

const ContextProvider = ({children}) => {

    const [cartItems, setCartItems] = useState([]);

    const addToCart = (dessert) => {
        setCartItems(prevItems => {
        const existingItem = prevItems.find(item => item.id === dessert.id);
        
        if (existingItem) {
            return prevItems.map(item => 
            item.id === dessert.id ? {...item, quantity: item.quantity + 1} : item
            );
        } else {
            return [...prevItems, {...dessert, quantity: 1}];
        }
        });
        
        // Mostrar brevemente el carrito si está cerrado
        // if (!isCartOpen) {
        // setIsCartOpen(true);
        // setTimeout(() => {
        //     setIsCartOpen(false);
        // }, 2000);
        // }
    };

    const [activeCategory, setActiveCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredProducts, setFilteredProducts] = useState(productsData);
    const [isGridView, setIsGridView] = useState(true);

    return (
        <AppContext.Provider value={{ cartItems, addToCart, activeCategory, setActiveCategory, searchQuery, setSearchQuery, filteredProducts, setFilteredProducts, isGridView, setIsGridView }}>
            {children}
        </AppContext.Provider>
    )
}

export { ContextProvider }