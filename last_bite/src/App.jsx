import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Loader } from "./common/components/loader";
import Home from "./modules/home/pages/Home";
import { NotFound } from "./common/pages/NotFound";
import { Products } from "./modules/products/pages/Products";
import { Catering } from "./modules/catering/pages/Catering";
import { ProductDetail } from "./modules/detail/pages/ProductDetail";

const App = () => (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/productos/:id" element={<ProductDetail />} />
          <Route path="/catering" element={<Catering />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
);

export default App;
