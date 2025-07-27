import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { useCita } from "../context/CitaContext";
import Layout from "../components/Layout";
import CarruselVehiculosOrdenados from "../components/CarruselVehiculosOrdenados";
import CarruselFeedbackCliente from "../components/CarruselFeedbackCliente";
import CarruselConsultasCliente from "../components/CarruselConsultasCliente";
import FormularioContacto from "../components/FormularioContacto";
import FormularioCitaModal from "../components/FormularioCitaModal";
import CarruselCitaCliente from "../components/CarruselCitaCliente";

export default function PanelCliente() {
const { usuarioActual } = useAuth();
  const { citas, cargarCitasPorCliente } = useCita();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
      if (usuarioActual?.id) {
        cargarCitasPorCliente(usuarioActual.id);
      }
    }, [usuarioActual?.id, cargarCitasPorCliente]);


  if (!usuarioActual || usuarioActual.rol !== "compra") {
    return <p className="text-center text-red-500 mt-6">Acceso denegado</p>;
  }

  return (
   <Layout>
  <div className="min-h-screen px-6 py-10 flex flex-col items-center">
    <h1 className="text-3xl font-bold text-blue-700 mb-10 text-center">Área del Cliente</h1>


    <section className="w-full max-w-4xl bg-gray-200 shadow-md p-6 rounded-lg mb-8">
      <h2 className="text-2xl font-semibold text-black mb-4">Mis vehículos adquiridos</h2>
      <CarruselVehiculosOrdenados clienteId={usuarioActual.id} />
    </section>


    <section className="w-full max-w-4xl  bg-gray-200  shadow-md p-6 rounded-lg mb-8">
      <h2 className="text-2xl font-semibold text-black mb-4">Mis opiniones sobre mis compras</h2>
      <CarruselFeedbackCliente clienteId={usuarioActual.id} />
    </section>


    <section className="w-full max-w-4xl bg-gray-200 shadow-md p-6 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">Historial de contacto</h2>
        <button
          onClick={() => setModalVisible(true)}
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
        >
          Contáctanos
        </button>
      </div>

      <p className="text-gray-600 text-sm mb-4">
        Aquí se muestran tus consultas y comunicaciones con la empresa.
      </p>
      <CarruselConsultasCliente clienteId={usuarioActual.id} />
        <Dialog
          visible={modalVisible}
          onHide={() => setModalVisible(false)}
          header="Consulta al servicio de atención"
          style={{ width: "40vw" }}        >
          <FormularioContacto clienteId={usuarioActual.id} onClose={() => setModalVisible(false)} />
        </Dialog>
    </section>


    <section className="w-full max-w-4xl bg-gray-200 shadow-md p-6 rounded-lg mt-8">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">Mis citas agendadas</h2>
        <button
          onClick={() => setMostrarFormulario(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Agendar cita
        </button>
      </div>

      <p className="text-gray-600 text-sm mb-4">
        Revisá tus próximas citas o agendá una nueva según disponibilidad.
      </p>
      
       <CarruselCitaCliente citas={citas} />

      <Dialog
        header="Agendar nueva cita"
        visible={mostrarFormulario}
        onHide={() => setMostrarFormulario(false)}
        style={{ width: "40vw" }}
      >
        <FormularioCitaModal
          clienteId={usuarioActual.id}
          onClose={() => setMostrarFormulario(false)}
        />
      </Dialog>
    </section>



  </div>
</Layout>

  );
}
