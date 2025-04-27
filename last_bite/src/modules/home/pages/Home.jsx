import React, { useEffect, useState } from 'react'

import { Loader } from '../../../common/components/loader'
import { Hero } from '../components/Hero';
import { Navbar } from '../../../common/components/NavBar';
import { FeaturedProducts } from '../components/FeaturedProducts';
import About from '../components/About';
import { Footer } from '../../../common/components/Footer';

const Home = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
        setLoading(false);
        }, 3500);
        
        return () => clearTimeout(timer);
    }, []);

  return (
    <>
      {loading
        ? <Loader></Loader>
        : <>
          <Navbar></Navbar>
          <Hero></Hero>
          <FeaturedProducts></FeaturedProducts>
          <About></About>
          <Footer></Footer>
        </>
      }
    </>
  );
}

export default Home