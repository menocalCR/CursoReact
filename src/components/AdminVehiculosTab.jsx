import { useState } from "react";
import { useAutos } from "../context/AutosContext";
import AutoModal from "./AutoModal";
import GraficoDisponibilidad from "../graphics/GraficoDisponibilidad";
import GraficoEstadisticasVehiculos from "../graphics/GraficoEstadisticasVehiculos";
import GraficoEstadisticasAutos from "../graphics/GraficoEstadisticasAutos";
import GraficoVehiculosPanel from "../graphics/GraficoVehiculosPanel";

export default function AdminVehiculosTab() {
  const {
    autosFiltradosPorCriterios,
    setAutos,
    filtros,
    setFiltros,
    marcarComoEntregado,
    modificarEstadoReservado,
  } = useAutos();

  const [autoSeleccionado, setAutoSeleccionado] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [pagina, setPagina] = useState(0);

  const porPagina = 6;
  const totalPaginas = Math.ceil(autosFiltradosPorCriterios.length / porPagina);
  const autosVisibles = autosFiltradosPorCriterios.slice(
    pagina * porPagina,
    (pagina + 1) * porPagina
  );

  const abrirModal = (auto) => {
    setAutoSeleccionado(auto);
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setAutoSeleccionado(null);
    setModalVisible(false);
  };

  const cambiarEstadoReservado = async (id, estado) => {
    const actualizado = await modificarEstadoReservado(id, estado);
    if (actualizado) {
      setAutos((prev) =>
        prev.map((a) => (a.id === id ? actualizado : a))
      );
    }
  };

  const entregarVehiculo = async (id) => {
    const actualizado = await marcarComoEntregado(id);
    if (actualizado) {
      setAutos((prev) =>
        prev.map((a) => (a.id === id ? actualizado : a))
      );
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-gray-100 shadow-md p-6 rounded-lg mb-10">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
        Administración de vehículos
      </h2>

      {/* 🔍 Filtros */}
      <section className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h3 className="text-xl text-gray-800 font-semibold mb-4 text-center">
          Filtrar vehículos
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <input
            value={filtros.modelo}
            onChange={(e) => setFiltros((prev) => ({ ...prev, modelo: e.target.value }))}
            placeholder="Modelo"
            className="border rounded px-3 py-2 w-full shadow-sm"
          />
          <input
            value={filtros.marca}
            onChange={(e) => setFiltros((prev) => ({ ...prev, marca: e.target.value }))}
            placeholder="Marca"
            className="border rounded px-3 py-2 w-full shadow-sm"
          />
          <select
            value={filtros.combustible}
            onChange={(e) => setFiltros((prev) => ({ ...prev, combustible: e.target.value }))}
            className="border rounded px-3 py-2 w-full shadow-sm"
          >
            <option value="">Combustible</option>
            <option value="Gasolina">Gasolina</option>
            <option value="Diesel">Diesel</option>
            <option value="Eléctrico">Eléctrico</option>
          </select>
          <input
            value={filtros.ano}
            onChange={(e) => setFiltros((prev) => ({ ...prev, ano: e.target.value }))}
            placeholder="Año"
            className="border rounded px-3 py-2 w-full shadow-sm"
          />
          <select
            value={filtros.disponibilidad}
            onChange={(e) => setFiltros((prev) => ({ ...prev, disponibilidad: e.target.value }))}
            className="border rounded px-3 py-2 w-full shadow-sm"
          >
            <option value="">Todos</option>
            <option value="disponibles">Disponibles</option>
            <option value="reservados">Reservados</option>
            <option value="entregados">Entregados</option>
          </select>
        </div>
      </section>

      {/* 🚘 Cards paginadas */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {autosVisibles.map((auto) => (
          <div key={auto.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
            <img
              src={auto.imagen}
              alt={`${auto.marca} ${auto.modelo}`}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-sm flex-1">
              <h3 className="text-blue-700 font-semibold text-lg mb-2">
                {auto.marca} {auto.modelo} ({auto.ano})
              </h3>
              <p><strong>Precio:</strong> ₡{auto.precio}</p>
              <p><strong>Kilometraje:</strong> {auto.kilometraje}</p>
              <p><strong>Transmisión:</strong> {auto.transmision}</p>
              <p>
                <strong>Estado:</strong>{" "}
                {auto.entregado
                  ? "Entregado"
                  : auto.reservado
                  ? "Reservado"
                  : "Disponible"}
              </p>
            </div>
            <div className="px-4 pb-4 flex flex-col gap-2">
              <button
                onClick={() => abrirModal(auto)}
                className="w-full bg-gray-200 text-blue-700 py-2 rounded hover:bg-blue-100 transition"
              >
                Ver detalles
              </button>

              {!auto.entregado && (
                <button
                  onClick={() =>
                    cambiarEstadoReservado(auto.id, !auto.reservado)
                  }
                  className={`w-full py-2 rounded transition ${
                    auto.reservado
                      ? "bg-red-600 text-white hover:bg-red-700"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  {auto.reservado ? "Marcar como disponible" : "Marcar como reservado"}
                </button>
              )}

              {!auto.entregado && auto.reservado && (
                <button
                  onClick={() => entregarVehiculo(auto.id)}
                  className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition"
                >
                  Marcar como entregado
                </button>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* 🔄 Paginación */}
      {totalPaginas > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPaginas }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPagina(i)}
              className={`px-3 py-1 rounded text-sm ${
                i === pagina ? "bg-blue-600 text-white" : "bg-gray-200 text-blue-700"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* 📋 Modal de detalle */}
      <AutoModal
        visible={modalVisible}
        onHide={cerrarModal}
        auto={autoSeleccionado}
      />
      <GraficoDisponibilidad />
      
        <GraficoEstadisticasAutos >
        {({
            autosFiltrados,
            marcaFiltro,
            setMarcaFiltro,
            anioFiltro,
            setAnioFiltro,
            mesFiltro,
            setMesFiltro,
            marcas,
            años,
            meses,
        }) => (
            <>
            {/* Interfaz de filtros */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Marca */}
                <select value={marcaFiltro} onChange={(e) => setMarcaFiltro(e.target.value)} className="form-select">
                <option value="">Todas las marcas</option>
                {marcas.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
                {/* Año */}
                <select value={anioFiltro} onChange={(e) => setAnioFiltro(e.target.value)} className="form-select">
                <option value="">Todos los años</option>
                {años.map((a) => <option key={a} value={a}>{a}</option>)}
                </select>
                {/* Mes */}
                <select value={mesFiltro} onChange={(e) => setMesFiltro(e.target.value)} className="form-select">
                <option value="">Todos los meses</option>
                {meses.map((m) => <option key={m} value={m}>Mes {m}</option>)}
                </select>
            </div>

            {/* Y acá podés usar autosFiltrados para tus gráficos */}
            <GraficoVehiculosPanel autos={autosFiltrados} />
             </>
        )}
        </GraficoEstadisticasAutos >

    </div>
  );
}
