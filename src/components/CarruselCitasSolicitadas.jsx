import { useState } from "react";

export default function CarruselCitasSolicitadas({ citas, aprobarCita, rechazarCita }) {
  const [pagina, setPagina] = useState(0);
  const porPagina = 4; // Ajustable según el diseño
  const totalPaginas = Math.ceil(citas.length / porPagina);
  const visibles = citas.slice(pagina * porPagina, (pagina + 1) * porPagina);

  if (citas.length === 0) {
    return <p className="text-center text-gray-500">No hay citas solicitadas para esta fecha.</p>;
  }

  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {visibles.map((cita) => (
          <div
            key={cita.id}
            className="bg-gray-50 p-4 rounded shadow hover:shadow-md transition-transform duration-200 hover:-translate-y-1"
          >
            <h3 className="text-lg font-semibold text-blue-800">{cita.tipoCita}</h3>
            <p><strong>Hora:</strong> {cita.horaSolicitada}</p>
            <p><strong>Cliente:</strong> {cita.nombreCliente}</p>
            <p><strong>Sucursal:</strong> {cita.sucursalId}</p>
            <div className="mt-3 flex gap-3">
              <button
                onClick={() => aprobarCita(cita.id)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Aprobar Cita
              </button>
              <button
                onClick={() => rechazarCita(cita.id)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Rechazar Cita
              </button>
            </div>
          </div>
        ))}
      </div>

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
    </div>
  );
}
