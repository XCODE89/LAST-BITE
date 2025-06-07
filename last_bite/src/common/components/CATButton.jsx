import { AnimatePresence, motion } from 'framer-motion';

const CATButton = ({ contentVariants, content, className, onClick}) => {
  return (
    <motion.button 
        className={`${className} font-bold py-3 px-8 rounded-sm transition duration-300`}
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        custom={5}
        whileHover={{ scale: 1.02, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        >
        {content}
        </motion.button>
  )
}

export default CATButton