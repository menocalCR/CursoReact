import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import FiltrosAdmin from "../components/FiltrosAdmin";
import CarruselCitasSolicitadas from "../components/CarruselCitasSolicitadas";
import { useSucursales } from "../context/SucursalContext";
import { obtenerCitasPorFecha, actualizarEstadoCita } from "../loaders/CitaLoader";
import { useClientes } from "../context/ClienteContext";

export default function PanelAdministrativo() {
  const { sucursales } = useSucursales();
  const { usuarioActual } = useAuth();
  const { clientes } = useClientes();

  const [sucursalId, setSucursalId] = useState("");
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [citasSolicitadas, setCitasSolicitadas] = useState([]);

  useEffect(() => {
    if (sucursalId && fechaSeleccionada) {
      const fechaFormateada = fechaSeleccionada.toISOString().split("T")[0];
      console.log("🔍 Cargando citas para:", fechaFormateada, "Sucursal:", sucursalId);

      obtenerCitasPorFecha(fechaFormateada).then((citas) => {
        console.log("📋 Citas recibidas del servidor:", citas);

        const filtradas = citas.filter(
          (cita) => cita.estado === "solicitada" && cita.sucursalId === sucursalId
        );

        console.log("✅ Citas filtradas:", filtradas);
        console.log("✅ clientes:", clientes);
        const citasConNombre = filtradas.map((cita) => {
          const cliente = clientes.find((c) => c.id === String(cita.clienteId));

          return {
            ...cita,
            nombreCliente: cliente?.nombre || `Cliente ID: ${cita.clienteId}`,
          };
        });

        setCitasSolicitadas(citasConNombre);
      });
    } else {
      setCitasSolicitadas([]);
    }
  }, [sucursalId, fechaSeleccionada, clientes]);

  if (!usuarioActual || usuarioActual.rol !== "administrativo") {
    return <p className="text-center text-red-500 mt-6">Acceso denegado</p>;
  }

  async function aprobarCita(idCita) {
    const resultado = await actualizarEstadoCita(idCita, "aprobada");
    if (resultado) {
      setCitasSolicitadas((prev) => prev.filter((cita) => cita.id !== idCita));
    }
  }

  async function rechazarCita(idCita) {
    const resultado = await actualizarEstadoCita(idCita, "rechazada");
    if (resultado) {
      setCitasSolicitadas((prev) => prev.filter((cita) => cita.id !== idCita));
    }
  }

  return (
    <Layout>
      <div className="p-5">
        {/* 📍 Sección: Formulario de filtros */}
        <section className="w-full max-w-4xl mx-auto bg-gray-100 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Filtrar Citas</h2>
          <FiltrosAdmin
            sucursales={sucursales}
            sucursalId={sucursalId}
            setSucursalId={setSucursalId}
            fechaSeleccionada={fechaSeleccionada}
            setFechaSeleccionada={setFechaSeleccionada}
          />
        </section>

        {/* 📍 Sección: Carrusel de citas solicitadas */}
        <section className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Citas pendientes de aprobación</h2>
          <CarruselCitasSolicitadas
            citas={citasSolicitadas}
            aprobarCita={aprobarCita}
            rechazarCita={rechazarCita}
          />
        </section>
      </div>
    </Layout>
  );
}
