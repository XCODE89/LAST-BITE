import { motion } from 'framer-motion';
import { itemVariants } from '../../../../common/constants/animationVariants';
import { useContext } from 'react';
import { AppContext } from '../../../../context/context';
import OverlayImage from './OverlayImage';
import CardContent from './CardContent';

const ProductCard = ({product}) => {
    const { isGridView} = useContext(AppContext)
    
    return (
        <motion.div
        layout
        variants={itemVariants}
        className={`group ${isGridView 
            ? "bg-white rounded-2xl shadow-lg overflow-hidden transition-all hover:shadow-xl transform hover:-translate-y-1"
            : "bg-white rounded-2xl shadow-lg overflow-hidden transition-all hover:shadow-xl flex"
        }`}
        >
            {/* Imagen con overlay */}
            <OverlayImage product={product}/>
            
            {/* Contenido */}
            <CardContent product={product}/>
        </motion.div>
    )
}

export default ProductCard