import { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart, ChevronRight, ChevronLeft, Plus, Minus, Star } from "lucide-react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../../context/context";
import RelatedProductCard from "../components/RelatedProductCard";
import { relatedProducts } from "../../../api/relatedProducts";
import { Navbar } from "../../../common/components/NavBar";


const ProductDetail = () => {
    const { id } = useParams()

    const { addToCart, filteredProducts } = useContext(AppContext)
    
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isFavorite, setIsFavorite] = useState(false);
    const [activeTab, setActiveTab] = useState("description");
    const [isInCart, setIsInCart] = useState(false);
    
    const productData = filteredProducts.find((p) => p.id === Number(id));
    if (!productData) {
        return <p>Producto no encontrado</p>;
      }

    const handlePrevImage = () => {
        setCurrentImageIndex((prev) => (prev === 0 ? productData.images.length - 1 : prev - 1));
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prev) => (prev === productData.images.length - 1 ? 0 : prev + 1));
    };

    const handleAddToCart = (productData) => {
        console.log(productData)
        setIsInCart(true);
        addToCart(productData)
        // Reset cart notification after 3 seconds
        setTimeout(() => {
            setIsInCart(false);
            }, 3000);
    };

    const increaseQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
        setQuantity(prev => prev - 1);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4 pt-28 bg-gray-50 min-h-screen font-sans">
            <Navbar></Navbar>
        {/* Notificación de carrito */}
        <AnimatePresence>
            {isInCart && (
            <motion.div 
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-md shadow-lg z-50 flex items-center"
            >
                <ShoppingCart size={18} className="mr-2" />
                ¡Producto añadido al carrito!
            </motion.div>
            )}
        </AnimatePresence>

        {/* Navegación de migas de pan */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
            <span className="hover:text-pink-600 cursor-pointer">Inicio</span>
            <ChevronRight size={14} className="mx-1" />
            <span className="hover:text-pink-600 cursor-pointer">Postres</span>
            <ChevronRight size={14} className="mx-1" />
            <span className="text-pink-600 font-medium">{productData.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Sección de imágenes */}
            <div className="relative">
            <motion.div 
                className="relative rounded-xl overflow-hidden bg-white shadow-lg h-96"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <img 
                src={currentImageIndex === 0 ? productData.image : productData.images[currentImageIndex]} 
                alt={productData.name} 
                className="w-full h-full object-contain" 
                />
                
                <button 
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
                >
                <ChevronLeft size={20} />
                </button>
                
                <button 
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
                >
                <ChevronRight size={20} />
                </button>
            </motion.div>

            {/* Miniaturas */}
            <div className="flex justify-center mt-4 space-x-2">
                {[productData.image, ...productData.images].slice(0, 5).map((img, i) => (
                <motion.div 
                    key={i}
                    className={`h-16 w-16 rounded-md overflow-hidden cursor-pointer ${currentImageIndex === i ? 'ring-2 ring-pink-500' : ''}`}
                    onClick={() => setCurrentImageIndex(i)}
                    whileHover={{ scale: 1.05 }}
                >
                    <img src={img} alt={`Miniatura ${i+1}`} className="w-full h-full object-cover" />
                </motion.div>
                ))}
            </div>
            </div>

            {/* Sección de información */}
            <div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <div className="flex justify-between items-start">
                <h1 className="text-3xl font-bold text-gray-800">{productData.name}</h1>
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`p-2 rounded-full ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}
                >
                    <Heart size={24} fill={isFavorite ? "#ef4444" : "none"} />
                </motion.button>
                </div>

                {/* Puntuación */}
                <div className="flex items-center mt-2">
                <div className="flex">
                    {[...Array(5)].map((_, i) => (
                    <Star 
                        key={i} 
                        size={16} 
                        fill={i < Math.floor(productData.rating) ? "#f59e0b" : "none"}
                        stroke={i < Math.floor(productData.rating) ? "#f59e0b" : "#d1d5db"}
                    />
                    ))}
                </div>
                <span className="text-yellow-500 font-medium ml-2">{productData.rating}</span>
                <span className="text-gray-500 ml-2">({productData.numReviews} reseñas)</span>
                </div>

                {/* Precio */}
                <div className="mt-4">
                <span className="text-3xl font-bold text-pink-600">${productData.price.toFixed(2)}</span>
                <span className="ml-2 text-gray-500 text-sm">Impuestos incluidos</span>
                </div>

                {/* Separador */}
                <div className="my-6 border-t border-gray-200"></div>

                {/* Selector de cantidad y botón */}
                <div className="flex flex-col space-y-4">
                <div className="flex items-center">
                    <span className="text-gray-700 mr-4 font-medium">Cantidad:</span>
                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <motion.button 
                        className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700"
                        onClick={decreaseQuantity}
                        whileTap={{ scale: 0.95 }}
                        disabled={quantity <= 1}
                    >
                        <Minus size={18} />
                    </motion.button>
                    <input 
                        type="number" 
                        min="1" 
                        value={quantity} 
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-12 text-center py-2 border-x border-gray-300"
                    />
                    <motion.button 
                        className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700"
                        onClick={increaseQuantity}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Plus size={18} />
                    </motion.button>
                    </div>
                </div>

                {/* Botón de compra */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center shadow-lg"
                    onClick={() => handleAddToCart(productData)}
                >
                    <ShoppingCart size={20} className="mr-2" />
                    Añadir al carrito
                </motion.button>

                {/* Total */}
                <div className="text-right mt-2 font-medium">
                    Total: <span className="text-pink-600 font-bold">${(productData.price * quantity).toFixed(2)}</span>
                </div>
                </div>

                {/* Separador */}
                <div className="my-6 border-t border-gray-200"></div>

                {/* Tabs de información */}
                <div>
                <div className="flex border-b border-gray-200">
                    <button 
                    className={`py-2 px-4 font-medium text-sm ${activeTab === "description" ? "text-pink-600 border-b-2 border-pink-600" : "text-gray-500 hover:text-gray-700"}`}
                    onClick={() => setActiveTab("description")}
                    >
                    Descripción
                    </button>
                    <button 
                    className={`py-2 px-4 font-medium text-sm ${activeTab === "ingredients" ? "text-pink-600 border-b-2 border-pink-600" : "text-gray-500 hover:text-gray-700"}`}
                    onClick={() => setActiveTab("ingredients")}
                    >
                    Ingredientes
                    </button>
                    <button 
                    className={`py-2 px-4 font-medium text-sm ${activeTab === "info" ? "text-pink-600 border-b-2 border-pink-600" : "text-gray-500 hover:text-gray-700"}`}
                    onClick={() => setActiveTab("info")}
                    >
                    Info. Nutricional
                    </button>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div 
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="py-4"
                    >
                    {activeTab === "description" && (
                        <p className="text-gray-600 leading-relaxed">{productData.description}</p>
                    )}
                    {activeTab === "ingredients" && (
                        <div>
                        <ul className="list-disc pl-5 text-gray-600 space-y-1">
                            {productData.ingredients.map((ingredient, i) => (
                            <li key={i}>{ingredient}</li>
                            ))}
                        </ul>
                        <div className="mt-4">
                            <h4 className="font-medium text-gray-700">Alérgenos:</h4>
                            <div className="flex flex-wrap gap-2 mt-2">
                            {productData.allergens.map((allergen, i) => (
                                <span key={i} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                                {allergen}
                                </span>
                            ))}
                            </div>
                        </div>
                        </div>
                    )}
                    {activeTab === "info" && (
                        <div className="text-gray-600">
                        <p className="mb-2"><span className="font-medium">Calorías:</span> {productData.calories}</p>
                        <p><span className="font-medium">Conservación:</span> Mantener refrigerado. Consumir preferentemente en 48h.</p>
                        </div>
                    )}
                    </motion.div>
                </AnimatePresence>
                </div>
            </motion.div>
            </div>
        </div>

        {/* Productos relacionados */}
        <motion.div 
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
        >
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Productos relacionados</h2>
            <div className="flex overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            {relatedProducts.map(product => (
                <RelatedProductCard key={product.id} {...product} />
            ))}
            </div>
        </motion.div>
        </div>
    );
}

export { ProductDetail }