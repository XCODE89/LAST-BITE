
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Cart } from '../../modules/cart/Cart';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  const navLinks = [
    { name: 'Catálogo', href: '/productos' },
    { name: 'Catering', href: '/catering' },
    { name: 'Nosotros', href: '#about' }
  ];

  return (
    <motion.header
    className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-lastbite-verde/90 py-3' : 'bg-lastbite-azul/70 py-5'
    }`}
    initial="initial"
    animate="animate"
    variants={headerVariants}
    >
    <div className="container mx-auto px-4 grid grid-cols-3 items-center">
        {/* Mobile Navigation Toggle */}
        <div className="md:hidden">
            <button 
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-white focus:outline-none"
            >
                <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${menuOpen ? 'transform rotate-45 translate-y-2' : ''}`}></div>
                <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${menuOpen ? 'opacity-0' : ''}`}></div>
                <div className={`w-6 h-0.5 bg-white transition-all ${menuOpen ? 'transform -rotate-45 -translate-y-2' : ''}`}></div>
            </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex justify-start">
        {navLinks.map((link) => (
            <motion.div
            key={link.name}
            className="text-white hover:text-lastbite-pink text-sm font-medium relative mx-2"
            whileHover={{ y: -2 }}
            transition={{ type: 'spring', stiffness: 400 }}
            >
                <Link
                    to={link.href}
                    className="text-white hover:text-lastbite-pink text-sm font-medium relative"
                >
                    {link.name}
                </Link>
                <motion.span
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-lastbite-pink"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                />
            </motion.div>
        ))}
        </nav>

        <Link to="/" className="flex justify-center py-2">
            <h2 className="text-3xl sm:text-4xl font-serif tracking-wider m-0">
                <span className='bg-lastbite-crema text-lastbite-negSuave px-2 py-1/2'>LAST</span>
                <span className='bg-lastbite-negSuave text-lastbite-crema px-2'>BITE</span>
            </h2>
        </Link>

        {/* // TODO: carrito de compras */}
        <div className='flex justify-end'>
            <Cart></Cart>
        </div>
    </div>

    {/* Mobile Menu */}
    {menuOpen && (
        <motion.div 
        className="md:hidden bg-lastbite-azul/95 backdrop-blur-md absolute w-full py-4"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        >
        <div className="container mx-auto px-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
                <Link
                key={link.name}
                to={link.href}
                className="text-white hover:text-lastbite-pink py-2 block"
                onClick={() => setMenuOpen(false)}
            >
                {link.name}
            </Link>
            ))}
        </div>
        </motion.div>
    )}
    </motion.header>
  );
};

export { Navbar };