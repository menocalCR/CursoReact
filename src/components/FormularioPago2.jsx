import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { FaCcVisa, FaCcMastercard, FaCcPaypal, FaApplePay } from "react-icons/fa";
import { useOrdenes } from "../context/OrdenesContext";
import { useAutos } from "../context/AutosContext";
import { useAuth } from "../context/AuthContext";
import { useCarrito } from "../context/CarritoContext";
import MensajeModal from "./MensajeModal";



  function formatearTelefono(valor) {
  const limpio = valor.replace(/\D/g, "");
  if (limpio.length <= 3) return limpio;
  if (limpio.length <= 7) return limpio.slice(0, 3) + " " + limpio.slice(3);
  return limpio.slice(0, 3) + " " + limpio.slice(3, 7) + "-" + limpio.slice(7, 11);
}

function formatearTarjeta(valor) {
  const limpio = valor.replace(/\D/g, "").slice(0, 16);
  return limpio.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

export default function FormularioPago2({ carrito, clienteId, onFinalizar }) {
  const [datos, setDatos] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
    tarjeta: "",
    tipoTarjeta: "visa",
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [procesando, setProcesando] = useState(false);
  const { registrarOrden } = useOrdenes();
  const { reservarAuto } = useAutos();
  const [errores, setErrores] = useState({});
  const { usuarioActual } = useAuth();
  const { vaciarCarrito } = useCarrito();
  const [completado, setCompletado] = useState(false);
  const navigate = useNavigate();

  const total = carrito.reduce((acc, item) => {
    const monto = item.tipo === "reserva" ? item.precio * 0.1 : item.precio;
    return acc + monto;
  }, 0);

  const subtotal = Number((total / 1.13).toFixed(2));
  const impuesto = Number((total - subtotal).toFixed(2));
  const handleChange = (e) => {
    const { name, value } = e.target;
    let formateado = value;
  if (name === "telefono") formateado = formatearTelefono(value);
  if (name === "tarjeta") formateado = formatearTarjeta(value);
    setDatos((prev) => ({ ...prev, [name]: formateado }));
  };

  const validar = () => {
    const nuevosErrores = {};
    if (!datos.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio.";
    if (!datos.telefono.match(/^506\s\d{4}-\d{4}$/)) nuevosErrores.telefono = "Formato: 506 xxxx-xxxx";
    if (!datos.direccion.trim()) nuevosErrores.direccion = "La dirección es obligatoria.";
    if (!datos.tarjeta.match(/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/)) nuevosErrores.tarjeta = "Debe tener 16 dígitos.";
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

 const guardarOrden = async () => {
  for (const item of carrito) {
    const orden = {
      autoId: item.id,
      clienteId: usuarioActual.id,
      tipo: item.tipo,
      estado: item.tipo === "reserva" ? "reservado" : "comprado",
      fecha: new Date().toISOString(),
      montoPagado: item.tipo === "reserva" ? item.precio * 0.1 : item.precio,
      datosCliente: {
        nombre: datos.nombre,
        telefono: datos.telefono,
        direccion: datos.direccion,
        tarjeta: datos.tarjeta,
      }
    };
    await registrarOrden(orden);
    await reservarAuto(item.id);
  }
};


  const enviar = async () => {
    if (!validar()) return;

    try {
      setProcesando(true);
      await new Promise(res => setTimeout(res, 5000));
      await guardarOrden();
      setModalVisible(true);
      await new Promise(res => setTimeout(res, 6000));
      vaciarCarrito();
      setCompletado(true);
      onFinalizar();
      setTimeout(() => navigate('/panel-cliente'), 100); 
    } catch (error) {
      console.error("Error al guardar la orden:", error);
      alert("Error al procesar la compra.");
      setProcesando(false);
    }
  };

  return (
    
    <div className="bg-gray-200 p-6 rounded-lg shadow-md">
        <MensajeModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        titulo="Orden registrada"
        mensaje="Tu orden se ha enviado correctamente. Te contactaremos pronto."
      />
      <h3 className="text-xl font-bold text-blue-700 mb-4">Datos de Pago</h3>

      <div className="flex gap-4 mb-2 text-3xl text-gray-400">
        <FaCcVisa className={datos.tipoTarjeta === "visa" ? "text-blue-600" : ""} />
        <FaCcMastercard className={datos.tipoTarjeta === "mastercard" ? "text-red-600" : ""} />
        <FaCcPaypal className={datos.tipoTarjeta === "paypal" ? "text-blue-400" : ""} />
        <FaApplePay className={datos.tipoTarjeta === "applepay" ? "text-black" : ""} />
      </div>

      <select
        name="tipoTarjeta"
        value={datos.tipoTarjeta}
        onChange={handleChange}
        className="w-full mb-4 border rounded px-3 py-2"
      >
        <option value="visa">Visa</option>
        <option value="mastercard">MasterCard</option>
        <option value="paypal">PayPal</option>
        <option value="applepay">Apple Pay</option>
      </select>

      <input name="nombre" placeholder="Nombre" value={datos.nombre} onChange={handleChange}
        className="w-full mb-2 border rounded px-3 py-2" />
      {errores.nombre && <p className="text-red-500 text-xs mb-2">{errores.nombre}</p>}

      <input name="telefono" placeholder="Teléfono (506 xxxx-xxxx)" value={datos.telefono} onChange={handleChange}
        className="w-full mb-2 border rounded px-3 py-2" />
      {errores.telefono && <p className="text-red-500 text-xs mb-2">{errores.telefono}</p>}

      <input name="direccion" placeholder="Dirección" value={datos.direccion} onChange={handleChange}
        className="w-full mb-2 border rounded px-3 py-2" />
      {errores.direccion && <p className="text-red-500 text-xs mb-2">{errores.direccion}</p>}

      <input name="tarjeta" placeholder="Número de tarjeta" value={datos.tarjeta} onChange={handleChange}
        className="w-full mb-2 border rounded px-3 py-2" />
      {errores.tarjeta && <p className="text-red-500 text-xs mb-2">{errores.tarjeta}</p>}

      <div className="mt-6 border-t pt-4 text-sm space-y-2">
        <p><strong>Subtotal:</strong> ₡{subtotal.toLocaleString()}</p>
        <p><strong>Impuestos (13%):</strong> ₡{impuesto.toLocaleString()}</p>
        <p className="text-lg font-bold text-blue-700">
          <strong>Total:</strong> ₡{total.toLocaleString()}
        </p>
      </div>
{procesando ? (
  <div className="mt-6 flex justify-center items-center">
    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    <span className="ml-3 text-blue-700 font-medium text-sm">Procesando orden...</span>
  </div>
) : (
 
  <button
    onClick={enviar}
    disabled={procesando}
    className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
  >
    Confirmar compra
  </button> 
)}

    </div>
  );
}
