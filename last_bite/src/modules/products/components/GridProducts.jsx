import { useContext } from 'react'
import { containerVariants } from '../../../common/constants/animationVariants';
import { AppContext } from '../../../context/context';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './productCard/ProductCard';
const GridProducts = () => {
    const { setActiveCategory, setSearchQuery, filteredProducts } = useContext(AppContext)

    return (
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
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product}/>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default GridProducts