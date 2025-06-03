import { AnimatePresence, motion } from 'framer-motion';

const CATButton = ({color, hover, contentVariants, content, text}) => {
  return (
    <motion.button 
        className={`${color} ${hover} ${text} font-bold py-3 px-8 rounded-lg transition duration-300`}
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        custom={5}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        >
        {content}
        </motion.button>
  )
}

export default CATButton