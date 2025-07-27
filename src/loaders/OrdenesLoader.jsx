
export async function crearOrden(orden) {
  try {
    const res = await fetch("http://localhost:3001/ordenes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orden),
    });

    if (!res.ok) throw new Error(`Error creando orden: ${res.status}`);
    const data = await res.json();
    console.log("✅ Orden creada:", data);
    return data;
  } catch (err) {
    console.error("❌ Error en crearOrden:", err);
    return null;
  }
}

export async function obtenerOrdenesFusionadas(clienteId) {
  try {
    const [ordenes, autos, testimonios] = await Promise.all([
      fetch(`http://localhost:3001/ordenes?clienteId=${clienteId}`).then(res => res.json()),
      fetch(`http://localhost:3001/autos`).then(res => res.json()),
      fetch(`http://localhost:3001/testimonios?idcliente=${clienteId}`).then(res => res.json()),
    ]);

    const fusionadas = ordenes.map((orden) => {
      const auto = autos.find((a) => Number(a.id) === Number(orden.autoId));
      const yaOpinado = testimonios.some(
        (test) => Number(test.idauto) === Number(orden.autoId) &&
                  Number(test.idcliente) === Number(clienteId)
      );
      return {
        ...orden,
        auto: auto || {},
        yaOpinado,
      };
    });

    return fusionadas;
  } catch (err) {
    console.error("❌ Error cargando órdenes fusionadas:", err);
    return [];
  }
}

