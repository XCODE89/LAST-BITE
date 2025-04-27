
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  
  // Variantes para la animación del contenedor
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren"
      }
    },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.8,
        when: "afterChildren"
      }
    }
  };
  
  // Variantes para las esquinas
  const cornerVariants = {
    hidden: (custom) => ({
      width: 0,
      height: 0,
      x: custom.x,
      y: custom.y,
      opacity: 1
    }),
    visible: (custom) => ({
      width: custom.width,
      height: custom.height,
      x: custom.finalX,
      y: custom.finalY,
      opacity: 1,
      transition: { 
        duration: 2.5,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    }),
    exit: (custom) => ({
      width: 0,
      height: 0,
      x: custom.x,
      y: custom.y,
      opacity: 0,
      transition: { 
        duration: 0.8,
        ease: "easeInOut"
      }
    })
  };
  
  // Variantes para el texto
  const textVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        delay: .4,
        duration: 1.5,
        ease: "easeInOut"
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.8,
      transition: { 
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };
  
  // Variantes para el efecto de brillo
  const shineVariants = {
    initial: { x: "-100%", opacity: 0 },
    animate: { 
      x: "100%", 
      opacity: [0, 1, 0],
      transition: {
        delay: 2, 
        repeat: Infinity,
        repeatDelay: 2.5,
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  };
  
  return (
    <>
      {/* Loader */}
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-gray-900 z-50"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Contenedor del rectángulo y esquinas */}
          <div className="relative w-80 h-40">
            {/* Esquina superior derecha */}
            <motion.div
              className="absolute border-t-2 border-r-2 border-white"
              custom={{
                x: 160,
                y: 80,
                finalX: 240,
                finalY: 0,
                width: 80,
                height: 40
              }}
              variants={cornerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            />
            
            {/* Esquina inferior izquierda */}
            <motion.div
              className="absolute border-b-2 border-l-2 border-white"
              custom={{
                x: 160,
                y: -80,
                finalX: 0,
                finalY: 0,
                width: 80,
                height: 40
              }}
              variants={cornerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ bottom: 0, left: 0 }}
            />
            
            {/* Nombre del negocio */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Contenedor para el texto y el efecto de brillo */}
              <div className="relative">
                <h1 className="text-4xl font-serif tracking-wider m-0">
                  <span className='bg-white text-black px-2 py-1/2'>LAST</span>
                  <span className='bg-black text-white px-2'>BITE</span>
                </h1>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 overflow-hidden"
                  variants={shineVariants}
                  initial="initial"
                  animate="animate"
                />
              </div>
            </motion.div>
            
            {/* Línea delgada que conecta las esquinas */}
            <motion.div
              className="absolute inset-0 border border-white opacity-20"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ 
                opacity: [0, 0.2, 0.2, 0],
                scale: [0.6, 1, 1, 0.6],
                transition: { 
                  delay: 2,
                  duration: 3,
                  ease: "easeInOut"
                }
              }}
            />
            
            {/* Puntos decorativos en las intersecciones */}
            <motion.div
              className="absolute w-2 h-2 bg-white rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
              transition={{
                delay: 2.5,
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              style={{ top: 0, right: 0 }}
            />
            <motion.div
              className="absolute w-2 h-2 bg-white rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
              transition={{ 
                delay: 2.5,
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{ bottom: 0, left: 0 }}
            />
          </div>
        </motion.div>
    </>
  );
}

export { Loader }