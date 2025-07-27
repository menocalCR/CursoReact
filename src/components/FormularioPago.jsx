import { useState } from "react";
import { useCarrito } from "../context/CarritoContext";
import { useAuth } from "../context/AuthContext";
import { useAutos } from "../context/AutosContext";
import { useOrdenes } from "../context/OrdenesContext";

export default function FormularioPago({ total }) {
  const { carrito, vaciarCarrito } = useCarrito();
  const { usuarioActual } = useAuth();
  const [datos, setDatos] = useState({ nombre: "", apellidos: "", tarjeta: "", direccion: "", telefono: "",  correo: "" });
  const [procesando, setProcesando] = useState(false);
  const [completado, setCompletado] = useState(false);
  const { reservarAuto } = useAutos();
  const { registrarOrden } = useOrdenes();
  const handleChange = (e) => setDatos({ ...datos, [e.target.name]: e.target.value });


  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcesando(true);

    try {
      await Promise.all(
        carrito.map(async (item) => {
        const orden = {
              autoId: item.id,
              clienteId: usuarioActual.id,
              tipo: item.tipo,
              estado: item.tipo === "reserva" ? "reservado" : "comprado",
              fecha: new Date().toISOString(),
              montoPagado: item.tipo === "reserva" ? item.precio * 0.1 : item.precio,
              datosCliente: {
                nombre: datos.nombre,
                apellidos: datos.apellidos,
                correo: datos.correo,
                tarjeta: datos.tarjeta,
                direccion: datos.direccion,
                telefono: datos.telefono,
              },
};

          await registrarOrden(orden);
          await reservarAuto(item.id);


        })
      );

      vaciarCarrito();
      setCompletado(true);
    } catch (err) {
      console.error("❌ Error procesando pago:", err);
    } finally {
      setProcesando(false);
    }
  };

  if (completado)
    return (
      <div className="mt-10 bg-white p-6 rounded shadow text-center text-blue-800">
        <h2 className="text-2xl font-bold mb-4">🎉 ¡Compra realizada!</h2>
        <p>Tu orden ha sido registrada con éxito.</p>
        <p>Los vehículos seleccionados han sido marcados como reservados.</p>
        <p>Gracias por tu compra, {datos.nombre} 🙌</p>
      </div>
    );

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 rounded-lg shadow-lg p-6 max-w-4xl mx-auto mt-10">
  <h3 className="text-2xl font-bold text-blue-700 mb-6 text-center">Información de pago</h3>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <input
      name="nombre"
      placeholder="Nombre"
      onChange={handleChange}
      className="border border-gray-300 rounded px-3 py-2 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />

    <input
      name="apellidos"
      placeholder="Apellidos"
      onChange={handleChange}
      className="border border-gray-300 rounded px-3 py-2 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />

    <input
      name="correo"
      placeholder="Correo electrónico"
      type="email"
      onChange={handleChange}
      className="border border-gray-300 rounded px-3 py-2 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />

    <input
      name="telefono"
      placeholder="Teléfono (506 xxxx-xxxx)"
      pattern="^506\s\d{4}-\d{4}$"
      title="Formato esperado: 506 xxxx-xxxx"
      onChange={handleChange}
      className="border border-gray-300 rounded px-3 py-2 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />

    <input
      name="tarjeta"
      placeholder="Tarjeta de crédito"
      pattern="^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$"
      title="Debe tener 16 dígitos, separados o juntos"
      onChange={handleChange}
      inputMode="numeric"
      className="border border-gray-300 rounded px-3 py-2 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />

    <input
      name="direccion"
      placeholder="Dirección"
      onChange={handleChange}
      className="border border-gray-300 rounded px-3 py-2 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
      required
    />
  </div>

  <div className="text-right mt-6">
    <p className="text-lg font-bold text-blue-700">
      Total a pagar: ₡{Number(total.toFixed(2)).toLocaleString()}
    </p>
  </div>

  <div className="text-center mt-6">
    <button
      type="submit"
      disabled={procesando}
      className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition w-full"
    >
      {procesando ? "Procesando..." : "Confirmar pago"}
    </button>
  </div>
</form>

  );
}
