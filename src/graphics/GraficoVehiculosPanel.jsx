import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function GraficoVehiculosPanel({ autos }) {
  const estados = [
    { estado: "Disponibles", cantidad: autos.filter((a) => !a.reservado && !a.entregado).length },
    { estado: "Reservados", cantidad: autos.filter((a) => a.reservado && !a.entregado).length },
    { estado: "Entregados", cantidad: autos.filter((a) => a.entregado).length },
  ];

const entregasPorFecha = Object.entries(
  autos
    .filter((a) => a.entregado && a.fechaEntrega)
    .reduce((acc, a) => {
      const fecha = new Date(a.fechaEntrega).toLocaleDateString("es-CR");
      acc[fecha] = acc[fecha] ? acc[fecha] + 1 : 1;
      return acc;
    }, {})
)
  .map(([fecha, cantidad]) => ({ fecha, cantidad }))
  .sort((a, b) => new Date(a.fecha) - new Date(b.fecha));


  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Gráfico de barras */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-blue-700 mb-4 text-center">Vehículos por estado</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={estados}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="estado" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="cantidad" fill="#3b82f6" name="Cantidad" />
          </BarChart>
        </ResponsiveContainer>
      </section>

      {/* Línea temporal */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-green-600 mb-4 text-center">Entregas por fecha</h3>
        {entregasPorFecha.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={entregasPorFecha}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fecha" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="cantidad" stroke="#10b981" name="Entregas" />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-gray-500 mt-12">Aún no hay entregas registradas</p>
        )}
      </section>
    </div>
  );
}
