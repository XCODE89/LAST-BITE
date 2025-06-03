import React, { useRef } from 'react';
import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';
import { FeaturedCard } from './FeaturedCard';

const InfinityCarrousel = ({ products, direction = 'left', duration = 20, reverse = false }) => {
  const x = useMotionValue(0);
  const isPaused = useRef(false);

  const baseProducts = reverse ? [...products].reverse() : products;
  const fullList = [...baseProducts, ...baseProducts]; // duplicado para efecto infinito

  const itemWidth = 280; // Aproximadamente 256 + margen (ajustalo según tu diseño)
  const totalWidth = itemWidth * baseProducts.length;
  const speed = direction === 'left' ? -1 : 1;
  const pixelsPerSecond = totalWidth / duration;

  useAnimationFrame((_, delta) => {
    if (!isPaused.current) {
      const moveBy = (pixelsPerSecond * delta) / 1000 * speed;
      let current = x.get() + moveBy;

      // Resetea suavemente cuando se completa un ciclo
      if (direction === 'left' && current <= -totalWidth) {
        current = 0;
      } else if (direction === 'right' && current >= 0) {
        current = -totalWidth;
      }

      x.set(current);
    }
  });

  return (
    <motion.div
      className="flex py-4"
      style={{ x }}
      onMouseEnter={() => (isPaused.current = true)}
      onMouseLeave={() => (isPaused.current = false)}
    >
      {fullList.map((product, index) => (
        <FeaturedCard key={`${reverse ? 'reverse-' : ''}${product.id}-${index}`} product={product}></FeaturedCard>
      ))}
    </motion.div>
  );
};

export default InfinityCarrousel;
