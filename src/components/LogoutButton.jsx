import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const { setUsuarioActual } = useAuth();
  const navigate = useNavigate();

  const cerrarSesion = () => {
    setUsuarioActual(null);
    navigate("/login");
  };

  return (
    <button
      onClick={cerrarSesion}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
    >
      Cerrar sesión
    </button>
  );
}
