
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { featuredProducts } from '../../../api/featuredProducts';

export const FeaturedProducts = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <section id="products" className="section bg-lastbite-black py-12" ref={ref}>
        <div className="container mx-auto px-4">
            
            <motion.div 
                className="text-center mb-16"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.7 }}
                >
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-red font-playfair">
                    Nuestros <span className="text-lastbite-pink">Productos Destacados</span>
                </h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                    Descubre nuestra selección de postres gourmet, donde la tradición francesa se encuentra con la innovación culinaria para crear experiencias únicas para tu paladar.
                </p>
            </motion.div>
        
        {/* Contenedor principal del carrusel */}
        <div className="relative w-full overflow-hidden">
            {/* Primera fila - Movimiento hacia la derecha */}
            <motion.div
            className="flex py-4"
            animate={{ x: [0, -1920] }}
            transition={{
                x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
                },
            }}
            >
            {/* Duplicamos los productos para crear el efecto infinito */}
            {[...featuredProducts, ...featuredProducts].map((featuredProduct, index) => (
                <div
                key={`${featuredProduct.id}-${index}`}
                className="flex-shrink-0 w-64 mx-3 rounded-lg overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                <div className="w-full h-48 overflow-hidden">
                    <img
                    src={featuredProduct.image}
                    alt={featuredProduct.name}
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                    />
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">{featuredProduct.name}</h3>
                </div>
                </div>
            ))}
            </motion.div>
            
            {/* Segunda fila - Movimiento hacia la izquierda (dirección opuesta) */}
            <motion.div
            className="flex py-4"
            animate={{ x: [-1920, 0] }}
            transition={{
                x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25, // Velocidad ligeramente diferente para crear variación
                ease: "linear",
                },
            }}
            >
            {/* Duplicamos los productos pero en orden inverso para más variedad */}
            {[...featuredProducts.reverse(), ...featuredProducts.reverse()].map((featuredProduct, index) => (
                <div
                key={`reverse-${featuredProduct.id}-${index}`}
                className="flex-shrink-0 w-64 mx-3 rounded-lg overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                <div className="w-full h-48 overflow-hidden">
                    <img
                    src={featuredProduct.image}
                    alt={featuredProduct.name}
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                    />
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">{featuredProduct.name}</h3>
                </div>
                </div>
            ))}
            </motion.div>
        </div>

        <div className="mt-10 text-center">
            <motion.button 
            className="bg-lastbite-pink hover:bg-green-700 text-white font-bold py-3 px-10 rounded-lg text-lg transition duration-300 inline-flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            >
            Ver todos los productos
            </motion.button>
        </div>
        </div>
    </section>
  );
}