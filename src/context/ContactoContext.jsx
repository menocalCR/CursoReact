
import { createContext, useContext, useState } from "react";
import {
  crearContacto,
  obtenerContactosPorCliente,
  actualizarEstadoContacto,
  obtenerContactoPorId
} from "../loaders/ContactoLoader";

const ContactoContext = createContext();

export function ContactoProvider({ children }) {
  const [contactos, setContactos] = useState([]);
  const [detalleContacto, setDetalleContacto] = useState(null);

  const cargarDetalleContacto = async (id) => {
    const data = await obtenerContactoPorId(id);
    setDetalleContacto(data);
    return data;
  };

  const cargarContactosPorCliente = async (clienteId) => {
    const data = await obtenerContactosPorCliente(clienteId);
    setContactos(data);
  };

  const registrarContacto = async (nuevoContacto) => {
    const creado = await crearContacto(nuevoContacto);
    if (creado) await cargarContactosPorCliente(creado.clienteId);
    return creado;
  };

  const cambiarEstadoContacto = async (id, nuevoEstado) => {
    const actualizado = await actualizarEstadoContacto(id, nuevoEstado);
    if (actualizado) await cargarContactosPorCliente(actualizado.clienteId);
    return actualizado;
  };

  

  return (
    <ContactoContext.Provider value={{
      contactos,
      cargarContactosPorCliente,
      registrarContacto,
      cambiarEstadoContacto,
      detalleContacto,
      cargarDetalleContacto,
    }}>
      {children}
    </ContactoContext.Provider>
  );
}

export function useContacto() {
  const context = useContext(ContactoContext);
  if (!context) throw new Error("useContacto debe usarse dentro de ContactoProvider");
  return context;
}
