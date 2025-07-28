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

export async function marcarComoEntregado(id) {
  const fechaEntrega = new Date().toISOString(); // formato universal
  
  try {
    const res = await fetch(`http://localhost:3001/autos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        entregado: true,
        reservado: false,
        fechaEntrega: fechaEntrega,
      }),
    });

    if (!res.ok) throw new Error("Error al marcar como entregado");

    const actualizado = await res.json();
    console.log("✅ Vehículo entregado:", actualizado);
    return actualizado;
  } catch (err) {
    console.error("❌ Error en entrega:", err);
    return null;
  }
}


export async function modificarEstadoReservado(id, estado) {
  try {
    const res = await fetch(`http://localhost:3001/autos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reservado: estado }),
    });

    if (!res.ok) throw new Error("Error al actualizar reserva");

    const actualizado = await res.json();
    console.log("🔄 Estado actualizado:", actualizado);
    return actualizado;
  } catch (err) {
    console.error("❌ Error al modificar estado:", err);
    return null;
  }
}


