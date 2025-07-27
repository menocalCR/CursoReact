import { createContext, useContext, useState, useRef, useEffect } from "react";

const TestimoniosContext = createContext();

export function useTestimonios() {
  return useContext(TestimoniosContext);
}

export function TestimoniosProvider({ children }) {
  const [testimonios, setTestimonios] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const crearTestimonioRef = useRef(null); // 👈 Almacenamos la función real aquí

  const dispararRecarga = () => {
    console.log("dispararRecarga ejecutado, refreshKey antes:", refreshKey);
    setRefreshKey(prev => {
      const nuevo = prev + 1;
      console.log("✅ refreshKey actualizado a:", nuevo);
      return nuevo;
    });
  };

  const registrarCreacionTestimonio = (fn) => {
    crearTestimonioRef.current = fn;
  };

  const crearTestimonio = async (testimonio) => {
    if (typeof crearTestimonioRef.current === "function") {
      const resultado = await crearTestimonioRef.current(testimonio);
      if (resultado) dispararRecarga(); // 👈 actualiza si tuvo éxito
      return resultado;
    } else {
      console.error("❗ crearTestimonio no está disponible.");
      return false;
    }
  };

  // Escucha global para refrescar desde afuera (como fallback)
  useEffect(() => {
    const handler = () => dispararRecarga();
    window.addEventListener("refrescar-testimonios", handler);
    return () => window.removeEventListener("refrescar-testimonios", handler);
  }, []);

  return (
    <TestimoniosContext.Provider value={{
      testimonios,
      setTestimonios,
      refreshKey,
      dispararRecarga,
      crearTestimonio,
      registrarCreacionTestimonio
    }}>
      {children}
    </TestimoniosContext.Provider>
  );
}
