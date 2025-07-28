import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useAutos } from "../context/AutosContext";

export default function GraficoDisponibilidad() {
  const { autos } = useAutos();

  const datos = [
    {
      estado: "Disponibles",
      cantidad: autos.filter((a) => !a.reservado && !a.entregado).length,
    },
    {
      estado: "Reservados",
      cantidad: autos.filter((a) => a.reservado && !a.entregado).length,
    },
    {
      estado: "Entregados",
      cantidad: autos.filter((a) => a.entregado).length,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-10 mt-10">
      <h3 className="text-lg font-semibold mb-4 text-blue-700 text-center">
        Distribución de vehículos por estado
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={datos} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="estado" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="cantidad" fill="#3b82f6" barSize={60} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
