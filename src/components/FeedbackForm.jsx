import { useState } from "react";
import { useUsuarios } from "../context/UsuarioContext";
import { useTestimonios } from "../context/TestimoniosContext"; 

export default function FeedbackForm({ clienteId, auto, onClose }) {
  const { usuarios } = useUsuarios();
  const { dispararRecarga } = useTestimonios(); 
  const { crearTestimonio } = useTestimonios(); 
  const [mensaje, setMensaje] = useState("");
  const [estrellas, setEstrellas] = useState(5);
  const [enviando, setEnviando] = useState(false);

  const cliente = usuarios.find(u => Number(u.id) === Number(clienteId));
  const nombreCliente = cliente?.nombre || `Cliente #${clienteId}`;
  const infoAuto = `${auto.marca} ${auto.modelo} ${auto.ano}`;

  const enviar = async () => {
    if (!mensaje.trim()) return alert("El mensaje no puede estar vacío.");
    if (mensaje.length > 500) return alert("El mensaje no puede exceder los 500 caracteres.");
    setEnviando(true);

    const nuevoTestimonio = {
      idcliente: String(clienteId),
      idauto: auto.id,
      nombre: nombreCliente,
      mensaje,
      info: infoAuto,
      estrellas,
      fecha: new Date().toISOString(),
    };

    try {
      const res  = await crearTestimonio(nuevoTestimonio);
      
        dispararRecarga();
        alert("¡Gracias por tu opinión!");
        onClose();
    
    } catch (err) {
      console.error("Error al enviar testimonio:", err);
      alert("Ocurrió un problema al guardar tu opinión.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="space-y-4">
         <p className="text-sm text-gray-700">Vehículo: <strong>{infoAuto}</strong></p>
      <p className="text-sm text-gray-700">Cliente: <strong>{nombreCliente}</strong></p>

      <label className="block text-sm font-medium">Tu opinión (máx. 500 caracteres):</label>
      <textarea
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
        maxLength={500}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={4}
      />

      <label className="block text-sm font-medium">Calificación:</label>
      <select
        value={estrellas}
        onChange={(e) => setEstrellas(Number(e.target.value))}
        className="border border-gray-300 rounded px-3 py-2 w-32"
      >
        {[5, 4, 3, 2, 1].map((estrella) => (
          <option key={estrella} value={estrella}>{estrella} estrellas</option>
        ))}
      </select>

      <button
        onClick={enviar}
        disabled={enviando}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full"
      >
        {enviando ? "Enviando..." : "Enviar opinión"}
      </button>
    </div>
  );
}
