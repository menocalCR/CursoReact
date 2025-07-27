import { useEffect } from "react";
import { useSucursales } from "../context/SucursalContext";

export function SucursalLoader() {
  const { setSucursales } = useSucursales();

  useEffect(() => {
    fetch("http://localhost:3001/sucursales")
      .then((res) => res.json())
      .then(setSucursales)
      .catch((err) => console.error("Error al cargar sucursales:", err));
  }, [setSucursales]);

  return null;
}
