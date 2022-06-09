
import Home from '../Components/Home'
import Products1 from '../Components/Products1'
import Products2 from '../Components/Products2'
import Detalle from '../Components/Detalle'
import Detalle2 from '../Components/Detalle2'
import Registrar from '../Inicio/Registrar'
import Inicio from '../Inicio/Inicio'
import ProductosAlta from '../Inicio/productosAlta'
import ProductsModificar from '../Inicio/ProductsModificar'
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom"


function Public() {
  return (
      <Routes>
        <Route path='/inicio' element={<Inicio  />} />
        <Route path='/products' element={<Home />} />
        <Route path='/products1' element={<Products1 />} />
        <Route path='/products2' element={<Products2 />} />
        <Route path='/registrar' element={<Registrar />} />
        <Route path='/' element={<Navigate to="/inicio" />} />
        <Route path='/product1/:id' element={<Detalle />} />
        <Route path='/product2/:id' element={<Detalle2 />} />
        <Route path='/products/alta' element={<ProductosAlta />} />
        <Route path='/products/modificar/:id' element={<ProductsModificar />} />
      </Routes>
  );
}

export default Public;
