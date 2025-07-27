import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import PanelCliente from "../PanelCliente";
import CarritoCompra2 from "../CarritoCompra2";
//import OrdenesCliente from "../OrdenesCliente";
//import FeedbackCompra from "../FeedbackCompra";
//import ContactoHistorial from "../ContactoHistorial";

export default function RutasCliente() {
  const { usuarioActual } = useAuth();
 {/* if (usuarioActual.rol !== "compra") return <Navigate to="/login" />;*/}

  return (
    <Routes>
      <Route path="/panel-cliente" element={<PanelCliente />} />
      <Route path="/carrito" element={<CarritoCompra2 />} />
      {/*<Route path="/ordenes" element={<OrdenesCliente />} />
      <Route path="/feedback" element={<FeedbackCompra />} />
      <Route path="/contacto-historial" element={<ContactoHistorial />} />*/}
    </Routes>
  );
}
