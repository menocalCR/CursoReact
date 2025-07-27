import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import PanelAdministrativo from "../PanelAdministrativo";
// Más páginas de admin luego...

export default function RutasAdmin() {
  const { usuarioActual } = useAuth();

  {/* if (!usuarioActual || usuarioActual.rol !== "admin") return <Navigate to="/login" />;*/}

  return (
    <Routes>
      <Route path="/panel-admin" element={<PanelAdministrativo />} />
      {/* futuras rutas para gestión de autos, usuarios, reportes... */}
    </Routes>
  );
}
