import { useContext, useEffect } from 'react'
import { productsData } from '../../../api/products';
import { AppContext } from '../../../context/context';
import { motion } from 'framer-motion';
import ProductCategoriesCarousel from './productCard/ProductCategoriesCarousel';

const SearchBar = () => {
    const { activeCategory, setActiveCategory, searchQuery, setSearchQuery, setFilteredProducts} = useContext(AppContext)

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
    };

    // Lista de categorías únicas
    // const categories = ["all", ...new Set(productsData.map(product => product.category))];

      // Efecto para filtrar productos
    useEffect(() => {
    let result = [...productsData];
    
    // Filtrar por categoría
    if (activeCategory !== "Todos") {
        result = result.filter(product => product.category === activeCategory);
    }
    
    // Filtrar por búsqueda
    if (searchQuery) {
        result = result.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }
    
    setFilteredProducts(result);
    }, [activeCategory, searchQuery, setFilteredProducts]);

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                {/* Buscador */}
                <div className="relative w-full">
                <input
                    type="text"
                    placeholder="Buscar productos..."
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-lastbite-neutroOs focus:border-none transition text-lastbite-neutroOs"
                    value={searchQuery}
                    onChange={handleSearch}
                />
                <svg className="w-6 h-6 text-lastbite-neutroOs/50 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                </div>
            </div>

            {/* Filtros de categoría */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
                
                <ProductCategoriesCarousel handleCategoryChange={handleCategoryChange} activeCategory={activeCategory}/>
            </div>


            {/* comenzamos */}
        </div>
    )
    }

export default SearchBar