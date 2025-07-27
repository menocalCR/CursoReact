import { useEffect } from "react";
import { useTestimonios } from "../context/TestimoniosContext";

export function TestimoniosLoader() {
  const { setTestimonios, refreshKey, registrarCreacionTestimonio } = useTestimonios();

  useEffect(() => {
    fetch("http://localhost:3001/testimonios")
      .then((res) => res.json())
      .then(setTestimonios)
      .catch((err) => console.error("Error al cargar testimonios:", err));
  }, [refreshKey, setTestimonios]);

  useEffect(() => {
    registrarCreacionTestimonio(async (nuevoTestimonio) => {
      try {
        const res = await fetch("http://localhost:3001/testimonios", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nuevoTestimonio),
        });

        if (res.ok) {
          console.log("📝 Testimonio creado exitosamente.");
          setTimeout(() => window.dispatchEvent(new Event("refrescar-testimonios")), 100); // notificación global
          return true;
        } else {
          throw new Error("Error al crear testimonio");
        }
      } catch (err) {
        console.error("❌ Error en crearTestimonio:", err);
        return false;
      }
    });
  }, []);
  
  return null;
}
