import React from 'react'
import { motion } from "framer-motion";

const RelatedProductCard = ({ name, price, image }) => {
  return (
    <motion.div 
      className="flex flex-col rounded-lg overflow-hidden shadow-md bg-white mr-4 w-48 flex-shrink-0"
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div className="h-32 bg-gray-200 relative overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-contain" />
      </div>
      <div className="p-3">
        <h4 className="font-medium text-lastbite-azul text-sm truncate">{name}</h4>
        <p className="text-pink-600 font-bold mt-1">${price.toFixed(2)}</p>
      </div>
    </motion.div>
  );
};

export default RelatedProductCard