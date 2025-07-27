import { useEffect } from "react";
import { useUsuarios } from "../context/UsuarioContext";

export function UsuarioLoader() {
  const { setUsuarios } = useUsuarios();

  useEffect(() => {
    fetch("http://localhost:3001/usuarios")
      .then((res) => res.json())
      .then(setUsuarios)
      .catch((err) => console.error("Error al cargar los usuarios:", err));
  }, [setUsuarios]);

  return null;
}
