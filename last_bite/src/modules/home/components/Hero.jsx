import React, { useEffect, useRef, useState } from 'react'
import { Loader } from '../../../common/components/loader'
import { AnimatePresence, motion } from 'framer-motion';
import { offers } from '../../../api/offers';

const Hero = () => {
    const containerRef = useRef(null);

const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Función para pasar a la siguiente oferta
  const nextOffer = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % offers.length);
  };

  // Función para ir a la oferta anterior
  const prevOffer = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + offers.length) % offers.length);
  };

  // Autoplay de las ofertas
  useEffect(() => {
    const interval = setInterval(() => {
      nextOffer();
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  // Obtiene la oferta actual
  const currentOffer = offers[currentIndex];

  // Variantes para la animación del contenido
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  // Variantes para la animación escalonada de elementos
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.2 }
    })
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Imagen de fondo con transición suave */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentOffer.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${currentOffer.bgImage}')`,
            filter: "brightness(0.7)"
          }}
        />
      </AnimatePresence>
      
      {/* Contenedor principal */}
      <div className="relative h-full w-full flex items-center">
        <div className="container mx-auto px-6">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentOffer.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, type: "tween" }}
              className="max-w-md text-white"
            >
              {/* Indicador de oferta */}
              <motion.div 
                className="mb-4 flex items-center"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                custom={0}
              >
                <span className="bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-md">
                  Oferta {currentIndex + 1} de {offers.length}
                </span>
              </motion.div>
              
              {/* Información del producto - Animación escalonada */}
              <motion.h1 
                className="text-4xl font-bold mb-4"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                custom={1}
              >
                {currentOffer.title}
              </motion.h1>
              
              <motion.h2 
                className="text-xl font-semibold mb-2"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                custom={2}
              >
                {currentOffer.tagline}
              </motion.h2>
              
              <motion.p 
                className="mb-6"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                custom={3}
              >
                {currentOffer.description}
              </motion.p>
              
              {/* Características principales */}
              <motion.div 
                className="mb-8"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                custom={4}
              >
                {currentOffer.features.map((feature, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-center mb-2"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    custom={4 + index * 0.3}
                  >
                    <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
                    <p>{feature}</p>
                  </motion.div>
                ))}
              </motion.div>
              
              {/* Botón CTA */}
              <motion.button 
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                custom={5}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {currentOffer.ctaText}
              </motion.button>
            </motion.div>
          </AnimatePresence>

          {/* Controles de navegación */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-4">
            <motion.button 
              onClick={prevOffer}
              className="p-2 bg-gray-800 bg-opacity-60 rounded-full hover:bg-opacity-80"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Oferta anterior"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </motion.button>
            
            <div className="flex space-x-2">
              {offers.map((_, idx) => (
                <motion.button 
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={`w-3 h-3 rounded-full ${currentIndex === idx ? 'bg-white' : 'bg-gray-400'}`}
                  whileHover={{ scale: 1.2 }}
                  aria-label={`Ir a oferta ${idx + 1}`}
                ></motion.button>
              ))}
            </div>
            
            <motion.button 
              onClick={nextOffer}
              className="p-2 bg-gray-800 bg-opacity-60 rounded-full hover:bg-opacity-80"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Siguiente oferta"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
