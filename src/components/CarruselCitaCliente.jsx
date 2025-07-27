import React, { useState, useMemo } from 'react';

const ITEMS_POR_PAGINA = 3;

const CarruselCitaCliente = ({ citas, onSeleccionar }) => {
  const [paginaActual, setPaginaActual] = useState(0);

  const totalPaginas = Math.ceil((citas?.length || 0) / ITEMS_POR_PAGINA);

  const citasVisibles = useMemo(() => {
    const start = paginaActual * ITEMS_POR_PAGINA;
    return citas?.slice(start, start + ITEMS_POR_PAGINA) || [];
  }, [paginaActual, citas]);

  if (!citas || citas.length === 0) {
    return (
      <p className="text-sm text-gray-500 text-center mt-4">
        No hay citas disponibles para mostrar.
      </p>
    );
  }

  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-2 py-4">
        {citasVisibles.map((cita) => (
          <div
            key={cita.id}
            className="bg-white border rounded-md shadow p-4 hover:shadow-lg hover:-translate-y-1 transition-transform duration-200"
          >
            <h2 className="text-blue-700 font-semibold mb-1 text-base">
              Servicio: {cita.tipoCita}
            </h2>
            <p className="text-sm text-gray-600 mb-1">Cliente: {cita.nombreCliente}</p>
            <p className="text-sm text-gray-600 mb-1">Fecha: {cita.fechaSolicitada}</p>
            <p className="text-sm text-gray-600 mb-1">Hora: {cita.horaSolicitada}</p>
            <p className="text-sm text-gray-600 mb-2">Sucursal: {cita.sucursalId}</p>
            <p className="text-sm text-gray-600 mb-2">
              Tipo de cédula: {cita.tipoCedula || "No especificado"}
            </p>

            {/*<button
              onClick={() => onSeleccionar(cita)}
              className="bg-blue-600 text-white text-sm px-4 py-1 rounded hover:bg-blue-700 transition"
            >
              Seleccionar
            </button>*/}
          </div>
        ))}
      </div>

      {totalPaginas > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: totalPaginas }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPaginaActual(i)}
              className={`px-3 py-1 rounded text-sm ${
                i === paginaActual ? "bg-blue-600 text-white" : "bg-gray-200 text-blue-700"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CarruselCitaCliente;
