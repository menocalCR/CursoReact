import { useCarrito } from "../context/CarritoContext";
import { useState } from "react";
import { Button } from "primereact/button";
import FormularioPago from "../components/FormularioPago";
import AutoModal from "../components/AutoModal"; 
import Layout from "../components/Layout";


export default function CarritoCompra() {
  const { carrito, actualizarTipo, removerDelCarrito } = useCarrito();
  const [mostrarPago, setMostrarPago] = useState(false);
  const [visible, setVisible] = useState(false);
  const [autoSeleccionado, setAutoSeleccionado] = useState(null);


  const calcularTotal = () =>
    carrito.reduce((acc, item) => {
      const monto = item.tipo === "reserva" ? Number(item.precio * 0.1) : Number(item.precio);
      return acc + monto;
    }, 0);

  return (
    <Layout>
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-blue-800">Carrito de Compra</h2>

      {carrito.length === 0 ? (
        <p className="text-center text-gray-600">No hay vehículos en el carrito.</p>
      ) : (
        carrito.map((item) => (
          <div key={item.id} className="flex items-center bg-white rounded-lg shadow p-5 mb-6 relative">
            <img
              src={item.imagen}
              alt={`${item.marca} ${item.modelo}`}
              className="w-[160px] h-[160px] object-cover rounded-lg mr-6"
            />

            {item.financiamiento && (
              <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded shadow">
                Financiamiento Disponible
              </span>
            )}

            <div className="flex-1">
              <h3 className="text-xl font-bold text-blue-900">{item.marca} {item.modelo}</h3>
              <p className="text-sm text-gray-700">Año: {item.ano}</p>
              <p className="text-sm text-gray-700">Kilometraje: {item.kilometraje}</p>
              <p className="text-sm text-gray-700">Transmisión: {item.transmision}</p>
              <p className="text-sm text-gray-700">Estilo: {item.estilo}</p>
              <p className="text-sm text-gray-700">Motor: {item.motor}</p>

              <p className="text-green-700 font-bold mt-2">
                Precio: ₡{Number(item.precio).toLocaleString()}
              </p>

              <div className="mt-3 space-x-6 text-sm">
                <label>
                  <input
                    type="radio"
                    name={`tipo-${item.id}`}
                    checked={item.tipo === "compra"}
                    disabled={item.financiamiento}
                    onChange={() => actualizarTipo(item.id, "compra")}
                    className="mr-2"
                  />
                  Compra total
                </label>
                <label>
                  <input
                    type="radio"
                    name={`tipo-${item.id}`}
                    checked={item.tipo === "reserva"}
                    onChange={() => actualizarTipo(item.id, "reserva")}
                    className="mr-2"
                  />
                  Reserva (10 %)
                </label>
              </div>
              <Button  label="Ver detalles"  icon="pi pi-info-circle"   onClick={() => {setAutoSeleccionado(item); setVisible(true); }}/>

              {visible && <AutoModal auto={autoSeleccionado} visible={visible} onHide={() => setVisible(false)} />}

            </div>

            <button
              onClick={() => removerDelCarrito(item.id)}
              className="ml-4 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-xs"
            >
              <i className="pi pi-trash" />
            </button>
          </div>
        ))
      )}

      {carrito.length > 0 && (
        <div className="text-right mt-6">
          <p className="text-lg font-bold text-blue-700">
            Total a pagar: ₡{Number(calcularTotal().toFixed(2)).toLocaleString()}
          </p>
          <button
            onClick={() => setMostrarPago(true)}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Continuar con el pago
          </button>
        </div>
      )}

      {mostrarPago && <FormularioPago total={calcularTotal()} />}
    </div>
    </Layout>
  );
}
