import { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import FeedbackForm from "./FeedbackForm";
import { useOrdenes } from "../context/OrdenesContext";
import AutoModal from "../components/AutoModal";
import { Button } from "primereact/button";

export default function CarruselVehiculosOrdenados({ clienteId }) {
  const { ordenesFusionadas, cargarOrdenesFusionadas } = useOrdenes();
  const [pagina, setPagina] = useState(0);
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [autoSeleccionado, setAutoSeleccionado] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

useEffect(() => {
    cargarOrdenesFusionadas(clienteId);
  }, [clienteId]);

  const porPagina = 3;
  const totalPaginas = Math.ceil(ordenesFusionadas.length / porPagina);
  const visibles = ordenesFusionadas.slice(pagina * porPagina, (pagina + 1) * porPagina);

  const abrirFeedback = (orden) => {
    setAutoSeleccionado(orden.auto);
    setFeedbackVisible(true);
  };

  const abrirDetalle = (orden) => {
  setAutoSeleccionado(orden.auto);
  setModalVisible(true);
};

  return (
    <div>
      {visibles.length === 1 ? (
        <div className="flex justify-center items-center w-full">
          <div className="bg-white p-4 rounded border text-sm shadow transition-transform duration-200 hover:shadow-lg hover:-translate-y-1 max-w-sm">
            <img
              src={visibles[0].auto.imagen || "/auto-generico.jpg"}
              alt={visibles[0].auto.modelo || "Auto"}
              className="h-40 w-full object-cover rounded"
            />
            <h3 className="font-semibold mt-2">
              {visibles[0].auto.marca} {visibles[0].auto.modelo} ({visibles[0].auto.ano})
            </h3>
            <p className="text-sm text-gray-700">Estado: {visibles[0].estado}</p>
            <p className="text-sm text-gray-500">
              Monto pagado: ₡{Number(visibles[0].montoPagado).toLocaleString()}
            </p>
            <div className="mt-3 flex gap-2">
              <Button
                label="Ver detalle"
                icon="pi pi-search"
                className="bg-indigo-600 text-white px-2 py-1 text-xs rounded-full hover:bg-indigo-700 transition"
                onClick={() => abrirDetalle(visibles[0])}
              />
              {!visibles[0].yaOpinado && (
                <button
                  className="bg-blue-600 text-white px-2 py-1 text-xs rounded-full hover:bg-blue-700 transition"
                  onClick={() => abrirFeedback(visibles[0])}
                >
                  Dejar opinión
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {visibles.map((orden) => (
            <div
              key={orden.id}
              className="bg-white p-4 rounded border text-sm shadow transition-transform duration-200 hover:shadow-lg hover:-translate-y-1"
            >
              <img
                src={orden.auto.imagen || "/auto-generico.jpg"}
                alt={orden.auto.modelo || "Auto"}
                className="h-40 w-full object-cover rounded"
              />
              <h3 className="font-semibold mt-2">
                {orden.auto.marca} {orden.auto.modelo} ({orden.auto.ano})
              </h3>
              <p className="text-sm text-gray-700">Estado: {orden.estado}</p>
              <p className="text-sm text-gray-500">
                Monto pagado: ₡{Number(orden.montoPagado).toLocaleString()}
              </p>
              <div className="mt-3 flex gap-2">
                <Button
                  label="Ver detalle"
                  icon="pi pi-search"
                  className="bg-indigo-600 text-white px-2 py-1 text-xs rounded-full hover:bg-indigo-700 transition"
                  onClick={() => abrirDetalle(orden)}
                />
                {!orden.yaOpinado && (
                  <button
                    className="bg-blue-600 text-white px-2 py-1 text-xs rounded-full hover:bg-blue-700 transition"
                    onClick={() => abrirFeedback(orden)}
                  >
                    Dejar opinión
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}


      {/* paginación */}
      {totalPaginas > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: totalPaginas }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPagina(i)}
              className={`px-3 py-1 rounded ${i === pagina ? "bg-blue-600 text-white" : "bg-white border"}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Modal de feedback */}
      <Dialog
        visible={feedbackVisible}
        onHide={() => setFeedbackVisible(false)}
        header="Dejar opinión del vehículo"
        draggable={false}
        resizable={false}
        style={{ width: "40vw" }}
      >
        {autoSeleccionado && (
          <FeedbackForm
            clienteId={clienteId}
            auto={autoSeleccionado}
            onClose={() => {setFeedbackVisible(false); cargarOrdenesFusionadas(clienteId);}}
          />
        )}
      </Dialog>

      {autoSeleccionado && (
        <AutoModal
          visible={modalVisible}
          onHide={() => setModalVisible(false)}
          auto={autoSeleccionado}
        />
      )}

    </div>
  );
}
