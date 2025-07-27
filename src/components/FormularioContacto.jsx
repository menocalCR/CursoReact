import { useState } from "react";
import { useContacto } from "../context/ContactoContext"; // 👈 Asegurate que esté conectado

export default function FormularioContacto({ clienteId, onClose, refrescarCarrusel }) {
  const { registrarContacto } = useContacto();

  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    placa: "",
    identificacion: "",
    tipoIdentificacion: "Físico",
    consulta: "",
    aceptaPolitica: false,
  });

      const formatearTelefono = (valor) => {
      const limpio = valor.replace(/\D/g, "").slice(0, 12);
      if (limpio.startsWith("506")) {
        const cuerpo = limpio.slice(3);
        const parte1 = cuerpo.slice(0, 4);
        const parte2 = cuerpo.slice(4, 8);
        return `506 ${parte1}${parte2 ? "-" + parte2 : ""}`;
      } else {
        return limpio;
      }
    };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let nuevoValor = type === "checkbox" ? checked : value;
    if (name === "telefono") {
      nuevoValor = formatearTelefono(nuevoValor);
    }
    setFormData((prev) => ({
      ...prev,
      [name]: nuevoValor,
}));

  };

  const validarEmail = (correo) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones manuales
    if (!formData.nombre || !formData.apellidos || !formData.email || !formData.telefono || !formData.identificacion || !formData.consulta) {
      alert("Por favor, completa todos los campos requeridos.");
      return;
    }

    if (!validarEmail(formData.email)) {
      alert("El correo electrónico no es válido.");
      return;
    }

    if (!formData.aceptaPolitica) {
      alert("Debes aceptar la política de privacidad.");
      return;
    }




    const nuevoContacto = {
      ...formData,
      estado: "ingresado",
      clienteId: clienteId || "",
      atendidoPor: "",
      resolucion: "", 
      tipoCedula: formData.tipoIdentificacion,
      fechaIngreso: new Date().toISOString(),
    };

    const resultado = await registrarContacto(nuevoContacto);

    if (resultado) {
       if (!clienteId) {
          alert("¡Gracias por tu consulta! La hemos recibido y te responderemos pronto.");
          setFormData({
              nombre: "",
              apellidos: "",
              email: "",
              telefono: "",
              placa: "",
              identificacion: "",
              tipoIdentificacion: "Físico",
              consulta: "",
              aceptaPolitica: false,
            });
        }
      refrescarCarrusel?.(); 
      onClose?.();
    } else {
      alert("Ocurrió un error al enviar la consulta.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">¿Cómo podemos ayudarte?</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="nombre" required value={formData.nombre} onChange={handleChange} placeholder="Nombre" className="border rounded px-3 py-2 w-full shadow-sm" />
        <input name="apellidos" required value={formData.apellidos} onChange={handleChange} placeholder="Apellidos" className="border rounded px-3 py-2 w-full shadow-sm" />
        <input name="email" required type="email" value={formData.email} onChange={handleChange} placeholder="Email" className="border rounded px-3 py-2 w-full shadow-sm" />
        <input name="telefono" required value={formData.telefono} onChange={handleChange} placeholder="Teléfono" className="border rounded px-3 py-2 w-full shadow-sm" />
        <input name="placa" value={formData.placa} onChange={handleChange} placeholder="Placa" className="border rounded px-3 py-2 w-full shadow-sm" />
        <input name="identificacion" required value={formData.identificacion} onChange={handleChange} placeholder="Identificación" className="border rounded px-3 py-2 w-full shadow-sm" />
        <select name="tipoIdentificacion" required value={formData.tipoIdentificacion} onChange={handleChange} className="border rounded px-3 py-2 w-full shadow-sm">
          <option>Físico</option>
          <option>Jurídico</option>
          <option>DIMEX</option>
          <option>Cuerpo Diplomático</option>
        </select>
        <textarea name="consulta" required value={formData.consulta} onChange={handleChange} placeholder="Consulta" className="border rounded input md:col-span-2 h-24 shadow-sm" />
      </div>

      <div className="flex items-center mt-4">
        <input type="checkbox" name="aceptaPolitica" checked={formData.aceptaPolitica} onChange={handleChange} className="mr-2" />
        <label className="text-sm text-gray-700">
          He leído y acepto la <a href="/aviso-legal" className="text-blue-600 underline">política de privacidad</a>.
        </label>
      </div>

      <div className="text-center mt-6">
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
          Enviar
        </button>
      </div>
    </form>
  );
}
