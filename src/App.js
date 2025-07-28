
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Home from "./pages/Home";
import AutosUsados from "./pages/AutosUsados";
import Contacto from "./pages/Contacto";
import Login from "./pages/Login";
import PanelAdministrativo from "./pages/PanelAdministrativo";
import PanelCliente from "./pages/PanelCliente";
import Sucursales from "./pages/Sucursales";
import CarritoCompra from "./pages/CarritoCompra";
import { useAuth } from "./context/AuthContext";
import  RutasCliente  from "./pages/routes/RutasCliente";
import  RutasAdmin  from "./pages/routes/RutasAdmin";



function App() {
  const { usuarioActual, setUsuarioActual } = useAuth();
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/autos" element={<AutosUsados />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sucursales" element={<Sucursales />} />
          <Route path="/panel-cliente" element={<PanelCliente />} />
          <Route path="/panel-admin" element={<PanelAdministrativo />} />
              <Route path="/*" element={<RutasCliente />} />
              <Route path="/*" element={<RutasAdmin />} />
        </Routes>
      </div>
    </Router>
  );
}




export default App;