
import { createContext, useContext, useState } from "react";
import {
  crearContacto,
  obtenerContactosPorCliente,
  actualizarEstadoContacto,
  obtenerContactoPorId,
  obtenerContactosIngresados,
  actualizarContactoExtendido
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

  const cargarContactosIngresados = async () => {
  const data = await obtenerContactosIngresados();
  setContactos(data); // Asume que mostrás todos en el estado global
  return data;
};

const actualizarContacto = async (id, datos) => {
  const actualizado = await actualizarContactoExtendido(
    id,
    datos.estado,
    datos.atendidoPor,
    datos.contactadoPor,
    datos.resolucion,
    datos.FecharResolucion
  );

  if (actualizado) {
    await cargarContactosIngresados();
  }

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
      cargarContactosIngresados,
      actualizarContacto
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
