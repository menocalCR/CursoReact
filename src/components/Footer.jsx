import { Link } from "react-router-dom";
import { useSucursales } from "../context/SucursalContext";

export default function Footer() {
  const { sucursales } = useSucursales();

  return (
    <footer className="bg-blue-950 text-white py-10 px-6 md:px-10 lg:px-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo + Navegación */}
        <div>
          <h2 className="text-xl font-bold mb-4">Autos CR</h2>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:underline">Inicio</Link></li>
            <li><Link to="/contacto" className="hover:underline">Contáctanos</Link></li>
            <li><Link to="/sucursales" className="hover:underline">¿Dónde estamos?</Link></li>
          </ul>
        </div>

        {/* Sucursales dinámicas */}
        <div>
          <h3 className="text-lg font-bold mb-3">Sucursales</h3>
          <ul className="text-sm space-y-2">
            {sucursales.map((sucursal) => (
              <li key={sucursal.id}>
                <strong>{sucursal.nombre}:</strong> {sucursal.direccion}
              </li>
            ))}
          </ul>
        </div>

        {/* Contacto rápido */}
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold mb-3">Contáctanos</h3>
            <p className="text-sm">📞 4000-8480</p>
          </div>
          <div className="space-y-2 mt-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm">
              Quiero comprar
            </button>
            <button className="bg-white hover:bg-blue-100 text-blue-800 py-2 px-4 rounded text-sm">
              Quiero cotizar
            </button>
          </div>
        </div>
      </div>

      {/* Línea final */}
      <div className="text-center mt-10 text-xs text-blue-200">
        © {new Date().getFullYear()} Autos CR. Todos los derechos reservados.
      </div>
    </footer>
  );
}
