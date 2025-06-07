import { motion } from 'framer-motion';

import { itemVariants } from '../../../../common/constants/animationVariants';
import OverlayImage from './OverlayImage';
import CardContent from './CardContent';

const ProductCard = ({product}) => {
    
    return (
        <motion.div
        layout
        variants={itemVariants}
        className="group bg-lastbite-secondaryCl rounded-md shadow-lg overflow-hidden transition-all hover:shadow-xl transform hover:-translate-y-1"
        >
            {/* Imagen con overlay */}
            <OverlayImage product={product}/>
            
            {/* Contenido */}
            <CardContent product={product}/>
        </motion.div>
    )
}

export default ProductCard