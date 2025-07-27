import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuarioActual, setUsuarioActual] = useState(null);

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const guardado = localStorage.getItem("usuarioActual");
    if (guardado) {
      setUsuarioActual(JSON.parse(guardado));
    }
  }, []);

  // Guardar usuario en localStorage cuando cambia
  useEffect(() => {
    if (usuarioActual) {
      localStorage.setItem("usuarioActual", JSON.stringify(usuarioActual));
    } else {
      localStorage.removeItem("usuarioActual");
    }
  }, [usuarioActual]);

  return (
    <AuthContext.Provider value={{ usuarioActual, setUsuarioActual }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
}

