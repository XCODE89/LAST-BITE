import { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Plus, Minus, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import { AppContext } from '../../context/context';


const Cart = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems } = useContext(AppContext)

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div>
        {/* Botón del carrito */}
        <motion.button 
        className="relative p-3 bg-lastbite-crema rounded-full shadow-md hover:shadow-lg"
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsCartOpen(!isCartOpen)}
        >
        <ShoppingCart className="text-lastbite-azul" />
        {cartItems.length > 0 && (
            <motion.div 
            className="absolute -top-2 -right-2 bg-lastbite-azul text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            key={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            >
            {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            </motion.div>
        )}
        </motion.button>

        {/* Carrito de compras */}
        <AnimatePresence>
            {isCartOpen && (
            <motion.div 
                className="fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-xl z-40 flex flex-col"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                <div className="p-6 bg-lastbite-azul text-white flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    {/* <ShoppingCart /> */}
                    Tu Carrito
                </h2>
                <motion.button 
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsCartOpen(false)}
                >
                    <X size={24} />
                </motion.button>
                </div>
                
                {cartItems.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-gray-500">
                    <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    >
                    <ShoppingCart size={64} className="mb-4 opacity-30" />
                    <p className="text-center">Tu carrito está vacío</p>
                    <p className="text-center text-sm mt-2">¡Agrega algunos dulces deliciosos!</p>
                    </motion.div>
                </div>
                ) : (
                <>
                    <div className="flex-1 overflow-y-auto p-4">
                    <AnimatePresence>
                        {cartItems.map(item => (
                        <motion.div 
                            key={item.id}
                            className="bg-white rounded-lg shadow-sm p-4 mb-3 border border-gray-100 flex items-center gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            layout
                        >
                            <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                            <h3 className="font-medium text-gray-800">{item.name}</h3>
                            <p className="text-pink-600 font-bold">${item.price.toFixed(2)}</p>
                            </div>
                            <div className="flex flex-col items-center">
                            <motion.button 
                                className="text-purple-600 p-1"
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                                <ChevronUp size={18} />
                            </motion.button>
                            <span className="font-bold text-gray-800 mx-2">{item.quantity}</span>
                            <motion.button 
                                className="text-purple-600 p-1"
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                                <ChevronDown size={18} />
                            </motion.button>
                            </div>
                            <motion.button 
                            className="text-red-500 p-2"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeFromCart(item.id)}
                            >
                            <Trash2 size={18} />
                            </motion.button>
                        </motion.div>
                        ))}
                    </AnimatePresence>
                    </div>
                    
                    <div className="p-6 border-t border-gray-200">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-gray-600 font-medium">Total:</span>
                        <motion.span 
                        className="text-2xl font-bold text-gray-800"
                        key={cartTotal}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500 }}
                        >
                        ${cartTotal.toFixed(2)}
                        </motion.span>
                    </div>
                    <motion.button
                        className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-bold shadow-lg"
                        whileHover={{ scale: 1.02, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Proceder al Pago
                    </motion.button>
                    </div>
                </>
                )}
            </motion.div>
            )}
        </AnimatePresence>
    </div>
  );
}

export { Cart };
