import { createContext, useContext, useState } from "react";
import { crearCita, obtenerCitasPorCliente, obtenerCitasPorFecha, actualizarEstadoCita as actualizarCitaBackend} from "../loaders/CitaLoader";

const CitaContext = createContext();

export function CitaProvider({ children }) {
  const [citas, setCitas] = useState([]);

  const cargarCitasPorCliente = async (clienteId) => {
    const data = await obtenerCitasPorCliente(clienteId);
    setCitas(data);
  };

  const registrarCita = async (nuevaCita) => {
    const cita = await crearCita(nuevaCita);
    if (cita) await cargarCitasPorCliente(cita.clienteId);
    return cita;
  };

  const obtenerHorasOcupadas = async (fecha) => {
    const ocupadas = await obtenerCitasPorFecha(fecha);
    return ocupadas;
  };

  const actualizarEstadoCita = async (idCita, nuevoEstado) => {
    const citaActualizada = await actualizarCitaBackend(idCita, nuevoEstado);
    if (citaActualizada) {
      await cargarCitasPorCliente(citaActualizada.clienteId);
    }
  };

  return (
    <CitaContext.Provider value={{
      citas,
      cargarCitasPorCliente,
      registrarCita,
      obtenerHorasOcupadas,
      actualizarEstadoCita
    }}>
      {children}
    </CitaContext.Provider>
  );
}



export const useCita = () => useContext(CitaContext);
