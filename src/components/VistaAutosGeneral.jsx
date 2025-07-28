import React, { useContext } from "react";
import { AutosContext } from "../context/AutosContext";
import { Card } from "primereact/card";
import { Tag } from "primereact/tag";

const VistaAutosGeneral = () => {
  const { autosFiltradosPorCriterios } = useContext(AutosContext);

  return (
    <div className="grid p-4">
      {autosFiltradosPorCriterios.map((auto) => (
        <div className="col-12 md:col-6 lg:col-4" key={auto.id}>
          <Card title={`${auto.marca} ${auto.modelo}`} subTitle={`Año: ${auto.ano}`}>
            <p><strong>Combustible:</strong> {auto.combustible}</p>
            <Tag 
              value={auto.reservado ? "Reservado" : "Disponible"} 
              severity={auto.reservado ? "danger" : "success"} 
            />
          </Card>
        </div>
      ))}
    </div>
  );
};

export default VistaAutosGeneral;
