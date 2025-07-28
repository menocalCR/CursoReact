import { Dialog } from "primereact/dialog";
import { useState } from "react";

export default function FormularioAutoModal({ visible, onHide, onRegistrar }) {
  const [nuevoAuto, setNuevoAuto] = useState({
    imagen: "",
    modelo: "",
    marca: "",
    ano: "",
    financiamiento: false,
    precio: "",
    kilometraje: "",
    combustible: "",
    transmision: "",
    cilindrada: "",
    estilo: "",
    motor: "",
    valvulas: "",
    potencia: "",
    torque: "",
    direccion: "",
    frenos: "",
    neumaticos: "",
    capacidad: "",
    traccion: "",
    detalles: "",
    reservado: false,
    entregado: false,
    fechaEntrega: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let nuevoValor = type === "checkbox" ? checked : value;

    if (name === "financiamiento") {
      nuevoValor = value === "Sí";
    }

    setNuevoAuto((prev) => ({
      ...prev,
      [name]: nuevoValor
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onRegistrar(nuevoAuto);
    setNuevoAuto({ ...nuevoAuto, modelo: "", marca: "", imagen: "", precio: "" });
    onHide();
  };

  return (
    <Dialog
      header="Agregar vehículo al inventario"
      visible={visible}
      onHide={onHide}
      style={{ width: "95%", maxWidth: "800px" }}
      modal
      className="rounded-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="imagen" required value={nuevoAuto.imagen} onChange={handleChange} placeholder="URL de imagen" className="border rounded px-3 py-2 w-full shadow-sm" />
          <input name="modelo" required value={nuevoAuto.modelo} onChange={handleChange} placeholder="Modelo" className="border rounded px-3 py-2 w-full shadow-sm" />
          <input name="marca" required value={nuevoAuto.marca} onChange={handleChange} placeholder="Marca" className="border rounded px-3 py-2 w-full shadow-sm" />
          <input name="ano" required type="number" value={nuevoAuto.ano} onChange={handleChange} placeholder="Año" className="border rounded px-3 py-2 w-full shadow-sm" />
          <input name="precio" required value={nuevoAuto.precio} onChange={handleChange} placeholder="Precio ₡" className="border rounded px-3 py-2 w-full shadow-sm" />
          <input name="kilometraje" required value={nuevoAuto.kilometraje} onChange={handleChange} placeholder="Kilometraje" className="border rounded px-3 py-2 w-full shadow-sm" />
          <select name="combustible" required value={nuevoAuto.combustible} onChange={handleChange} className="border rounded px-3 py-2 w-full shadow-sm">
            <option value="">Tipo de combustible</option>
            <option value="Gasolina">Gasolina</option>
            <option value="Diesel">Diesel</option>
            <option value="Eléctrico">Eléctrico</option>
            <option value="Híbrido">Híbrido</option>
          </select>
          <input name="transmision" required value={nuevoAuto.transmision} onChange={handleChange} placeholder="Transmisión" className="border rounded px-3 py-2 w-full shadow-sm" />
          <input name="cilindrada" required value={nuevoAuto.cilindrada} onChange={handleChange} placeholder="Cilindrada" className="border rounded px-3 py-2 w-full shadow-sm" />
          <input name="estilo" required value={nuevoAuto.estilo} onChange={handleChange} placeholder="Estilo" className="border rounded px-3 py-2 w-full shadow-sm" />
          <input name="motor" required value={nuevoAuto.motor} onChange={handleChange} placeholder="Motor" className="border rounded px-3 py-2 w-full shadow-sm" />
          <input name="valvulas" required value={nuevoAuto.valvulas} onChange={handleChange} placeholder="Válvulas" className="border rounded px-3 py-2 w-full shadow-sm" />
          <input name="potencia" required value={nuevoAuto.potencia} onChange={handleChange} placeholder="Potencia" className="border rounded px-3 py-2 w-full shadow-sm" />
          <input name="torque" required value={nuevoAuto.torque} onChange={handleChange} placeholder="Torque" className="border rounded px-3 py-2 w-full shadow-sm" />
          <input name="direccion" required value={nuevoAuto.direccion} onChange={handleChange} placeholder="Dirección" className="border rounded px-3 py-2 w-full shadow-sm" />
          <input name="frenos" required value={nuevoAuto.frenos} onChange={handleChange} placeholder="Frenos" className="border rounded px-3 py-2 w-full shadow-sm" />
          <input name="neumaticos" required value={nuevoAuto.neumaticos} onChange={handleChange} placeholder="Neumáticos" className="border rounded px-3 py-2 w-full shadow-sm" />
          <input name="capacidad" required value={nuevoAuto.capacidad} onChange={handleChange} placeholder="Capacidad de tanque" className="border rounded px-3 py-2 w-full shadow-sm" />
          <input name="traccion" required value={nuevoAuto.traccion} onChange={handleChange} placeholder="Tracción" className="border rounded px-3 py-2 w-full shadow-sm" />
          <select name="financiamiento" required value={nuevoAuto.financiamiento ? "Sí" : "No"} onChange={handleChange} className="border rounded px-3 py-2 w-full shadow-sm">
            <option value="">¿Financiamiento disponible?</option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </select>
        </div>

        <textarea name="detalles" required value={nuevoAuto.detalles} onChange={handleChange} placeholder="Detalles del vehículo" className="border rounded px-3 py-2 w-full shadow-sm h-24" />

        <div className="text-center">
          <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">
            Registrar vehículo
          </button>
        </div>
      </form>
    </Dialog>
  );
}
