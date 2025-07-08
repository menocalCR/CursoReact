import { useAutos } from "../context/AutosContext";

 function FiltroAutos() {
  const { filtros, setFiltros } = useAutos();

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      <input
        type="text"
        placeholder="Buscar modelo"
        value={filtros.modelo}
        onChange={(e) => setFiltros({ ...filtros, modelo: e.target.value })}
        className="px-4 py-2 rounded-md border border-gray-300 shadow-sm"
      />

      <input
        type="text"
        placeholder="Buscar marca"
        value={filtros.marca}
        onChange={(e) => setFiltros({ ...filtros, marca: e.target.value })}
        className="px-4 py-2 rounded-md border border-gray-300 shadow-sm"
      />

      <select
        value={filtros.combustible}
        onChange={(e) =>
          setFiltros({ ...filtros, combustible: e.target.value })
        }
        className="px-4 py-2 rounded-md border border-gray-300 shadow-sm"
      >
        <option value="">Combustible</option>
        <option value="Gasolina">Gasolina</option>
        <option value="Híbrido">Híbrido</option>
        <option value="Eléctrico">Eléctrico</option>
        <option value="Diesel">Diésel</option>
      </select>

      <input
        type="number"
        placeholder="Año"
        value={filtros.ano}
        onChange={(e) => setFiltros({ ...filtros, ano: e.target.value })}
        className="px-4 py-2 rounded-md border border-gray-300 shadow-sm w-28"
      />
    </div>
  );
}

export default FiltroAutos;
