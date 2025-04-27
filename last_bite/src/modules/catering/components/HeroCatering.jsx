import React from 'react';
import { motion } from 'framer-motion';

const HeroCatering = () => {
  return (
    <>
        <motion.div 
                className="relative max-w-7xl mx-auto text-center mb-12 overflow-hidden rounded-xl shadow-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="relative h-96 bg-pink-100 flex items-center justify-center overflow-hidden">
                    {/* Background image or animated element here */}
                    <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-r from-pink-500/30 to-purple-500/30"></div>
                    
                    <div className="relative z-10 px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8 max-w-3xl">
                        <h1 className="text-4xl font-extrabold text-white drop-shadow-lg mb-4">
                        Catering de Postres para Eventos
                        </h1>
                        <p className="text-lg text-white drop-shadow-lg mb-8">
                        Haz que tu evento sea inolvidable con nuestra selección gourmet de postres artesanales
                        </p>
                        
                        <motion.div 
                        className="flex flex-col sm:flex-row justify-center gap-4 mt-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        >
                        <motion.button
                            onClick={() => document.getElementById('contactForm').scrollIntoView({ behavior: 'smooth' })}
                            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg shadow-lg text-white bg-pink-600 hover:bg-pink-700 focus:outline-none"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Solicitar Presupuesto
                        </motion.button>
                        
                        <motion.button
                            onClick={() => document.getElementById('packages').scrollIntoView({ behavior: 'smooth' })}
                            className="inline-flex items-center justify-center px-8 py-3 border border-pink-600 text-base font-medium rounded-lg shadow-lg text-pink-600 bg-white hover:bg-pink-50 focus:outline-none"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Ver Opciones
                        </motion.button>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Quick Benefits Bar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {[
                    { icon: "✨", text: "Personalización Total" },
                    { icon: "🍰", text: "Ingredientes Premium" },
                    { icon: "🚚", text: "Entrega Garantizada" },
                    { icon: "💯", text: "Satisfacción Asegurada" }
                ].map((benefit, index) => (
                    <motion.div 
                    key={index}
                    className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 * index }}
                    >
                    <span className="text-3xl mb-2">{benefit.icon}</span>
                    <h3 className="font-medium text-gray-800">{benefit.text}</h3>
                    </motion.div>
                ))}
                </div>
            </div>
    </>
  )
}

export default HeroCatering