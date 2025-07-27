import { createContext, useContext, useState } from "react";

const SucursalContext = createContext();

export function SucursalProvider({ children }) {
  const [sucursales, setSucursales] = useState([]);

  return (
    <SucursalContext.Provider value={{ sucursales, setSucursales }}>
      {children}
    </SucursalContext.Provider>
  );
}

export function useSucursales() {
  const context = useContext(SucursalContext);
  if (!context) throw new Error("useSucursales debe usarse dentro de SucursalProvider");
  return context;
}
