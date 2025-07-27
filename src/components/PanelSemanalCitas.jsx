import { useCitaContext } from "../context/CitaProvider";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useState, useEffect } from "react";

export const PanelSemanalCitas = () => {
  const { obtenerCitasPorFecha, actualizarEstadoCita } = useCitaContext();
  const [citasPorDia, setCitasPorDia] = useState({});
  const [fechaInicioSemana, setFechaInicioSemana] = useState(new Date());

  useEffect(() => {
    cargarCitasSemana(fechaInicioSemana);
  }, [fechaInicioSemana]);

  const cargarCitasSemana = async (fechaBase) => {
    const citas = await obtenerCitasPorFecha(fechaBase);
    const agrupadas = agruparPorDia(citas);
    setCitasPorDia(agrupadas);
  };

  const agruparPorDia = (citas) => {
    const agrupadas = {};
    citas.forEach((cita) => {
      const dia = format(new Date(cita.fecha), "EEEE dd/MM", { locale: es });
      if (!agrupadas[dia]) agrupadas[dia] = [];
      agrupadas[dia].push(cita);
    });
    return agrupadas;
  };

  const manejarEstado = async (idCita, estado) => {
    await actualizarEstadoCita(idCita, estado);
    cargarCitasSemana(fechaInicioSemana); // refrescar
  };

  return (
    <section className="w-full max-w-5xl mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Citas de esta semana</h2>
      {Object.entries(citasPorDia).map(([dia, citas]) => (
        <div key={dia} className="mb-6">
          <h3 className="text-lg font-medium mb-2 text-blue-700">{dia}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {citas.map((cita) => (
              <div key={cita.id} className="bg-gray-100 p-4 rounded-md shadow-sm">
                <p><strong>Cliente:</strong> {cita.nombreCliente}</p>
                <p><strong>Hora:</strong> {cita.hora}</p>
                <div className="mt-2 flex gap-2">
                  <button onClick={() => manejarEstado(cita.id, "aprobada")} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                    Aprobar
                  </button>
                  <button onClick={() => manejarEstado(cita.id, "rechazada")} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                    Rechazar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};
