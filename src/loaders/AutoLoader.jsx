import { useEffect } from "react";
import { useAutos } from "../context/AutosContext";

export function AutoLoader() {
  const { setAutos } = useAutos();

  useEffect(() => {
    fetch("http://localhost:3001/autos")
      .then((res) => res.json())
      .then(setAutos)
      .catch((err) => console.error("Error al cargar los autos:", err));
  }, [setAutos]);

  return null; //no necesita retornar nada, unicamente carga o valores por medio del useAutos
}

export async function reservarAuto(id) {
  try {
    const res = await fetch(`http://localhost:3001/autos?id=${id}`);
    const data = await res.json();

    if (data.length === 0) {
      console.warn("❌ Auto no encontrado:", id);
      return false;
    }

    const autoId = data[0].id;

    const resultado = await fetch(`http://localhost:3001/autos/${autoId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reservado: true }),
    });

    if (resultado.ok) {
      console.log("✅ Auto reservado correctamente:", autoId);
      return true;
    } else {
      console.error("❌ Error al reservar:", resultado.status);
      return false;
    }
  } catch (err) {
    console.error("❌ Error general al reservar auto:", err);
    return false;
  }
}

