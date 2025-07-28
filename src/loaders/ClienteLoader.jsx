import { useEffect } from "react";
import { useClientes } from "../context/ClienteContext";

export function ClienteLoader() {
  const { setClientes } = useClientes();

  useEffect(() => {
    fetch("http://localhost:3001/usuarios")
      .then((res) => res.json())
      .then((usuarios) => {
        const soloClientes = usuarios.filter((u) => u.rol === "compra");
        setClientes(soloClientes);
      })
      .catch((err) => console.error("Error al cargar los clientes:", err));
  }, [setClientes]);

  return null;
}

export function obtenerClientePorId(clientes, clienteId) {
  return clientes.find((c) => c.id === String(clienteId)) || null;
}

