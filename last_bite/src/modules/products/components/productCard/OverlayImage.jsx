import React, { useContext } from 'react'
import { AppContext } from '../../../../context/context'
import { useNavigate } from 'react-router-dom'

const OverlayImage = ({product}) => {
    const {isGridView} = useContext(AppContext)
    const navigate = useNavigate()

  return (
    <div className={`relative ${isGridView ? 'aspect-square' : 'w-1/3'} overflow-hidden bg-gray-100`}>
        <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        onClick={() =>  navigate(`/productos/${product.id}`)}
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col space-y-2">
        {product.isNew && (
            <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
            NUEVO
            </span>
        )}
        {product.isBestseller && (
            <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
            TOP VENTAS
            </span>
        )}
        </div>
        
        {/* Quick actions */}
        <div className="absolute -right-16 top-4 flex flex-col space-y-2 group-hover:right-4 transition-all duration-300">
        <button className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors">
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
        </button>
        <button className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors">
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            </svg>
        </button>
        </div>
    </div>
  )
}

export default OverlayImage