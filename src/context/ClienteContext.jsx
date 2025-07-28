import { createContext, useContext, useState } from "react";

const ClienteContext = createContext();

export function ClienteProvider({ children }) {
  const [clientes, setClientes] = useState([]);
  return (
    <ClienteContext.Provider value={{ clientes, setClientes }}>
      {children}
    </ClienteContext.Provider>
  );
}

export function useClientes() {
  const context = useContext(ClienteContext);
  if (!context) {
    throw new Error("useClientes debe usarse dentro de ClienteProvider");
  }
  return context;
}
