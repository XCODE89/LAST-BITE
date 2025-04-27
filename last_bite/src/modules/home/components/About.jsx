
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const About = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.8], [100, 0]);
  
  const imageParallax1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const imageParallax2 = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const imageParallax3 = useTransform(scrollYProgress, [0, 1], [0, -70]);

  return (
    <section id="about" className="section py-12 bg-lastbite-black relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute bottom-0 right-0 w-96 h-96">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#D24C85" d="M41.3,-69.2C53.5,-64.5,63.3,-52.7,68.3,-39.6C73.2,-26.4,73.3,-13.2,72.9,-0.2C72.6,12.8,71.8,25.5,66.9,37.9C62,50.3,53,62.3,41.1,69.9C29.3,77.5,14.6,80.6,0.5,79.9C-13.7,79.1,-27.4,74.5,-38.7,67.1C-50,59.7,-59,49.5,-64.7,37.7C-70.4,26,-72.9,13,-74.2,-0.8C-75.5,-14.6,-75.7,-29.3,-70.1,-41.6C-64.5,-53.9,-53.2,-64,-40.4,-68.5C-27.6,-73,-13.8,-72,0.4,-72.6C14.5,-73.2,29.1,-74,41.3,-69.2Z" transform="translate(100 100)" />
          </svg>
        </div>
        <div className="absolute top-0 left-0 w-96 h-96">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#D4AF37" d="M44.3,-76.5C57.3,-69.6,67.8,-56.4,73.5,-42C79.2,-27.6,80.2,-13.8,79.7,-0.3C79.2,13.3,77.1,26.5,70.9,37.8C64.6,49.1,54.1,58.3,42,65.6C29.8,72.9,14.9,78.3,-0.1,78.5C-15.1,78.7,-30.2,73.6,-42.2,65.5C-54.3,57.4,-63.3,46.2,-69.7,33.7C-76.1,21.1,-79.8,7.1,-79.1,-6.8C-78.4,-20.8,-73.3,-34.8,-65,-47.1C-56.7,-59.5,-45.3,-70.1,-32.2,-76.6C-19.2,-83.2,-4.8,-85.8,8.5,-82.7C21.8,-79.6,31.3,-83.4,44.3,-76.5Z" transform="translate(100 100)" />
          </svg>
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          style={{ opacity, y }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white font-playfair">
            Nuestra <span className="text-lastbite-pink">Historia</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Descubre la pasión y dedicación detrás de cada una de nuestras creaciones.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-8">
          <motion.div style={{ y: imageParallax1 }}>
            <div className="relative">
              <motion.img 
                src="https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Nuestros inicios"
                className="rounded-lg shadow-xl"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
              />
              <motion.div 
                className="absolute -bottom-10 -right-10 w-36 h-36 rounded-full overflow-hidden border-4 border-lastbite-pink shadow-lg hidden md:block"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <img 
                  src="https://static.vecteezy.com/system/resources/previews/044/279/881/non_2x/chocolate-chips-on-cookie-on-transparent-background-png.png" 
                  alt="Detalle de postre"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <h3 className="text-2xl md:text-3xl font-playfair font-semibold mb-6 text-lastbite-pink">Pasión por la excelencia</h3>
            <p className="text-gray-200 mb-6">
              Last Bite nació en 2015 como un pequeño proyecto artesanal y ha evolucionado hasta convertirse en una marca de referencia en el mundo de la repostería gourmet. Nuestra fundadora, Elena Morales, tras años de formación en las mejores escuelas de pastelería de París, decidió crear una línea de postres que combinara las técnicas tradicionales francesas con sabores innovadores y presentaciones artísticas.
            </p>
            <p className="text-gray-200 mb-8">
              Cada creación de Last Bite es el resultado de un meticuloso proceso creativo donde nada se deja al azar: desde la selección de los ingredientes más frescos y exclusivos, hasta el diseño final que convierte cada postre en una verdadera obra de arte comestible.
            </p>
            <motion.a 
              href="#contact"
              className="inline-flex items-center text-lastbite-pink hover:text-lastbite-gold transition-colors font-medium"
              whileHover={{ x: 5 }}
            >
              Conoce más sobre nuestra filosofía
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
          <motion.div 
            className="bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-lastbite-pink/20 hover:border-lastbite-pink/50 transition-all"
            style={{ y: imageParallax2 }}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
          >
            <div className="w-16 h-16 bg-lastbite-pink rounded-full flex items-center justify-center mb-6 mx-auto">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h4 className="text-xl font-playfair font-semibold mb-3 text-white text-center">Artesanía</h4>
            <p className="text-gray-300 text-center">
              Cada postre es elaborado a mano, con atención meticulosa al detalle para garantizar una experiencia única.
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-lastbite-pink/20 hover:border-lastbite-pink/50 transition-all"
            style={{ y: imageParallax3 }}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
          >
            <div className="w-16 h-16 bg-lastbite-pink rounded-full flex items-center justify-center mb-6 mx-auto">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h4 className="text-xl font-playfair font-semibold mb-3 text-white text-center">Ingredientes</h4>
            <p className="text-gray-300 text-center">
              Seleccionamos solo los ingredientes más frescos y de la más alta calidad de proveedores locales e internacionales.
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-lastbite-pink/20 hover:border-lastbite-pink/50 transition-all"
            style={{ y: imageParallax1 }}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
          >
            <div className="w-16 h-16 bg-lastbite-pink rounded-full flex items-center justify-center mb-6 mx-auto">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h4 className="text-xl font-playfair font-semibold mb-3 text-white text-center">Pasión</h4>
            <p className="text-gray-300 text-center">
              Nuestro equipo trabaja con amor y dedicación para crear experiencias gastronómicas inolvidables en cada bocado.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
