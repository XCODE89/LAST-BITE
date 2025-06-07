import { useContext } from 'react'
import { AppContext } from '../../../../context/context'
import { motion } from 'framer-motion';
import CATButton from '../../../../common/components/CATButton';

const CardContent = ({product}) => {
    const { addToCart } = useContext(AppContext)

    return (
    <div className="p-5">
        <div>
        <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-lastbite-neutroOs mb-1">{product.name}</h3>
        </div>
        
        <div className="mb-3">
            <span className="text-lastbite-neutroOs text-sm capitalize">{product.category}</span>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
            {product.tags.map((tag, idx) => (
            <span 
                key={idx} 
                className="text-xs px-2 py-1 bg-lastbite-neutroOs/60 text-lastbite-neutroCl rounded-md"
            >
                {tag}
            </span>
            ))}
        </div>
        </div>
        
        <div className="mt-auto">
        <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-lastbite-neutroOs">${product.price.toFixed(2)}</span>
            
            <CATButton
                content={
                    <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                        <span>Añadir</span>
                    </>
                }
                className="px-4 py-2 bg-lastbite-accent text-white rounded-xl hover:bg-lastbite-accent/80 transition flex items-center space-x-1"
                onClick={() => addToCart(product)}
            />
        </div>
        </div>
    </div>
    )
}

export default CardContent