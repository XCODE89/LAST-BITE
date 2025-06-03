import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Plus, Minus, Trash2, ChevronUp, ChevronDown } from 'lucide-react';

// Datos de ejemplo para los postres
const desserts = [
  { id: 1, name: 'Tarta de Chocolate', price: 24.99, image: '/api/placeholder/200/150', description: 'Deliciosa tarta con chocolate belga' },
  { id: 2, name: 'Cupcake de Fresa', price: 12.50, image: '/api/placeholder/200/150', description: 'Cupcake con crema de fresa natural' },
  { id: 3, name: 'Mousse de Limón', price: 18.75, image: '/api/placeholder/200/150', description: 'Suave mousse con un toque cítrico' },
  { id: 4, name: 'Cheesecake', price: 22.99, image: '/api/placeholder/200/150', description: 'Auténtico cheesecake neoyorquino' },
  { id: 5, name: 'Macarons Surtidos', price: 16.50, image: '/api/placeholder/200/150', description: 'Selección de macarons variados' },
];

const Cart = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [selectedDessert, setSelectedDessert] = useState(null);

  // Calcular el total del carrito
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Agregar producto al carrito
  const addToCart = (dessert) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === dessert.id);
      
      if (existingItem) {
        return prevItems.map(item => 
          item.id === dessert.id ? {...item, quantity: item.quantity + 1} : item
        );
      } else {
        return [...prevItems, {...dessert, quantity: 1}];
      }
    });
    
    // Mostrar brevemente el carrito si está cerrado
    if (!isCartOpen) {
      setIsCartOpen(true);
      setTimeout(() => {
        setIsCartOpen(false);
      }, 2000);
    }
  };
  
  // Eliminar producto del carrito
  const removeFromCart = (id) => {
    setCartItems(prevItems => 
      prevItems.filter(item => item.id !== id)
    );
  };
  
  // Modificar cantidad de un producto
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? {...item, quantity: newQuantity} : item
      )
    );
  };
  
  // Abrir detalle del postre seleccionado
  const openDessertDetail = (dessert) => {
    setSelectedDessert(dessert);
  };
  
  // Cerrar detalle del postre
  const closeDessertDetail = () => {
    setSelectedDessert(null);
  };

  return (
    <div className="bg-gradient-to-br from-pink-50 to-purple-50 min-h-screen p-6 font-sans">
      <header className="max-w-6xl mx-auto mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
          Delicias Dulces
        </h1>
        
        {/* Botón del carrito */}
        <motion.button 
          className="relative p-3 bg-white rounded-full shadow-md hover:shadow-lg"
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCartOpen(!isCartOpen)}
        >
          <ShoppingCart className="text-purple-600" />
          {cartItems.length > 0 && (
            <motion.div 
              className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              key={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            >
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            </motion.div>
          )}
        </motion.button>
      </header>
      
      <main className="max-w-6xl mx-auto">
        {/* Lista de postres */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {desserts.map((dessert) => (
            <motion.div 
              key={dessert.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
              whileHover={{ y: -5, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)' }}
              layoutId={`dessert-${dessert.id}`}
            >
              <motion.img 
                src={dessert.image} 
                alt={dessert.name}
                className="w-full h-48 object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                onClick={() => openDessertDetail(dessert)}
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-semibold text-gray-800">{dessert.name}</h2>
                  <span className="text-pink-600 font-bold">${dessert.price.toFixed(2)}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{dessert.description}</p>
                <motion.button
                  className="w-full py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-medium flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => addToCart(dessert)}
                >
                  <Plus size={16} />
                  Añadir al carrito
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Detalle del postre */}
        <AnimatePresence>
          {selectedDessert && (
            <motion.div 
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDessertDetail}
            >
              <motion.div 
                className="bg-white rounded-2xl overflow-hidden max-w-md w-full"
                layoutId={`dessert-${selectedDessert.id}`}
                onClick={e => e.stopPropagation()}
              >
                <motion.img 
                  src={selectedDessert.image} 
                  alt={selectedDessert.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">{selectedDessert.name}</h2>
                    <motion.button 
                      className="text-gray-500 hover:text-gray-800"
                      whileTap={{ scale: 0.9 }}
                      onClick={closeDessertDetail}
                    >
                      <X size={24} />
                    </motion.button>
                  </div>
                  <p className="text-gray-600 mb-4">{selectedDessert.description}</p>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-2xl font-bold text-pink-600">${selectedDessert.price.toFixed(2)}</span>
                    <motion.button
                      className="py-2 px-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-medium flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        addToCart(selectedDessert);
                        closeDessertDetail();
                      }}
                    >
                      <Plus size={16} />
                      Añadir al carrito
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
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
              <div className="p-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <ShoppingCart />
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
        
        {/* Notificación de producto añadido */}
        <AnimatePresence>
          {cartItems.length > 0 && !isCartOpen && (
            <motion.div
              className="fixed bottom-6 right-6 bg-white rounded-full shadow-xl p-3 cursor-pointer flex items-center"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setIsCartOpen(true)}
            >
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 w-12 h-12 rounded-full flex items-center justify-center text-white mr-3">
                <ShoppingCart />
              </div>
              <div className="mr-2">
                <p className="font-medium">{cartItems.reduce((sum, item) => sum + item.quantity, 0)} items</p>
                <p className="text-sm text-gray-600">Total: ${cartTotal.toFixed(2)}</p>
              </div>
              <ChevronUp className="text-gray-400" />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export { Cart };
