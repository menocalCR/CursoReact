import { Calendar } from "primereact/calendar";

export default function FiltrosAdmin({ sucursales, sucursalId, setSucursalId, fechaSeleccionada, setFechaSeleccionada }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <select
        value={sucursalId}
        onChange={(e) => setSucursalId(e.target.value)}
        className="border rounded px-3 py-2 w-full shadow-sm"
      >
        <option value="">Seleccione sucursal</option>
        {sucursales.map((s) => (
          <option key={s.id} value={s.id}>{s.nombre}</option>
        ))}
      </select>

      <Calendar
        value={fechaSeleccionada}
        onChange={(e) => setFechaSeleccionada(e.value)}
        dateFormat="yy-mm-dd"
        className="w-full shadow-sm border rounded px-3 py-2"
        placeholder="Seleccione fecha"
      />
    </div>
  );
}
