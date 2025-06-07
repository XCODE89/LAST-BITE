import { useNavigate } from 'react-router-dom'

const OverlayImage = ({product}) => {
    const navigate = useNavigate()

  return (
    <div className="relative aspect-square overflow-hidden bg-lastbite-neutroCl/60">
        <img
        src={product.image}
        alt={product.name}
        className="absolute inset-0 w-full h-full object-cover blur-xl scale-110"
        aria-hidden="true"
        />
        <img
        src={product.image}
        alt={product.name}
        className="relative w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
        onClick={() =>  navigate(`/productos/${product.id}`)}
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col space-y-2">
        {product.isNew && (
            <span className="bg-lastbite-accent text-white text-xs font-bold px-3 py-1.5 rounded-full">
            NUEVO
            </span>
        )}
        {product.isBestseller && (
            <span className="bg-lastbite-neutroOs text-white text-xs font-bold px-3 py-1.5 rounded-full">
            TOP VENTAS
            </span>
        )}
        </div>
    </div>
  )
}

export default OverlayImage