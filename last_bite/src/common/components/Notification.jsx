import { motion, AnimatePresence } from "framer-motion";

const Notification = ({ isInCart, content }) => {
  return (
    <AnimatePresence>
        {isInCart && (
        <motion.div 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-md shadow-lg z-50 flex items-center"
        >
            {content}
        </motion.div>
        )}
    </AnimatePresence>
  )
}

export default Notification