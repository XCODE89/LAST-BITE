import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Smartphone, Laptop, Headphones, Watch, Camera, Gamepad2, Home, Cake, Car, Cookie, PieChart, Pizza, Layers, Box, Martini , PillBottle } from 'lucide-react';

// Categorías de ejemplo - puedes personalizar estas
const categories = [
  {
    id: 0,
    name: 'Todos',
    icon: Box,
    description: 'Los últimos modelos',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
    color: 'from-blue-500 to-purple-600'
  },
  {
    id: 1,
    name: 'Brownies',
    icon: Box,
    description: 'Los últimos modelos',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
    color: 'from-blue-500 to-purple-600'
  },
  {
    id: 2,
    name: 'Alfajores',
    icon: Layers,
    description: 'Potencia y portabilidad',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
    color: 'from-green-500 to-teal-600'
  },
  {
    id: 3,
    name: 'Galletas',
    icon: Cookie,
    description: 'Sonido premium',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    color: 'from-red-500 to-pink-600'
  },
  {
    id: 4,
    name: 'Tartas',
    icon: PieChart,
    description: 'Tecnología en tu muñeca',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
    color: 'from-orange-500 to-yellow-600'
  },
  {
    id: 5,
    name: 'Tortas',
    icon: Cake,
    description: 'Captura cada momento',
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
    color: 'from-indigo-500 to-blue-600'
  },
  {
    id: 6,
    name: 'Empanadas',
    icon: Pizza,
    description: 'Para verdaderos gamers',
    image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=300&fit=crop',
    color: 'from-purple-500 to-pink-600'
  },
  {
    id: 7,
    name: 'Bites',
    icon: PillBottle,
    description: 'Smart home solutions',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    color: 'from-emerald-500 to-green-600'
  },
  {
    id: 8,
    name: 'Coctail',
    icon: Martini,
    description: 'Accesorios para tu auto',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop',
    color: 'from-slate-500 to-gray-600'
  }
];

const ProductCategoriesCarousel = ({ handleCategoryChange, activeCategory }) => {
  const containerRef = useRef(null);
  const itemWidth = 96 + 12;
  const [itemsPerView, setItemsPerView] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);


  useEffect(() => {
    const updateItemsPerView = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const fit = Math.floor(containerWidth / itemWidth);
        setItemsPerView(fit || 1); // mínimo 1
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const maxIndex = Math.max(0, categories.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <>
      <div className="relative overflow-hidden rounded-2xl w-full">
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
        >
          <ChevronRight size={24} />
        </button>

        {/* Categories Grid */}
        <div className="px-8" ref={containerRef}>
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * itemWidth}px)` }}
          >
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={category.id}
                  className="flex-none w-24 px-3"
                  onClick={() => handleCategoryChange(category.name)}
                >
                  <div className="group cursor-pointer">
                    {/* Image Container */}
                    <div className="relative overflow-hidden rounded-xl mb-4 flex justify-center">
                      <IconComponent className={`w-6 h-6 ${activeCategory === category.name ? "text-lastbite-accent" : "text-lastbite-neutroOs group-hover:text-lastbite-accent/50"}  `} />
                    </div>

                    {/* Category Info */}
                    <div className="text-center">
                      <h3 className={`text-sm font-bold ${activeCategory === category.name ? "text-lastbite-accent" : "text-lastbite-neutroOs group-hover:text-lastbite-accent/50"}  mb-2 transition-colors`}>
                        {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
      
    </>
  );
};

export default ProductCategoriesCarousel;