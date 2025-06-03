
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Footer } from '../../../common/components/Footer';
import { Navbar } from '../../../common/components/NavBar';
import HeroCatering from '../components/HeroCatering';
import ServicesCatering from '../components/ServicesCatering';
import PackagesCatering from '../components/PackagesCatering';
import { containerVariants, itemVariants } from '../../../common/constants/animationVariants';

const Catering = () => {
const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    guests: '',
    date: '',
    location: '',
    budget: '',
    comments: ''
});

const [activeTab, setActiveTab] = useState('form');
const [isSubmitted, setIsSubmitted] = useState(false);

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
};

const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
    setFormData({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        guests: '',
        date: '',
        location: '',
        budget: '',
        comments: ''
    });
    setIsSubmitted(false);
    }, 3000);
};



// Gallery images - replace with your actual image paths
const galleryImages = [
    'https://static.vecteezy.com/system/resources/previews/044/279/881/non_2x/chocolate-chips-on-cookie-on-transparent-background-png.png',
    'https://static.vecteezy.com/system/resources/previews/044/279/881/non_2x/chocolate-chips-on-cookie-on-transparent-background-png.png',
    'https://static.vecteezy.com/system/resources/previews/044/279/881/non_2x/chocolate-chips-on-cookie-on-transparent-background-png.png',
    'https://static.vecteezy.com/system/resources/previews/044/279/881/non_2x/chocolate-chips-on-cookie-on-transparent-background-png.png'
];

const testimonials = [
    {
    text: "La mesa de postres fue el elemento más comentado de nuestra boda. No solo estaba bellamente presentada sino que cada postre estaba delicioso. ¡Superaron nuestras expectativas!",
    author: "María y Juan, Boda Primavera 2024"
    },
    {
    text: "Contratamos el servicio para nuestro evento corporativo anual y fue todo un éxito. Los postres personalizados con nuestro logo impresionaron a todos los asistentes.",
    author: "Empresa Tech Solutions"
    },
    {
    text: "El paquete de celebración fue perfecto para el baby shower. La atención personalizada y la calidad de los postres hicieron que nuestro evento fuera inolvidable.",
    author: "Carla, Baby Shower"
    }
];

return (
    <>
        <Navbar></Navbar>
        <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"> 
        {/* Hero Section */}
            <HeroCatering></HeroCatering>

        {/* Services Section - More Visual, Less Text */}
            <ServicesCatering></ServicesCatering>

        {/* Packages Section */}
            <PackagesCatering></PackagesCatering>

        {/* Gallery with CTA */}
        <motion.div 
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
            Nuestras Creaciones
            </motion.h2>
            
            <motion.p 
            className="text-center text-gray-600 mb-8 max-w-3xl mx-auto"
            variants={itemVariants}
            >
            Cada detalle es cuidadosamente diseñado para crear una experiencia única
            </motion.p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {galleryImages.map((img, index) => (
                <motion.div 
                key={index}
                className="overflow-hidden rounded-lg shadow-md aspect-square"
                variants={itemVariants}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                >
                <img 
                    src={img} 
                    alt={`Evento de catering ${index + 1}`} 
                    className="w-full h-full object-cover"
                />
                </motion.div>
            ))}
            </div>
            
            <div className="text-center mt-6">
            <motion.button
                onClick={() => window.open('https://www.instagram.com/your-account', '_blank')}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                Ver Más en Instagram
                <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
            </motion.button>
            </div>
        </motion.div>

        {/* Testimonials - More Visual */}
        <motion.div 
            className="max-w-7xl mx-auto mb-16 overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            <motion.h2 
            className="text-3xl font-bold text-gray-800 mb-2 text-center"
            variants={itemVariants}
            >
            Clientes Satisfechos
            </motion.h2>
            
            <motion.p 
            className="text-center text-gray-600 mb-8 max-w-3xl mx-auto"
            variants={itemVariants}
            >
            Lo que dicen quienes han disfrutado de nuestro servicio
            </motion.p>
            
            <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
                <motion.div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-md relative overflow-hidden"
                variants={itemVariants}
                whileHover={{ y: -5 }}
                >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-pink-200 to-pink-100 rounded-bl-full opacity-50"></div>
                <div className="text-pink-500 text-4xl mb-4">"</div>
                <p className="text-gray-700 mb-4 relative z-10">{testimonial.text}</p>
                <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.author.charAt(0)}
                    </div>
                    <div className="ml-3">
                    <p className="font-medium text-gray-800">{testimonial.author}</p>
                    <p className="text-sm text-pink-600">{testimonial.event}</p>
                    </div>
                </div>
                </motion.div>
            ))}
            </div>
        </motion.div>

        {/* Contact Form Section */}
        <motion.div 
            id="contactForm"
            className="max-w-4xl mx-auto mb-16 bg-white p-8 rounded-xl shadow-lg"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            <motion.h2 
            className="text-3xl font-bold text-gray-800 mb-2 text-center"
            variants={itemVariants}
            >
            ¿Listo para Endulzar tu Evento?
            </motion.h2>
            
            <motion.p 
            className="text-center text-gray-600 mb-6 max-w-3xl mx-auto"
            variants={itemVariants}
            >
            Contáctanos para crear una experiencia dulce personalizada
            </motion.p>

            <div className="flex justify-center mb-6">
            <div className="inline-flex rounded-md shadow-sm" role="group">
                <button
                onClick={() => setActiveTab('form')}
                className={`py-2 px-4 text-sm font-medium rounded-l-lg ${activeTab === 'form' ? 'bg-pink-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                >
                Formulario
                </button>
                <button
                onClick={() => setActiveTab('whatsapp')}
                className={`py-2 px-4 text-sm font-medium rounded-r-lg ${activeTab === 'whatsapp' ? 'bg-pink-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                >
                WhatsApp Directo
                </button>
            </div>
            </div>
            
            {activeTab === 'form' ? (
                <motion.form 
                onSubmit={handleSubmit}
                className="space-y-4"
                variants={itemVariants}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
            >
                <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                    <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                    required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                    required
                    />
                </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                    <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                    required
                    />
                </div>
                <div>
                    <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-1">Tipo de evento</label>
                    <select
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                    required
                    >
                    <option value="">Selecciona...</option>
                    <option value="Boda">Boda</option>
                    <option value="Cumpleaños">Cumpleaños</option>
                    <option value="Corporativo">Corporativo</option>
                    <option value="Baby Shower">Baby Shower</option>
                    <option value="Otro">Otro</option>
                    </select>
                </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">Invitados</label>
                    <input
                    type="number"
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                    required
                    />
                </div>
                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                    <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                    required
                    />
                </div>
                </div>
                
                <div>
                <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">Detalles adicionales</label>
                <textarea
                    id="comments"
                    name="comments"
                    rows="3"
                    value={formData.comments}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                ></textarea>
                </div>
                
                <div className="text-center pt-4">
                <motion.button
                    type="submit"
                    className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg shadow-lg text-white bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Enviar Solicitud
                </motion.button>
                </div>
                
                {isSubmitted && (
                <motion.div 
                    className="mt-4 p-4 bg-green-100 text-green-800 rounded-md text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                >
                    ¡Gracias! Nos pondremos en contacto contigo en menos de 24 horas.
                </motion.div>
                )}
            </motion.form>
            ) : (
                <motion.div 
                className="text-center py-8"
                variants={itemVariants}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                >
                <div className="max-w-md mx-auto">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Contáctanos por WhatsApp</h3>
                    <p className="text-gray-600 mb-6">
                    Para una respuesta más rápida, puedes contactarnos directamente a través de WhatsApp. Estaremos encantados de ayudarte.
                    </p>
                    
                    <a 
                    href={`https://wa.me/56950982932?text=Hola,%20estoy%20interesado/a%20en%20sus%20servicios%20para%20un%20evento.`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg shadow-lg text-white bg-green-500 hover:bg-green-600"
                    >
                    <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 6.628 5.373 12 12 12 6.627 0 12-5.372 12-12 0-6.627-5.373-12-12-12zm0 22c-5.514 0-10-4.486-10-10 0-5.514 4.486-10 10-10 5.514 0 10 4.486 10 10 0 5.514-4.486 10-10 10z"/>
                    </svg>
                    Contactar por WhatsApp
                    </a>
                    
                    <div className="mt-8 text-sm text-gray-500">
                    <p>Horario de atención:</p>
                    <p>Lunes a Viernes: 9:00 AM - 7:00 PM</p>
                    <p>Sábados: 10:00 AM - 3:00 PM</p>
                    </div>
                </div>
                </motion.div>
            )
            }
        </motion.div>
        </div>
        <Footer></Footer>
    </>
  );
};

export { Catering };