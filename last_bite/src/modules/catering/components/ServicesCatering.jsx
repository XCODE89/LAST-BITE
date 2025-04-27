import React from 'react'
import { motion } from 'framer-motion';

import { cateringServices } from '../../../api/cateringServices';
import { containerVariants, itemVariants } from '../constants/animationVariants';

const ServicesCatering = () => {
  return (
    <motion.div 
            className="max-w-7xl mx-auto mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            <motion.h2 
            className="text-3xl font-bold text-gray-800 mb-6 text-center"
            variants={itemVariants}
            >
            Nuestros Servicios
            </motion.h2>
            
            <div className="grid md:grid-cols-3 gap-6">
            {cateringServices.map((service, index) => (
                <motion.div 
                key={index}
                className="relative bg-white overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 group"
                variants={itemVariants}
                >
                <div className="p-6 h-full flex flex-col justify-between">
                    <div className="text-4xl mb-4">{service.icon}</div>
                    <h3 className="text-xl font-semibold text-pink-600 mb-2">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    
                    <motion.button
                    onClick={() => document.getElementById('contactForm').scrollIntoView({ behavior: 'smooth' })}
                    className="text-pink-600 font-medium group-hover:text-pink-700 flex items-center"
                    whileHover={{ x: 5 }}
                    >
                    Más información
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    </motion.button>
                </div>
                
                {/* Color accent on hover */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </motion.div>
            ))}
            </div>
            
            <div className="text-center mt-8">
            <motion.button
                onClick={() => document.getElementById('contactForm').scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                Consulta por Servicios Especiales
            </motion.button>
            </div>
        </motion.div>
  )
}

export default ServicesCatering