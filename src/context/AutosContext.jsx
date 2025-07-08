import { createContext, useContext, useState } from "react";

const AutosContext = createContext();

export function AutosProvider({ children }) {
  const [autos, setAutos] = useState([]);
  const [filtros, setFiltros] = useState({
            modelo: "",
            marca: "",
            combustible: "",
            ano: "",
        });

 const autosFiltrados = autos.filter((auto) => {
  return (
    (filtros.modelo === "" || auto.modelo.toLowerCase().includes(filtros.modelo.toLowerCase())) &&
    (filtros.marca === "" || auto.modelo.toLowerCase().includes(filtros.marca.toLowerCase())) &&
    (filtros.combustible === "" || auto.combustible === filtros.combustible) &&
    (filtros.ano === "" || auto.ano.toString() === filtros.ano)
  );
});

  return (
    <AutosContext.Provider value={{ autos, setAutos, filtros, setFiltros, autosFiltrados }}>
      {children}
    </AutosContext.Provider>
  );
}

export function useAutos() {
  const context = useContext(AutosContext);
  if (!context) {
    throw new Error("useAutos debe usarse dentro de AutosProvider");
  }
  return context;
}

