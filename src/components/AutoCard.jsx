import React, { useState } from "react";
import { Card } from "primereact/card";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import AutoModal from "./AutoModal";
import { useAuth } from "../context/AuthContext";
import { useCarrito } from "../context/CarritoContext";


export default function AutoCard({ auto }) {
  const [visible, setVisible] = useState(false);
  const { usuarioActual } = useAuth();
  const { agregarAlCarrito } = useCarrito();

const agregar = () => {
  if (auto.reservado) {
    alert("Este vehículo ya ha sido reservado. No se puede agregar al carrito.");
    return;
  }
  agregarAlCarrito(auto);
  alert(`¡${auto.marca} ${auto.modelo} ${auto.ano} agregado al carrito!`);
};

  return (
    <>
      <Card
        title={`${auto.marca} ${auto.modelo} (${auto.ano})`}
        subTitle={auto.kilometraje}
        className="w-80 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl rounded-2xl shadow-md bg-white"
        header={
          <img
            alt={auto.modelo}
            src={auto.imagen}
            className="w-full h-48 object-cover rounded-t-2xl"
          />
        }
        footer={
          <div className="flex justify-between items-center mt-4">
            <Tag
              value={auto.financiamiento ? "Financiamiento disponible" : "Sin financiamiento"}
              severity={auto.financiamiento ? "success" : "warning"}
            />
            <Button
              label="Ver más"
              icon="pi pi-search"
              className="p-button-sm p-button-text text-blue-600"
              onClick={() => setVisible(true)}
            />
          </div>
        }
      >
       <div className="text-sm text-gray-800 space-y-1 mb-2">
        <p><strong>Combustible:</strong> {auto.combustible}</p>
        <p><strong>Transmisión:</strong> {auto.transmision}</p>
        <p><strong>Cilindrada:</strong> {auto.cilindrada}</p>
        </div>

        <p className="text-sm text-gray-700 line-clamp-3">{auto.detalles}</p>
          {usuarioActual?.rol === "compra" && (
                <div className="mt-4">
                  <button
                    onClick={agregar}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                  >
                    Agregar al carrito
                  </button>
                </div>
              )}
     
      </Card>

      <AutoModal visible={visible} onHide={() => setVisible(false)} auto={auto} />
    </>
  );
}
