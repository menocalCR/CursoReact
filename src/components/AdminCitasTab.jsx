import FiltrosAdmin from "./FiltrosAdmin";
import CarruselCitasSolicitadas from "./CarruselCitasSolicitadas";

export default function AdminCitasTab({
  sucursales,
  sucursalId,
  setSucursalId,
  fechaSeleccionada,
  setFechaSeleccionada,
  citasSolicitadas,
  aprobarCita,
  rechazarCita,
}) {
  return (
    <div>
      <section className="w-full max-w-4xl bg-gray-200 shadow-md p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold text-black mb-4">Administración de citas</h2>

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

        <section className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Citas pendientes de aprobación</h2>
          <CarruselCitasSolicitadas
            citas={citasSolicitadas}
            aprobarCita={aprobarCita}
            rechazarCita={rechazarCita}
          />
        </section>
      </section>
    </div>
  );
}
