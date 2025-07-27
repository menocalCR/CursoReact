import { useSucursales } from "../context/SucursalContext";

export default function SucursalInfo({ id }) {
  const { sucursales } = useSucursales();
  const sucursal = sucursales.find((s) => s.id === id);

  if (!sucursal) return <p className="text-center text-red-500">Sucursal no encontrada.</p>;

  const renderHorarios = () => {
    const { horarios } = sucursal;

    if (Array.isArray(horarios)) {
      return horarios.map((h, i) => <li key={i}>{h}</li>);
    }

    if (typeof horarios === "object" && horarios !== null) {
      return Object.entries(horarios).map(([dia, horas], i) => {
        if (typeof horas === "object" && horas.inicio && horas.fin) {
          return (
            <li key={i}>
              <span className="font-semibold">{dia}:</span>{" "}
              {horas.inicio} – {horas.fin}
            </li>
          );
        }

        return (
          <li key={i}>
            <span className="font-semibold">{dia}:</span>{" "}
            {typeof horas === "string" ? horas : "Horario no disponible"}
          </li>
        );
      });
    }

    return <li className="text-gray-500 italic">Horarios no disponibles</li>;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 text-gray-800">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-bold mb-2">{sucursal.nombre}</h2>
          <p><strong>Dirección:</strong> {sucursal.direccion}</p>
          <p><strong>Teléfono:</strong> {sucursal.telefono}</p>
          <p className="mt-2 font-semibold">Horarios:</p>
          <ul className="list-disc list-inside">
            {renderHorarios()}
          </ul>
        </div>
        <div>
          <img
            src={sucursal.imagen}
            alt={sucursal.nombre}
            className="rounded mb-4 w-full h-56 object-cover"
          />
          <div dangerouslySetInnerHTML={{ __html: sucursal.mapa }} />
        </div>
      </div>
    </div>
  );
}
