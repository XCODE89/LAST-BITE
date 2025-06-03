
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { featuredProducts } from '../../../api/featuredProducts';
import CATButton from '../../../common/components/CATButton';
import InfinityCarrousel from './InfinityCarrousel';

export const FeaturedProducts = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <section id="products" className="section py-12 bg-lastbite-verde" ref={ref}>
        <div className="container mx-auto px-0">
            
            <motion.div 
                className="text-center mb-16"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.7 }}
                >
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-red font-playfair">
                    Nuestros <span className="text-lastbite-pink">Productos Destacados</span>
                </h2>
                <p className="text-lastbite-negSuave max-w-2xl mx-auto">
                    Descubre nuestra selección de postres gourmet, donde la tradición francesa se encuentra con la innovación culinaria para crear experiencias únicas para tu paladar.
                </p>
            </motion.div>
        
        {/* Contenedor principal del carrusel */}
        <div className="relative w-full overflow-hidden">
            {/* Primera fila - Movimiento hacia la derecha */}
            <InfinityCarrousel
                products={featuredProducts}
                direction="right"
                duration={30}
            ></InfinityCarrousel>
            
            {/* Segunda fila - Movimiento hacia la izquierda (dirección opuesta) */}

            <InfinityCarrousel
                products={featuredProducts}
                direction="left"
                duration={25}
                reverse
            ></InfinityCarrousel>
        </div>

        <div className="mt-10 text-center">
            <CATButton
                color="bg-lastbite-pink"
                hover="hover:bg-lastbite-crema"
                content="Ver todos los productos"
                text="text-lastbite-azul"
            />
        </div>
        </div>
    </section>
  );
}