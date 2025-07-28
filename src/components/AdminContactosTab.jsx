import CarruselContactosIngresados from "./CarruselContactosIngresados";
import { useContacto } from "../context/ContactoContext";
import { useEffect, useState } from "react";
import { obtenerContactosResueltosHoy } from "../loaders/ContactoLoader";

export default function AdminContactosTab() {
  const { contactos, cargarContactosIngresados } = useContacto();
  const [resueltosHoy, setResueltosHoy] = useState([]);

  // Función compartida para actualizar resumen dinámico
  const cargarResumen = async () => {
    const datos = await obtenerContactosResueltosHoy();
    setResueltosHoy(datos);
  };

  // Función compuesta para actualizar todo
  const refrescarTodo = async () => {
    await cargarContactosIngresados(); // 🔄 actualiza listado de contactos
    await cargarResumen();             // 🔄 actualiza resumen dinámico
  };

  // Carga inicial
  useEffect(() => {
    cargarResumen();
  }, []);

  // Conteo diario dinámico
  const totalAprobados = resueltosHoy.filter(c => c.estado === "aprobado").length;
  const totalRechazados = resueltosHoy.filter(c => c.estado === "rechazado").length;

  return (
    <div>
      <section className="w-full max-w-4xl bg-gray-200 shadow-md p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold text-black mb-4">Administración de contactos</h2>

        {/* Filtro visual (aunque aún no interactivo) */}
        <section className="w-full max-w-4xl mx-auto bg-gray-100 rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Filtrar Contactos</h2>
          <p className="text-gray-600 text-center">
            Actualmente se muestran todos los contactos con estado <strong>"ingresado"</strong>
          </p>
        </section>

        {/* Carrusel con lógica de actualización compuesta */}
        <section className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Contactos pendientes de atención</h2>
          <CarruselContactosIngresados
            contactos={contactos}
            onActualizar={refrescarTodo} // 👈 ahora actualiza listado y resumen
          />
        </section>

        {/* Resumen de atención diaria */}
        <section className="w-full max-w-4xl mx-auto bg-blue-50 rounded-lg shadow p-4 text-center">
          <p className="text-gray-800 text-sm">
            <span className="font-semibold text-green-700">{totalAprobados}</span> consultas aprobadas hoy ·{" "}
            <span className="font-semibold text-red-700">{totalRechazados}</span> rechazadas
          </p>
        </section>
      </section>
    </div>
  );
}
