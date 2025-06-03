import React from 'react';
import { motion } from 'framer-motion';
import { cateringPackages } from '../../../api/cateringPackages';
import { containerVariants, itemVariants } from '../../../common/constants/animationVariants';

const PackagesCatering = () => {
  return (
    <motion.div 
        id="packages"
        className="max-w-7xl mx-auto mb-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2 
          className="text-3xl font-bold text-gray-800 mb-2 text-center"
          variants={itemVariants}
        >
          Paquetes Sugeridos
        </motion.h2>
        
        <motion.p 
          className="text-center text-gray-600 mb-8 max-w-3xl mx-auto"
          variants={itemVariants}
        >
          Selecciona el paquete ideal para tu evento o solicita una propuesta personalizada
        </motion.p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {cateringPackages.map((pkg, index) => (
            <motion.div 
              key={index}
              className={`flex flex-col justify-between relative p-6 rounded-xl shadow-md ${pkg.highlighted ? 'bg-gradient-to-br from-pink-50 to-purple-50 border border-pink-200 transform scale-105' : 'bg-white'}`}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              {pkg.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm font-bold px-4 py-1 rounded-full">
                  Popular
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-gray-800 mb-1">{pkg.title}</h3>
              <p className="font-semibold text-pink-600 mb-2">{pkg.priceIndicator}</p>
              <p className="text-gray-600 mb-4 text-sm">{pkg.subtitle}</p>
              
              <ul className="mb-6 space-y-2">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start text-sm">
                    <span className="text-pink-500 mr-2">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <motion.button
                onClick={() => document.getElementById('contactForm').scrollIntoView({ behavior: 'smooth' })}
                className={`w-full py-3 px-4 rounded-lg font-medium ${pkg.highlighted ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg' : 'bg-pink-600 text-white'} hover:opacity-90`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {pkg.cta}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>
  )
}

export default PackagesCatering