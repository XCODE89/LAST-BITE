import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { offers } from '../../../api/offers';
import CATButton from '../../../common/components/CATButton';
import { contentVariants, slideVariants } from '../../../common/constants/animationVariants';

const Hero = () => {

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
    }, 10000); // Cambia cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  // Obtiene la oferta actual
  const currentOffer = offers[currentIndex];

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
          }}
        />
      </AnimatePresence>
      
      {/* Contenedor principal */}
      <div className="relative h-full w-full flex items-center">
        <div className="container mx-auto px-6 text-lastbite-neutroOs">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentOffer.id}
              custom={direction}
              variants={slideVariants}
              initial="center"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, type: "tween" }}
              className="max-w-md flex flex-col gap-4"
            >
              {/* Indicador de oferta */}
              <motion.div 
                className="mb-4 flex items-center"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                custom={0}
              >
                <span className=" text-sm font-bold px-3 border-b border-t py-1 ">
                  {/* //!se puede poner el nombre de la coleccion */}
                  {offers[currentIndex].titleTag}
                </span>
              </motion.div>
              
              {/* Información del producto - Animación escalonada */}
              <motion.h1 
                className="text-4xl font-bold mb-4 uppercase"
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
              
              {/* Botón CTA */}
              <CATButton 
                contentVariants={contentVariants} 
                content={currentOffer.ctaText}
                className="bg-lastbite-accent hover:bg-lastbite-accent/90 text-lastbite-neutroCl w-2/3"
              />
                

            </motion.div>
          </AnimatePresence>

          {/* Controles de navegación */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-4">
            <motion.button 
              onClick={prevOffer}
              className="p-2 bg-lastbite-neutroOs bg-opacity-60 rounded-full hover:bg-opacity-80"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Oferta anterior"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </motion.button>
            
            <div className="flex space-x-2 items-center">
              {offers.map((_, idx) => (
                <motion.button 
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={`w-3 h-3 rounded-full ${currentIndex === idx ? 'bg-lastbite-neutroCl' : 'bg-lastbite-neutroOs/70'}`}
                  whileHover={{ scale: 1.2 }}
                  aria-label={`Ir a oferta ${idx + 1}`}
                ></motion.button>
              ))}
            </div>
            
            <motion.button 
              onClick={nextOffer}
              className="p-2 bg-lastbite-neutroOs bg-opacity-60 rounded-full hover:bg-opacity-80"
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
