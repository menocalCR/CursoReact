export async function crearCita(cita) {
  try {
    const res = await fetch("http://localhost:3001/citas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cita)
    });
    if (!res.ok) throw new Error("Error al crear cita");
    return await res.json();
  } catch (err) {
    console.error("❌ Error creando cita:", err);
    return null;
  }
}

export async function obtenerCitasPorCliente(clienteId) {
  try {
    const res = await fetch(`http://localhost:3001/citas?clienteId=${clienteId}`);
    if (!res.ok) throw new Error("Error obteniendo citas");
    return await res.json();
  } catch (err) {
    console.error("❌ Error cargando citas:", err);
    return [];
  }
}

export async function obtenerCitasPorFecha(fechaSolicitada) {
  try {
    const res = await fetch(`http://localhost:3001/citas?fechaSolicitada=${fechaSolicitada}`);
    if (!res.ok) throw new Error("Error consultando horarios ocupados");
    return await res.json(); 
  } catch (err) {
    console.error("❌ Error al consultar fecha:", err);
    return [];
  }
}

export async function actualizarEstadoCita(idCita, nuevoEstado) {
  try {
    const res = await fetch(`http://localhost:3001/citas/${idCita}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estado: nuevoEstado })
    });
    if (!res.ok) throw new Error("Error actualizando cita");
    return await res.json();
  } catch (err) {
    console.error("❌ Error actualizando estado de cita:", err);
    return null;
  }
}


