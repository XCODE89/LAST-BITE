import React, { useContext } from 'react'
import { AppContext } from '../../../../context/context'
import { motion } from 'framer-motion';

const CardContent = ({product}) => {
    const { addToCart, isGridView} = useContext(AppContext)

    return (
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
            onClick={() => addToCart(product)}
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
    )
}

export default CardContent