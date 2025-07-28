import { useState } from "react";
import { useContacto } from "../context/ContactoContext";
import DetalleConsultaModal from "./DetalleConsultaModal";
import { FaUserCheck, FaUserClock } from "react-icons/fa";

export default function CarruselContactosIngresados({ contactos, onActualizar }) {
  const [pagina, setPagina] = useState(0);
  const [resoluciones, setResoluciones] = useState({});
  const [procesando, setProcesando] = useState({});
  const [mostrarModalDetalle, setMostrarModalDetalle] = useState(false);
  const [contactoActual, setContactoActual] = useState(null);
  const { actualizarContacto } = useContacto();

  const porPagina = 3;
  const totalPaginas = Math.ceil(contactos.length / porPagina);
  const visibles = contactos.slice(pagina * porPagina, (pagina + 1) * porPagina);

  const manejarCambio = (id, campo, valor) => {
    setResoluciones(prev => ({
      ...prev,
      [id]: { ...prev[id], [campo]: valor },
    }));
  };

  const verDetalleContacto = (contacto) => {
  setContactoActual(contacto);
  setMostrarModalDetalle(true);};

  const resolverContacto = async (id) => {
  const resolucion = resoluciones[id];
  if (!resolucion?.estado || !resolucion?.contactadoPor || !resolucion?.atendidoPor || !resolucion?.resolucion) {
    alert("⚠️ Completá todos los campos antes de confirmar.");
    return;
  }

  setProcesando(prev => ({ ...prev, [id]: true }));

  const resultado = await actualizarContacto(id, {
    estado: resolucion.estado,
    atendidoPor: resolucion.atendidoPor,
    contactadoPor: resolucion.contactadoPor,
    resolucion: resolucion.resolucion,
    FecharResolucion: new Date().toISOString()
  });

  if (resultado && typeof onActualizar === "function") {
    onActualizar();
  }

  setProcesando(prev => ({ ...prev, [id]: false }));
};



  return (
    <div className="mt-4">
      {visibles.length === 0 ? (
        <div className="text-center text-gray-500 text-sm">
          <FaUserClock className="text-3xl mb-2 text-yellow-600 mx-auto" />
          No hay contactos ingresados actualmente.
        </div>
      ) : (
        <div className={`grid ${visibles.length === 1 ? "grid-cols-1" : "md:grid-cols-3"} gap-4`}>
          {visibles.map((contacto) => {
            const estadoActual = resoluciones[contacto.id]?.estado || "";
            const atendidoPorActual = resoluciones[contacto.id]?.atendidoPor || "";
            const contactadoPorActual = resoluciones[contacto.id]?.contactadoPor || "";

            return (
              <div
                key={`contacto-${contacto.id}`}
                className="bg-white p-4 rounded shadow text-sm transition hover:shadow-lg animate-fade-in"
              >
                <div className="flex items-center gap-2 text-blue-600 mb-2">
                  <FaUserCheck className="text-xl" />
                  <h3 className="font-semibold text-lg">
                    {contacto.nombre} {contacto.apellidos}
                  </h3>
                </div>

                <p className="text-gray-500 mb-1">Email: {contacto.email}</p>
                <p className="text-gray-500 mb-1">Teléfono: {contacto.telefono}</p>
                <p className="text-gray-600">Placa: {contacto.placa || "—"}</p>
                <p className="text-gray-600">Cédula: {contacto.tipoCedula}</p>

                <div className="mt-3 space-y-2">
                  <select
                    value={estadoActual}
                    onChange={(e) => manejarCambio(contacto.id, "estado", e.target.value)}
                    className="w-full border rounded px-2 py-1 text-sm"
                  >
                    <option value="">Estado</option>
                    <option value="aprobado">Aprobar</option>
                    <option value="rechazado">Rechazar</option>
                  </select>

                  <select
                    value={contactadoPorActual}
                    onChange={(e) => manejarCambio(contacto.id, "contactadoPor", e.target.value)}
                    className="w-full border rounded px-2 py-1 text-sm"
                  >
                    <option value="">Medio de contacto</option>
                    <option value="email">Email</option>
                    <option value="teléfono">Teléfono</option>
                  </select>
                    <textarea
                    placeholder="Escribí la resolución..."
                    value={resoluciones[contacto.id]?.resolucion || ""}
                    onChange={(e) => manejarCambio(contacto.id, "resolucion", e.target.value)}
                    className="w-full border rounded px-2 py-1 text-sm"
                    />
                  <input
                    type="text"
                    placeholder="Atendido por..."
                    value={atendidoPorActual}
                    onChange={(e) => manejarCambio(contacto.id, "atendidoPor", e.target.value)}
                    className="w-full border rounded px-2 py-1 text-sm"
                  />
                    <button
                    onClick={() => verDetalleContacto(contacto)}
                    className="w-full mt-2 px-3 py-2 text-sm rounded bg-gray-100 text-blue-700 hover:bg-gray-200"
                    >
                    Ver detalles
                    </button>
                  <button
                    disabled={procesando[contacto.id]}
                    onClick={() => resolverContacto(contacto.id)}
                    className={`w-full mt-2 px-3 py-2 text-sm rounded ${
                      procesando[contacto.id]
                        ? "bg-gray-300 text-gray-500"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {procesando[contacto.id] ? "Actualizando..." : "Confirmar atención"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {totalPaginas > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: totalPaginas }).map((_, i) => (
            <button
              key={`pagina-${i}`}
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
      
<DetalleConsultaModal
  visible={mostrarModalDetalle}
  contacto={contactoActual}
  onClose={() => setMostrarModalDetalle(false)}
/>
    </div>
  );
}
