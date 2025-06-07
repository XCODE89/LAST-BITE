import { useContext } from 'react';

import { Navbar } from '../../../common/components/NavBar';
import { AppContext } from '../../../context/context';
import SearchBar from '../components/SearchBar';
import { Footer } from '../../../common/components/Footer';
import GridProducts from '../components/GridProducts';

const Products  = () => {
  const { filteredProducts } = useContext(AppContext)

  // Renderizado del componente
  return (
    <>
        <Navbar></Navbar>
        <div className="min-h-screen bg-lastbite-neutroCl pt-32 pb-24">
            <div className="container mx-auto px-4">                
                
                {/* Buscador y Controles */}
                <SearchBar></SearchBar>
                
                {/* Contador de resultados */}
                <div className="flex justify-between items-center mb-6">
                <p className="text-lastbite-negSuave">
                    Mostrando <span className="font-medium">{filteredProducts.length}</span> productos
                </p>
                </div>
                
                {/* Grid de productos */}
                <GridProducts/>
            </div>
        </div>
        <Footer></Footer>
    </>
  );
}

export { Products };
