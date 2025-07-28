import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import FiltrosAdmin from "../components/FiltrosAdmin";
import CarruselCitasSolicitadas from "../components/CarruselCitasSolicitadas";
import { useSucursales } from "../context/SucursalContext";
import { obtenerCitasPorFecha, actualizarEstadoCita } from "../loaders/CitaLoader";
import { useClientes } from "../context/ClienteContext";
import { TabView, TabPanel } from "primereact/tabview"; 
import AdminCitasTab from "../components/AdminCitasTab"; 
import AdminFeedbackTab from "../components/AdminFeedbackTab";
import { useContacto } from "../context/ContactoContext"; 
import AdminContactosTab from "../components/AdminContactosTab"; 
import AdminVehiculosTab from "../components/AdminVehiculosTab";


export default function PanelAdministrativo() {
  const { sucursales } = useSucursales();
  const { usuarioActual } = useAuth();
  const { clientes } = useClientes();
  const { cargarContactosIngresados, contactos } = useContacto();
  const [sucursalId, setSucursalId] = useState("");
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [citasSolicitadas, setCitasSolicitadas] = useState([]);

  useEffect(() => {
    cargarContactosIngresados();
    if (sucursalId && fechaSeleccionada) {
      const fechaFormateada = fechaSeleccionada.toISOString().split("T")[0];
      console.log("🔍 Cargando citas para:", fechaFormateada, "Sucursal:", sucursalId);

      obtenerCitasPorFecha(fechaFormateada).then((citas) => {
        console.log("📋 Citas recibidas del servidor:", citas);

        const filtradas = citas.filter(
          (cita) => cita.estado === "solicitada" && cita.sucursalId === sucursalId
        );
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
       <div className="min-h-screen px-6 py-10 flex flex-col items-center">
    <h1 className="text-3xl font-bold text-blue-700 mb-10 text-center">Panel administrativo</h1>

    <TabView>
      <TabPanel header="Administración de citas">
        <AdminCitasTab
          sucursales={sucursales}
          sucursalId={sucursalId}
          setSucursalId={setSucursalId}
          fechaSeleccionada={fechaSeleccionada}
          setFechaSeleccionada={setFechaSeleccionada}
          citasSolicitadas={citasSolicitadas}
          aprobarCita={aprobarCita}
          rechazarCita={rechazarCita}
        />
      </TabPanel>
       <TabPanel header="Administración de contactos"> {/* ✅ Nuevo tab */}
            <AdminContactosTab contactos={contactos} />
          </TabPanel>
        <TabPanel key="feedback-1" header="Administración de vehiculos">
        <AdminVehiculosTab/>
       </TabPanel>
        <TabPanel key="feedback-2" header="Administración nueva">
        <AdminFeedbackTab/>
       </TabPanel>
     
    </TabView>
  </div>
    </Layout>
  );
}
