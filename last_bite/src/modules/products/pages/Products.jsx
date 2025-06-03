import { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Navbar } from '../../../common/components/NavBar';
import { AppContext } from '../../../context/context';
import SearchBar from '../components/SearchBar';
import { containerVariants } from '../../../common/constants/animationVariants';
import ProductCard from '../components/productCard/ProductCard';

const Products  = () => {
  const { setActiveCategory, setSearchQuery, filteredProducts, isGridView} = useContext(AppContext)

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
                <SearchBar></SearchBar>
                
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
                        <ProductCard key={product.id} product={product}/>
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
