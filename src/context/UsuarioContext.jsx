import { createContext, useContext, useState } from "react";

const UsuarioContext = createContext();

export function UsuarioProvider({ children }) {
  const [usuarios, setUsuarios] = useState([]);

  return (
    <UsuarioContext.Provider value={{ usuarios, setUsuarios }}>
      {children}
    </UsuarioContext.Provider>
  );
}

export function useUsuarios() {
  const context = useContext(UsuarioContext);
  if (!context) {
    throw new Error("useUsuarios debe usarse dentro de UsuarioProvider");
  }
  return context;
}
