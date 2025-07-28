import { useState, useEffect } from "react";
import { useContacto } from "../context/ContactoContext";
import { FaCommentDots } from "react-icons/fa";
import DetalleConsultaModal from "./DetalleConsultaModal";

export default function CarruselConsultasCliente({ clienteId }) {
  const { contactos, cargarContactosPorCliente, cargarDetalleContacto, detalleContacto  } = useContacto();
  const [pagina, setPagina] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (clienteId) cargarContactosPorCliente(clienteId);
  }, [clienteId, cargarContactosPorCliente]);

  const mostrarDetalles = async (id) => {
    await cargarDetalleContacto(id);
    setModalVisible(true);
  };
  const propios = contactos.filter(c => String(c.clienteId) === String(clienteId));
  const porPagina = 3;
  const totalPaginas = Math.ceil(propios.length / porPagina);
  const visibles = propios.slice(pagina * porPagina, (pagina + 1) * porPagina);

  return (
    <div className="mt-4">
      {visibles.length === 0 ? (
        <div className="text-gray-600 text-sm text-center">
          <FaCommentDots className="text-3xl mb-2 text-blue-600 mx-auto animate-fade-in" />
          No hay consultas registradas aún.
        </div>
      ) : visibles.length === 1 ? (
        <div className="flex justify-center items-center w-full">
          <div className="bg-white p-4 rounded shadow-md text-sm transition-transform duration-200 hover:shadow-lg hover:-translate-y-1 max-w-sm w-full animate-fade-in">
            
            <div className="flex items-center gap-2 mb-2 text-blue-600">
              <FaCommentDots className="text-xl" />
              <h3 className="font-semibold text-lg">
                {visibles[0].nombre} {visibles[0].apellidos}
              </h3>
            </div>
            <p className="text-sm text-gray-500 mb-1">Correo: {visibles[0].email}</p>
            <p className="text-sm text-gray-500">Tel: {visibles[0].telefono}</p>
            <p className="text-sm text-gray-600 mb-2">Placa: {visibles[0].placa || "N/A"}</p>
            <p className="text-sm text-gray-600 mb-2">Tipo de cédula: {visibles[0].tipoCedula}</p>
            <p className={`text-xs font-semibold px-2 py-1 rounded inline-block ${
              visibles[0].estado === "ingresado" ? "bg-yellow-100 text-yellow-700" :
              visibles[0].estado === "en atencion" ? "bg-blue-100 text-blue-700" :
              "bg-green-100 text-green-700"
            }`}>
              Estado: {visibles[0].estado}
            </p>
            <p className="text-xs text-gray-500 mt-1">Atendido por: {visibles[0].atendidoPor || "Pendiente"}</p>
            <button
              onClick={() => mostrarDetalles(visibles[0].id)}
              className="mt-2 text-xs text-blue-600 hover:underline">
              Ver detalles
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {visibles.map((consulta) => (
            <div key={consulta.id} className="bg-white p-4 rounded shadow-md text-sm transition-transform duration-200 hover:shadow-lg hover:-translate-y-1 animate-fade-in">
              <div className="flex items-center gap-2 mb-2 text-blue-600">
                <FaCommentDots className="text-xl" />
                <h3 className="font-semibold text-lg">
                  {consulta.nombre} {consulta.apellidos}
                </h3>
              </div>
              <p className="text-sm text-gray-500 mb-1">Correo: {consulta.email}</p>
              <p className="text-sm text-gray-500">Tel: {consulta.telefono}</p>
              <p className="text-sm text-gray-600 mb-2">Placa: {consulta.placa || "N/A"}</p>
              <p className="text-sm text-gray-600 mb-2">Tipo de cédula: {consulta.tipoCedula}</p>
              <p className={` font-semibold rounded inline-block ${
                consulta.estado === "ingresado" ? "bg-yellow-100 text-yellow-700" :
                consulta.estado === "en atencion" ? "bg-blue-100 text-blue-700" :
                "bg-green-100 text-green-700"
              }`}>
                Estado: {consulta.estado}
              </p>
              <p className="text-xs text-gray-500 mt-1">Atendido por: {consulta.atendidoPor || "Pendiente"}</p>
              <button
                onClick={() => mostrarDetalles(consulta.id)}
                className="mt-2 text-xs text-blue-600 hover:underline">
                Ver detalles
              </button>
            </div>
          ))}
        </div>
      )}

      {totalPaginas > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: totalPaginas }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPagina(i)}
              className={`px-3 py-1 rounded text-sm ${
                i === pagina ? "bg-blue-600 text-white" : "bg-gray-200 text-blue-700"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
      {modalVisible && (
        <DetalleConsultaModal  visible={modalVisible} contacto={detalleContacto}  onClose={() => setModalVisible(false)} />
      )}

    </div>
  );
}
