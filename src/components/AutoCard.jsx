import React, { useState } from "react";
import { Card } from "primereact/card";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import AutoModal from "./AutoModal";

export default function AutoCard({ auto }) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Card
        title={`${auto.modelo} (${auto.ano})`}
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
      </Card>

      <AutoModal visible={visible} onHide={() => setVisible(false)} auto={auto} />
    </>
  );
}
