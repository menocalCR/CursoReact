import { useEffect } from "react";
import { useCarrito } from "../context/CarritoContext";
import { useAuth } from "../context/AuthContext";

export function CarritoLoader() {
  const { setCarrito, carrito, carritoId, setCarritoId } = useCarrito();
  const { usuarioActual } = useAuth();

  // 1️⃣ Cargar o crear el carrito
  useEffect(() => {
     console.log("✅ Carrito inicializado");
    if (usuarioActual) {
      fetch(`http://localhost:3001/carritos?userId=${Number(usuarioActual.id)}`)
        .then(res => res.json())
        .then(data => {
          if (data.length > 0) {
            console.log("Resultado al buscar carrito por userId:", data);
            setCarrito(data[0].items);
            setCarritoId(data[0].id);
          } else {
            fetch("http://localhost:3001/carritos", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId: Number(usuarioActual.id), items: [] })
                    })
                    .then(res => res.json())
                    .then(nuevo => {
                        console.log("🟢 Carrito creado correctamente:", nuevo);
                        setCarrito([]);
                        setCarritoId(nuevo.id);
                    })
                    .catch(err => console.error("❌ Error creando carrito:", err));

          }
        })
        .catch(err => console.error("Error al cargar el carrito:", err));
    }
  }, [usuarioActual, setCarrito, setCarritoId]);

  // 2️⃣ Sincronizar los cambios del carrito con la base
  useEffect(() => {
     console.log("✅ validacion de Carrito sincronizado");
    if (usuarioActual && carritoId !== null) {
      fetch(`http://localhost:3001/carritos/${carritoId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: carrito })
      }).catch(err => console.error("❌ Error al sincronizar carrito:", err));
      console.log("✅ Carrito sincronizado");
      
    }
  }, [carrito, carritoId, usuarioActual]);

  return null;
}
