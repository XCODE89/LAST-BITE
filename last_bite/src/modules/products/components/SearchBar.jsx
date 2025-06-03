import React, { useContext, useEffect, useState } from 'react'
import { productsData } from '../../../api/products';
import { AppContext } from '../../../context/context';
import { motion, AnimatePresence } from 'framer-motion';

const SearchBar = () => {
    const { activeCategory, setActiveCategory, searchQuery, setSearchQuery, setFilteredProducts, isGridView, setIsGridView } = useContext(AppContext)
    const [sortBy, setSortBy] = useState("featured");

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
    };
    
    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    // Lista de categorías únicas
    const categories = ["all", ...new Set(productsData.map(product => product.category))];

      // Efecto para filtrar productos
    useEffect(() => {
    let result = [...productsData];
    
    // Filtrar por categoría
    if (activeCategory !== "all") {
        result = result.filter(product => product.category === activeCategory);
    }
    
    // Filtrar por búsqueda
    if (searchQuery) {
        result = result.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }
    
    // Ordenar productos
    switch(sortBy) {
        case "price-low":
            result.sort((a, b) => a.price - b.price);
            break;
        case "price-high":
            result.sort((a, b) => b.price - a.price);
            break;
        case "rating":
            result.sort((a, b) => b.rating - a.rating);
            break;
        case "newest":
            result = result.filter(product => product.isNew).concat(
                result.filter(product => !product.isNew)
            );
            break;
        case "bestseller":
            result = result.filter(product => product.isBestseller).concat(
                result.filter(product => !product.isBestseller)
            );
            break;
        default: // featured - mantener el orden original
            break;
    }
    
    setFilteredProducts(result);
    }, [activeCategory, searchQuery, sortBy, setFilteredProducts]);

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                {/* Buscador */}
                <div className="relative w-full md:w-1/3">
                <input
                    type="text"
                    placeholder="Buscar productos..."
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    value={searchQuery}
                    onChange={handleSearch}
                />
                <svg className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                </div>
                
                {/* Ordenar y Vista */}
                <div className="flex items-center space-x-4">
                <div className="flex items-center">
                    <label htmlFor="sort" className="text-gray-600 mr-2">Ordenar por:</label>
                    <select
                    id="sort"
                    className="rounded-lg border border-gray-200 py-2 px-3 focus:ring-2 focus:ring-blue-500"
                    value={sortBy}
                    onChange={handleSortChange}
                    >
                    <option value="featured">Destacados</option>
                    <option value="price-low">Precio (menor a mayor)</option>
                    <option value="price-high">Precio (mayor a menor)</option>
                    <option value="rating">Calificación</option>
                    <option value="newest">Más nuevos</option>
                    <option value="bestseller">Más vendidos</option>
                    </select>
                </div>
                
                {/* Toggles de vista */}
                <div className="flex space-x-2 border rounded-lg p-1">
                    <button
                    className={`p-2 rounded ${isGridView ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
                    onClick={() => setIsGridView(true)}
                    >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                    </svg>
                    </button>
                    <button
                    className={`p-2 rounded ${!isGridView ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
                    onClick={() => setIsGridView(false)}
                    >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                    </button>
                </div>
                </div>
            </div>

            {/* Filtros de categoría */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
                {categories.map(category => (
                <motion.button
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === category 
                        ? 'bg-blue-600 text-white shadow-md' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => handleCategoryChange(category)}
                >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                </motion.button>
                ))}
            </div>
        </div>
    )
    }

export default SearchBar