import { createContext, useContext, useState } from "react";

const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);
  const [carritoId, setCarritoId] = useState(null);

  const agregarAlCarrito = (auto) => {
  if (carrito.some(item => item.id === auto.id)) return;

  const tipo = auto.financiamiento ? "reserva" : "compra";
  const precio = Number(auto.precio);

  setCarrito(prev => [...prev, { ...auto, precio, tipo }]);
};

  const actualizarTipo = (id, nuevoTipo) => {
    setCarrito(prev =>
      prev.map(item => item.id === id ? { ...item, tipo: nuevoTipo } : item)
    );
  };

  const vaciarCarrito = () => setCarrito([]);

  const removerDelCarrito = (id) => {
  setCarrito(prev => prev.filter(item => item.id !== id));
};

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        setCarrito,
        carritoId,
        setCarritoId,
        agregarAlCarrito,
        actualizarTipo,
    removerDelCarrito,
        vaciarCarrito,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}




export function useCarrito() {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error("useCarrito debe usarse dentro de CarritoProvider");
  }
  return context;
}
