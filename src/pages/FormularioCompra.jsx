import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useCarrito } from "../context/CarritoContext"

export default function FormularioCompra() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { usuarioActual } = useAuth();
  const { auto, tipo } = state || {};
  const [procesando, setProcesando] = useState(false);
  const [completado, setCompletado] = useState(false);
  const [notificacion, setNotificacion] = useState("");
  const [datos, setDatos] = useState({
    nombre: "",
    tarjeta: "",
    direccion: "",
    telefono: "",
  });

  const { vaciarCarrito } = useCarrito();

  const [errores, setErrores] = useState({});

  const monto = auto?.precio
  ? tipo === "reserva"
    ? auto.precio * 0.1
    : auto.precio
  : 0;


  const handleChange = (e) =>
    setDatos({ ...datos, [e.target.name]: e.target.value });

  const validar = () => {
    const nuevo = {};
    if (!datos.nombre) nuevo.nombre = "Nombre requerido";
    if (!datos.tarjeta || datos.tarjeta.length < 12) nuevo.tarjeta = "Tarjeta inválida";
    if (!datos.direccion) nuevo.direccion = "Dirección requerida";
    if (!datos.telefono) nuevo.telefono = "Teléfono requerido";
    setErrores(nuevo);
    return Object.keys(nuevo).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validar()) return;

    setProcesando(true);

    setTimeout(() => {
      const orden = {
        autoId: auto.id,
        clienteId: usuarioActual.id,
        tipo,
        estado: tipo === "reserva" ? "reservado" : "comprado",
        datosCliente: datos,
        fecha: new Date().toISOString(),
        montoPagado: monto,
      };

try {
      fetch("http://localhost:3001/ordenes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orden),
      }).then(() => {
        vaciarCarrito();
        setProcesando(false);
        setCompletado(true);
        setNotificacion(`📩 ¡Gracias ${datos.nombre}! Te enviamos la confirmación de la ${tipo} a tu correo.`);
      });
      console.log("🔄 Actualizando inventario del auto:", auto.id);
        fetch(`http://localhost:3001/autos/${auto.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reservado: true })
        });
      } catch (err) {
            console.error("❌ Error sincronizando carrito:", err);
          }

          }, 3000);
        };

  if (!auto || !usuarioActual) return <p>Datos no disponibles</p>;

  if (completado) {
    const ultimos = datos.tarjeta.slice(-4);
    return (
      <div className="max-w-xl mx-auto mt-10 bg-white rounded-lg shadow text-center p-6 text-blue-800 animate-fade-in">
        <h2 className="text-3xl font-bold mb-4">🎉 ¡Felicidades!</h2>
        <p className="text-lg mb-2">
          {tipo === "compra"
            ? `Ahora sos el dueño del ${auto.modelo} ${auto.ano}.`
            : `Reservaste el ${auto.marca} ${auto.modelo} con éxito. Presentate en la sucursal principal para completar tu compra.`}
        </p>
        <p className="text-sm mt-4 text-blue-600">{notificacion}</p>
        <p className="text-xs mt-1">Pago realizado con la tarjeta **** **** **** {ultimos}</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">
        {tipo === "reserva" ? "Reservar Vehículo" : "Comprar Vehículo"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            name="nombre"
            placeholder="Nombre del tarjetahabiente"
            value={datos.nombre}
            onChange={handleChange}
            className="input-field"
          />
          {errores.nombre && <p className="text-red-500 text-sm">{errores.nombre}</p>}
        </div>
        <div>
          <input
            name="tarjeta"
            placeholder="Número de tarjeta"
            value={datos.tarjeta}
            onChange={handleChange}
            className="input-field"
            maxLength={16}
          />
          {errores.tarjeta && <p className="text-red-500 text-sm">{errores.tarjeta}</p>}
        </div>
        <div>
          <input
            name="direccion"
            placeholder="Dirección"
            value={datos.direccion}
            onChange={handleChange}
            className="input-field"
          />
          {errores.direccion && <p className="text-red-500 text-sm">{errores.direccion}</p>}
        </div>
        <div>
          <input
            name="telefono"
            placeholder="Teléfono"
            value={datos.telefono}
            onChange={handleChange}
            className="input-field"
          />
          {errores.telefono && <p className="text-red-500 text-sm">{errores.telefono}</p>}
        </div>
        <p className="font-semibold text-blue-700">
          Monto a pagar: <span className="text-black">${monto.toFixed(2)}</span>
        </p>
        <button
          type="submit"
          disabled={procesando}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full transition"
        >
          {procesando ? "Procesando pago..." : "Confirmar y pagar"}
        </button>
      </form>
    </div>
  );
}
