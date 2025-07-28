
export async function crearContacto(contacto) {
  try {
    const res = await fetch("http://localhost:3001/contactos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contacto)
    });

    if (!res.ok) throw new Error("Error al crear contacto");
    return await res.json();
  } catch (err) {
    console.error("❌ Error creando contacto:", err);
    return null;
  }
}

export async function obtenerContactoPorId(id) {
  try {
    const res = await fetch(`http://localhost:3001/contactos/${id}`);
    if (!res.ok) throw new Error("Error obteniendo el contacto");
    return await res.json();
  } catch (err) {
    console.error("❌ Error cargando contacto por ID:", err);
    return null;
  }
}

export async function obtenerContactosPorCliente(clienteId) {
  try {
    const res = await fetch(`http://localhost:3001/contactos?clienteId=${clienteId}`);
    if (!res.ok) throw new Error("Error obteniendo contactos");
    return await res.json();
  } catch (err) {
    console.error("❌ Error cargando contactos:", err);
    return [];
  }
}

export async function actualizarEstadoContacto(id, nuevoEstado) {
  try {
    const res = await fetch(`http://localhost:3001/contactos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estado: nuevoEstado })
    });

    if (!res.ok) throw new Error("Error actualizando estado");
    return await res.json();
  } catch (err) {
    console.error("❌ Error al actualizar estado:", err);
    return null;
  }
}

export async function obtenerContactosIngresados() {
  try {
    const res = await fetch("http://localhost:3001/contactos?estado=ingresado");
    if (!res.ok) throw new Error("Error obteniendo contactos ingresados");
    return await res.json();
  } catch (err) {
    console.error("❌ Error cargando contactos ingresados:", err);
    return [];
  }
}

export async function actualizarContactoExtendido(id, nuevoEstado, atendidoPor, contactadoPor, resolucion, FecharResolucion) {
  try {
    const body = {
      estado: nuevoEstado,
      atendidoPor,
      contactadoPor,
      resolucion,
      FecharResolucion
    };

    const res = await fetch(`http://localhost:3001/contactos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (!res.ok) throw new Error("Error actualizando contacto");
    return await res.json();
  } catch (err) {
    console.error("❌ Error al actualizar contacto:", err);
    return null;
  }
}

export async function obtenerContactosResueltosHoy() {
  try {
    const hoy = new Date();
    const isoHoy = hoy.toISOString().split("T")[0]; // "2025-07-28"

    const res = await fetch("http://localhost:3001/contactos?estado_like=aprobado|rechazado");
    if (!res.ok) throw new Error("Error obteniendo contactos resueltos");

    const todos = await res.json();

    const filtrados = todos.filter(contacto => {
      if (!contacto.FecharResolucion) return false;
      const fechaResolucion = contacto.FecharResolucion.split("T")[0];
      return fechaResolucion === isoHoy;
    });

    return filtrados;
  } catch (err) {
    console.error("❌ Error cargando contactos resueltos hoy:", err);
    return [];
  }
}



