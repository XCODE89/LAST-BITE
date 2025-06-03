import React from 'react'

export const FeaturedCard = ({ product }) => {
  return (
    <div
          className="flex-shrink-0 w-64 mx-3 rounded-lg overflow-hidden bg-lastbite-azul shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="w-full h-48 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-lastbite-crema">{product.name}</h3>
          </div>
        </div>
  )
}
