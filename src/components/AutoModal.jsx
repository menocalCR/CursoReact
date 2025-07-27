import React from "react";
import { Dialog } from "primereact/dialog";

export default function AutoModal({ visible, onHide, auto }) {
  if (!auto) return null;

  return (
    <Dialog
      header={`${auto.marca} ${auto.modelo} (${auto.ano})`}
      visible={visible}
      style={{ width: "90%", maxWidth: "600px" }}
      onHide={onHide}
      modal
      className="rounded-xl"
    >
      <img
        src={auto.imagen}
        alt={auto.modelo}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <ul className="text-gray-700 space-y-2 text-sm">
        <li><strong>Kilometraje:</strong> {auto.kilometraje}</li>
        <li><strong>Financiamiento:</strong> {auto.financiamiento ? "Sí" : "No"}</li>
        <li><strong>Estilo:</strong> {auto.estilo}</li>
        <li><strong>Motor:</strong> {auto.motor}</li>
        <li><strong>Válvulas x cilindro:</strong> {auto.valvulas}</li>
        <li><strong>Potencia:</strong> {auto.potencia}</li>
        <li><strong>Torque:</strong> {auto.torque}</li>
        <li><strong>Dirección:</strong> {auto.direccion}</li>
        <li><strong>Frenos:</strong> {auto.frenos}</li>
        <li><strong>Neumáticos:</strong> {auto.neumaticos}"</li>
        <li><strong>Capacidad del tanque:</strong> {auto.capacidad}</li>
        <li><strong>Tracción:</strong> {auto.traccion}</li>
      </ul>
    </Dialog>
  );
}
