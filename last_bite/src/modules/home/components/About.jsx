
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import FeatureAbout from './FeatureAbout';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  return (
    <section id="about" className="section py-12 relative overflow-hidden " ref={ref}>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-4"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-lastbite-azul font-playfair">
            Nuestra <span className="text-lastbite-pink">Historia</span>
          </h2>
          <p className="text-lastbite-negSuave max-w-2xl mx-auto">
            Descubre la pasión y dedicación detrás de cada una de nuestras creaciones.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-8">
          <motion.div >
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
            <p className="text-lastbite-negSuave mb-6">
              Last Bite nació en 2015 como un pequeño proyecto artesanal y ha evolucionado hasta convertirse en una marca de referencia en el mundo de la repostería gourmet. Nuestra fundadora, Elena Morales, tras años de formación en las mejores escuelas de pastelería de París, decidió crear una línea de postres que combinara las técnicas tradicionales francesas con sabores innovadores y presentaciones artísticas.
            </p>
            <p className="text-lastbite-negSuave mb-8">
              Cada creación de Last Bite es el resultado de un meticuloso proceso creativo donde nada se deja al azar: desde la selección de los ingredientes más frescos y exclusivos, hasta el diseño final que convierte cada postre en una verdadera obra de arte comestible.
            </p>
            <motion.a 
              href="#contact"
              className="inline-flex items-center text-lastbite-azul hover:text-lastbite-gold transition-colors font-medium"
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
          <FeatureAbout
            icon="http://www.w3.org/2000/svg"
            title="Artesanía"
            content="Cada postre es elaborado a mano, con atención meticulosa al detalle para garantizar una experiencia única."
          />
          <FeatureAbout
            icon="http://www.w3.org/2000/svg"
            title="Ingredientes"
            content="Seleccionamos solo los ingredientes más frescos y de la más alta calidad de proveedores locales e internacionales."
          />
          <FeatureAbout
            icon="http://www.w3.org/2000/svg"
            title="Pasión"
            content="Nuestro equipo trabaja con amor y dedicación para crear experiencias gastronómicas inolvidables en cada bocado."
          />
        </div>
      </div>
    </section>
  );
};

export default About;
