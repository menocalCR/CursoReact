import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";

export default function MisOrdenes() {
  const { usuarioActual } = useAuth();
  const [ordenes, setOrdenes] = useState([]);
  const [autos, setAutos] = useState([]);

  useEffect(() => {
    // Obtener autos para mostrar detalles
    fetch("http://localhost:3001/autos")
      .then((res) => res.json())
      .then(setAutos);

    // Filtrar órdenes por cliente logueado
    if (usuarioActual) {
      fetch(`http://localhost:3001/ordenes?clienteId=${usuarioActual.id}`)
        .then((res) => res.json())
        .then(setOrdenes);
    }
  }, [usuarioActual]);

  const obtenerAuto = (id) => autos.find((a) => a.id === id);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">Mis Ordenes</h1>

        {ordenes.length === 0 ? (
          <p className="text-gray-600">No has realizado ninguna compra o reserva aún.</p>
        ) : (
          <div className="grid gap-6">
            {ordenes.map((orden) => {
              const auto = obtenerAuto(orden.autoId);

              return (
                <div key={orden.id} className="bg-white rounded shadow p-6">
                  <h2 className="text-xl font-bold text-blue-700 mb-2">
                    {orden.tipo === "compra" ? "Compra" : "Reserva"}: {auto?.marca} {auto?.modelo}
                  </h2>
                  <p><strong>Estado:</strong> {orden.estado}</p>
                  <p><strong>Fecha:</strong> {new Date(orden.fecha).toLocaleDateString()}</p>
                  <p className="mt-2"><strong>Dirección:</strong> {orden.datosCliente.direccion}</p>
                  <p><strong>Teléfono:</strong> {orden.datosCliente.telefono}</p>
                  <p><strong>Monto:</strong> ${orden.tipo === "reserva" ? (auto?.precio * 0.1).toFixed(2) : auto?.precio.toFixed(2)}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}
