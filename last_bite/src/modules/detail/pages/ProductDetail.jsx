import { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart, ChevronRight, ChevronLeft, Plus, Minus } from "lucide-react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../../context/context";
import RelatedProductCard from "../components/RelatedProductCard";
import { relatedProducts } from "../../../api/relatedProducts";
import { Navbar } from "../../../common/components/NavBar";
import CATButton from "../../../common/components/CATButton";
import Notification from "../../../common/components/Notification";


const ProductDetail = () => {
    const { id } = useParams()

    const { addToCart, filteredProducts } = useContext(AppContext)
    
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState("description");
    const [isInCart, setIsInCart] = useState(false);
    
    const productData = filteredProducts.find((p) => p.id === Number(id));
    const allImages = [productData.image, ...productData.images]
    if (!productData) {
        return <p>Producto no encontrado</p>;
      }

    const handlePrevImage = () => {
        setCurrentImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
    };

    const handleAddToCart = (productData, amount) => {
        setIsInCart(true);
        addToCart(productData, amount)
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
        <div className="container mx-auto p-4 pt-28 bg-lastbite-neutroCl min-h-screen font-sans">
            <Navbar></Navbar>
            {/* Notificación de carrito */}

            <Notification 
                isInCart={isInCart}
                content={
                    <>
                        <ShoppingCart size={18} className="mr-2" />
                        ¡Producto añadido al carrito!
                    </>
                }
            />

            {/* Navegación de migas de pan */}
            <div className="flex items-center text-sm text-gray-500 mb-6">
                <span className="hover:text-lastbite-accent cursor-pointer">Inicio</span>
                <ChevronRight size={14} className="mx-1" />
                <span className="hover:text-lastbite-accent cursor-pointer">Productos</span>
                <ChevronRight size={14} className="mx-1" />
                <span className="text-lastbite-accent font-medium">{productData.name}</span>
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
                    src={allImages[currentImageIndex]}
                    alt={productData.name}
                    className="absolute inset-0 w-full h-full object-cover blur-xl scale-110"
                    aria-hidden="true"
                    />
                    <img 
                    src={allImages[currentImageIndex]} 
                    alt={productData.name} 
                    className="relative w-full h-full object-contain" 
                    />
                    
                    <button 
                    onClick={handlePrevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-lastbite-secondaryCl hover:bg-lastbite-accent text-lastbite-neutroOs hover:text-lastbite-neutroCl rounded-full p-2 shadow-md"
                    >
                    <ChevronLeft size={20} />
                    </button>
                    
                    <button 
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-lastbite-secondaryCl hover:bg-lastbite-accent text-lastbite-neutroOs hover:text-lastbite-neutroCl rounded-full p-2 shadow-md"
                    >
                    <ChevronRight size={20} />
                    </button>
                </motion.div>

                {/* Miniaturas */}
                <div className="flex justify-center mt-4 space-x-2">
                    {allImages.slice(0, 5).map((img, i) => (
                    <motion.div 
                        key={i}
                        className={`h-16 w-16 rounded-md overflow-hidden cursor-pointer ${currentImageIndex === i ? 'ring-2 ring-lastbite-accent' : ''}`}
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
                        <h1 className="text-3xl font-bold text-lastbite-neutroOs">{productData.name}</h1>
                    </div>

                    {/* Precio */}
                    <div className="mt-4">
                        <span className="text-3xl font-bold text-lastbite-accent">${productData.price.toFixed(2)}</span>
                        <span className="ml-2 text-gray-500 text-sm">IVA incluido</span>
                    </div>

                    {/* Separador */}
                    <div className="my-6 border-t border-gray-200"></div>

                    {/* Selector de cantidad y botón */}
                    <div className="flex flex-col space-y-4">
                    <div className="flex items-center">
                        <span className="text-lastbite-neutroOs mr-4 font-medium">Cantidad:</span>
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
                            type="text" 
                            min="1" 
                            value={quantity} 
                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                            className="w-12 text-center py-2 border-x text-lastbite-neutroOs border-gray-300"
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
                    <CATButton 
                        className={"w-full bg-lastbite-accent hover:lastbite-accent/80 text-white flex items-center justify-center shadow-lg"} 
                        content={
                            <>
                                <ShoppingCart size={20} className="mr-2" />
                                Añadir al carrito
                            </>
                        }
                        onClick={() => handleAddToCart(productData, quantity)}
                    />

                    {/* Total */}
                    <div className="text-right mt-2 font-medium">
                        Total: <span className="text-lastbite-neutroOs font-bold">${(productData.price * quantity).toFixed(2)}</span>
                    </div>
                    </div>

                    {/* Separador */}
                    <div className="my-6 border-t border-gray-200"></div>

                    {/* Tabs de información */}
                    <div>
                        <div className="flex border-b border-gray-200">
                            <button 
                            className={`py-2 px-4 font-medium text-sm ${activeTab === "description" ? "text-lastbite-accent border-b-2 border-lastbite-accent" : "text-gray-500 hover:text-gray-700"}`}
                            onClick={() => setActiveTab("description")}
                            >
                            Descripción
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