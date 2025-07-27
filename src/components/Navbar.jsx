import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CarritoIcono from "./CarritoIcono";

export default function Navbar() {
  const { pathname } = useLocation();
  const { usuarioActual, setUsuarioActual } = useAuth();
  const navigate = useNavigate();

  const cerrarSesion = () => {
    setUsuarioActual(null);
    navigate("/login");
  };

  const linkActivo = (ruta) => pathname === ruta ? "underline" : "";

  return (
    <nav className="bg-blue-800 text-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold">Autos CR</h1>
        
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link to="/" className={linkActivo("/")}>Inicio</Link>
          <Link to="/sucursales" className={linkActivo("/sucursales")}>Sucursales</Link>
          <Link to="/autos" className={linkActivo("/autos")}>Autos Usados</Link>
          <Link to="/contacto" className={linkActivo("/contacto")}>Contacto</Link>

          {usuarioActual?.rol === "compra" && (
            <>
              <Link to="/panel-cliente" className={linkActivo("/cliente")}>Mi Panel</Link>
             {/* <Link to="/ordenes" className={linkActivo("/ordenes")}>Mis Órdenes</Link>
              <Link to="/feedback" className={linkActivo("/feedback")}>Opinión</Link>
              <Link to="/contacto-historial" className={linkActivo("/contacto-historial")}>Contacto enviado</Link>*/}
            </>
          )}

          {usuarioActual?.rol === "administrativo" && (
            <Link to="/panel-admin" className={linkActivo("/panel-admin")}>Administración</Link>
          )}
          
          {usuarioActual?.rol === "compra" && (
            <CarritoIcono />
          )}

          {!usuarioActual ? (
            <Link to="/login" className="text-white hover:text-blue-300 px-4 py-2">Iniciar sesión</Link>
          ) : (
            <button
              onClick={cerrarSesion}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
            >
              Cerrar sesión
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
