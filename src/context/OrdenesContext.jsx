// src/context/OrdenesContext.jsx
import { createContext, useContext, useState  } from "react";
import { crearOrden, obtenerOrdenesFusionadas  } from "../loaders/OrdenesLoader";

const OrdenesContext = createContext();

export function OrdenesProvider({ children }) {
const [ordenesFusionadas, setOrdenesFusionadas] = useState([]);

  const registrarOrden = async (orden) => {
    return await crearOrden(orden);
  };

   const cargarOrdenesFusionadas = async (clienteId) => {
    const fusionadas = await obtenerOrdenesFusionadas(clienteId);
    setOrdenesFusionadas(fusionadas);
  };

  return (
    <OrdenesContext.Provider value={{ ordenesFusionadas,
      registrarOrden,
      cargarOrdenesFusionadas, }}>
      {children}
    </OrdenesContext.Provider>
  );
}

export function useOrdenes() {
  const context = useContext(OrdenesContext);
  if (!context) throw new Error("useOrdenes debe usarse dentro de OrdenesProvider");
  return context;
}
