import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { productsData } from '../../../api/products';
import { Navbar } from '../../../common/components/NavBar';

const Products  = () => {
  // Datos de ejemplo para los productos
 

  // Estados para filtros y búsqueda
  const [products, setProducts] = useState(productsData);
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isGridView, setIsGridView] = useState(true);
  const [sortBy, setSortBy] = useState("featured");

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
  }, [activeCategory, searchQuery, sortBy]);

  // Variantes para animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // Renderizado del componente
  return (
    <>
        <Navbar></Navbar>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-32 pb-24">
        <div className="container mx-auto px-4">
            {/* Encabezado */}
            <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Nuestros Productos</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
                Descubre nuestra colección exclusiva de productos diseñados para elevar tu experiencia.
            </p>
            </div>
            
            {/* Buscador y Controles */}
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
            
            {/* Contador de resultados */}
            <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
                Mostrando <span className="font-medium">{filteredProducts.length}</span> productos
            </p>
            </div>
            
            {/* Grid de productos */}
            <AnimatePresence>
            {filteredProducts.length === 0 ? (
                <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16"
                >
                <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No se encontraron productos</h3>
                <p className="text-gray-600">Intenta cambiar los filtros o el término de búsqueda.</p>
                <button 
                    onClick={() => {setActiveCategory("all"); setSearchQuery("");}}
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    Mostrar todos los productos
                </button>
                </motion.div>
            ) : (
                <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className={isGridView 
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    : "flex flex-col space-y-4"
                }
                >
                {filteredProducts.map(product => (
                    <motion.div
                    layout
                    variants={itemVariants}
                    key={product.id}
                    className={`group ${isGridView 
                        ? "bg-white rounded-2xl shadow-lg overflow-hidden transition-all hover:shadow-xl transform hover:-translate-y-1"
                        : "bg-white rounded-2xl shadow-lg overflow-hidden transition-all hover:shadow-xl flex"
                    }`}
                    >
                    {/* Imagen con overlay */}
                    <div className={`relative ${isGridView ? 'aspect-square' : 'w-1/3'} overflow-hidden bg-gray-100`}>
                        <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        
                        {/* Badges */}
                        <div className="absolute top-4 left-4 flex flex-col space-y-2">
                        {product.isNew && (
                            <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                            NUEVO
                            </span>
                        )}
                        {product.isBestseller && (
                            <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                            TOP VENTAS
                            </span>
                        )}
                        </div>
                        
                        {/* Quick actions */}
                        <div className="absolute -right-16 top-4 flex flex-col space-y-2 group-hover:right-4 transition-all duration-300">
                        <button className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors">
                            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                            </svg>
                        </button>
                        <button className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors">
                            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                            </svg>
                        </button>
                        </div>
                    </div>
                    
                    {/* Contenido */}
                    <div className={`p-5 ${!isGridView && 'w-2/3 flex flex-col justify-between'}`}>
                        <div>
                        <div className="flex justify-between items-start">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
                            {/* Rating */}
                            <div className="flex items-center">
                            <span className="text-amber-500 mr-1">★</span>
                            <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                            </div>
                        </div>
                        
                        <div className="mb-3">
                            <span className="text-gray-500 text-sm capitalize">{product.category}</span>
                        </div>
                        
                        {/* Colores disponibles */}
                        <div className="flex items-center mb-4">
                            <span className="text-gray-500 text-sm mr-2">Colores:</span>
                            <div className="flex space-x-1">
                            {product.colors.map((color, index) => (
                                <div 
                                key={index} 
                                className="w-5 h-5 rounded-full border border-gray-200" 
                                style={{ backgroundColor: color }}
                                />
                            ))}
                            </div>
                        </div>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {product.tags.map((tag, idx) => (
                            <span 
                                key={idx} 
                                className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-md"
                            >
                                {tag}
                            </span>
                            ))}
                        </div>
                        </div>
                        
                        <div className="mt-auto">
                        <div className="flex justify-between items-center">
                            <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                            
                            <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition flex items-center space-x-1"
                            >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                            </svg>
                            <span>Añadir</span>
                            </motion.button>
                        </div>
                        </div>
                    </div>
                    </motion.div>
                ))}
                </motion.div>
            )}
            </AnimatePresence>
        </div>
        </div>
    </>
  );
}

export { Products };
