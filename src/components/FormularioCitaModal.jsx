import { useState, useEffect } from "react";
import { useCita } from "../context/CitaContext";
import { useSucursales } from "../context/SucursalContext";

export default function FormularioCitaModal({ clienteId, onClose }) {
  const { registrarCita, obtenerHorasOcupadas } = useCita();
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [tipo, setTipo] = useState("");
  const [detalleCliente, setDetalleCliente] = useState("");
  const [horasDisponibles, setHorasDisponibles] = useState([]);
  const { sucursales } = useSucursales();
  const [sucursalId, setSucursalId] = useState("");

  const mapaDias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

const obtenerRangoHorasValidas = (sucursal, fecha) => {
  if (!sucursal || !fecha || !sucursal.horarios) return [];

  const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const diaTexto = diasSemana[new Date(fecha).getDay()]; 

  const horario = sucursal.horarios[diaTexto];
  if (!horario || !horario.inicio || !horario.fin) return [];

  const todasLasHoras = [
    "07:00", "08:00", "09:00", "10:00", "11:00",
    "13:00", "14:00", "15:00", "16:00", "17:00"
  ];

  return todasLasHoras.filter(h => h >= horario.inicio && h <= horario.fin);
};


useEffect(() => {
  if (!fecha || !sucursalId || sucursales.length === 0) {
    setHorasDisponibles([]);
    return;
  }
  const cargarHoras = async () => {
    const ocupadasTodas = await obtenerHorasOcupadas(fecha);
    const ocupadasSucursal = ocupadasTodas.filter(cita => cita.sucursalId === sucursalId);
    const horasOcupadas = ocupadasSucursal.map(cita => cita.horaSolicitada);
    const sucursal = sucursales.find(s => s.id === sucursalId);
    const rango = obtenerRangoHorasValidas(sucursal, fecha);
    const disponibles = rango.filter(h => !horasOcupadas.includes(h));
    setHorasDisponibles(disponibles);
  };

  cargarHoras();
}, [fecha, sucursalId, sucursales]);




  const enviar = async () => {
    if (!fecha || !hora || !tipo) {
      alert("Debes completar la fecha, hora y tipo de cita.");
      return;
    }

    const nuevaCita = {
      clienteId,
      fechaSolicitada: fecha,
      horaSolicitada: hora,
      tipoCita: tipo,
      estado: "solicitada",
      idUsuarioAtiende: "",
      detalleCliente,
      detallesCita: "",
      sucursalId 
    };

    const resultado = await registrarCita(nuevaCita);
    if (resultado) onClose?.();
    else alert("Hubo un error al registrar la cita.");
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); enviar(); }} className="space-y-4 text-sm">
      <label className="block">
        Fecha:
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="w-full mt-1 px-3 py-2 border rounded"
        />
      </label>
      <label className="block">
        Sucursal:
        <select
          value={sucursalId}
          onChange={(e) => setSucursalId(e.target.value)}
          className="w-full mt-1 px-3 py-2 border rounded"
        >
          <option value="">-- Seleccioná sucursal --</option>
          {sucursales.map((s) => (
            <option key={s.id} value={s.id}>
              {s.nombre}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        Hora:
        <select
          value={hora}
          onChange={(e) => setHora(e.target.value)}
          className="w-full mt-1 px-3 py-2 border rounded"
          disabled={!fecha}
        >
          <option value="">-- Seleccioná hora --</option>
          {horasDisponibles.map((h) => (
            <option key={h} value={h}>{h}</option>
          ))}
        </select>
      </label>
      <label className="block">
        Tipo de cita:
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="w-full mt-1 px-3 py-2 border rounded"
        >
          <option value="">-- Seleccioná tipo --</option>
          <option value="revisión de vehículo en taller">Revisión de vehículo en taller</option>
          <option value="mantenimiento preventivo">Mantenimiento preventivo</option>
          <option value="exhibición de vehículo en sucursal">Exhibición de vehículo en sucursal</option>
          <option value="otro">Otro</option>
        </select>
      </label>

      <label className="block">
        Detalle adicional:
        <textarea
          value={detalleCliente}
          onChange={(e) => setDetalleCliente(e.target.value)}
          className="w-full mt-1 px-3 py-2 border rounded h-24"
          placeholder="Podés escribir alguna nota o requerimiento adicional"
        />
      </label>

      <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
        Confirmar cita
      </button>
    </form>
  );
}
