import { useEffect } from "react";
import { useAutos } from "../context/AutosContext";

export function AutoLoader() {
  const { setAutos } = useAutos();

  useEffect(() => {
    fetch("http://localhost:3001/autos")
      .then((res) => res.json())
      .then(setAutos)
      .catch((err) => console.error("Error al cargar autos:", err));
  }, [setAutos]);

  return null; //no necesita retornar nada, unicamente carga o valores por medio del useAutos
}
