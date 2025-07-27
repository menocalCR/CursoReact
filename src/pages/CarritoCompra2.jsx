import { useCarrito } from "../context/CarritoContext";
import { useState } from "react";
import { Button } from "primereact/button";
import AutoModal from "../components/AutoModal";
import FormularioPago2 from "../components/FormularioPago2";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";

export default function CarritoCompra2() {
  const { carrito, actualizarTipo, removerDelCarrito, limpiarCarrito } = useCarrito();
  const [mostrarPago, setMostrarPago] = useState(false);
  const [visible, setVisible] = useState(false);
  const [autoSeleccionado, setAutoSeleccionado] = useState(null);
  const { usuarioActual } = useAuth();

  const calcularTotal = () =>
    carrito.reduce((acc, item) => {
      const monto = item.tipo === "reserva" ? item.precio * 0.1 : item.precio;
      return acc + monto;
    }, 0);

  const total = calcularTotal();

  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-10 px-4 space-y-6">
        {/* 🛒 Carrito */}
        <div className="bg-gray-200 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-blue-800 mb-6">Carrito de Compra</h2>

          {carrito.length === 0 ? (
            <p className="text-center text-gray-600">No hay vehículos en el carrito.</p>
          ) : (
            carrito.map((item) => (
              <div key={item.id} className="bg-gray-50 p-4 mb-4 rounded shadow-sm flex items-start gap-4">
                <img src={item.imagen} alt={item.modelo} className="w-28 h-28 object-cover rounded" />
                <div className="flex-1">
                  <h3 className="text-blue-900 font-bold">{item.marca} {item.modelo} ({item.ano})</h3>
                  <p className="text-sm text-gray-700">Transmisión: {item.transmision}</p>
                  <p className="text-sm text-gray-700">Estilo: {item.estilo}</p>
                  <p className="text-green-700 font-bold mt-1">Precio: ₡{Number(item.precio).toLocaleString()}</p>
                  <div className="mt-2 flex gap-4 text-sm">
                    <label>
                      <input type="radio" checked={item.tipo === "compra"} onChange={() => actualizarTipo(item.id, "compra")} className="mr-1" />
                      Compra total
                    </label>
                    <label>
                      <input type="radio" checked={item.tipo === "reserva"} onChange={() => actualizarTipo(item.id, "reserva")} className="mr-1" />
                      Reserva (10%)
                    </label>
                  </div>
                  <Button label="Ver detalles" icon="pi pi-info-circle" onClick={() => { setAutoSeleccionado(item); setVisible(true); }} className="mt-2" />
                  {visible && <AutoModal auto={autoSeleccionado} visible={visible} onHide={() => setVisible(false)} />}
                </div>
                <button onClick={() => removerDelCarrito(item.id)} className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700">
                  <i className="pi pi-trash" />
                </button>
              </div>
            ))
          )}

          {carrito.length > 0 && !mostrarPago && (
            <div className="text-right mt-6">
              <p className="text-lg font-bold text-blue-700">Total a pagar: ₡{total.toLocaleString()}</p>
              <button
                onClick={() => setMostrarPago(true)}
                className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              >
                Continuar con el pago
              </button>
            </div>
          )}
        </div>

        
        {carrito.length > 0 && mostrarPago && (
          <FormularioPago2
            carrito={carrito}
            clienteId={usuarioActual.id}
            onFinalizar={() => {
              setMostrarPago(false);
            }}
          />
        )}
      </div>
    </Layout>
  );
}
