import { useAutos } from "../context/AutosContext";
import { useMemo, useState } from "react";

export default function GraficoEstadisticasAutos({ children }) {
  const { autos } = useAutos();
  const [marcaFiltro, setMarcaFiltro] = useState("");
  const [anioFiltro, setAnioFiltro] = useState("");
  const [mesFiltro, setMesFiltro] = useState("");

  const autosFiltrados = useMemo(() => {
    return autos.filter((a) => {
      const fechaEntrega = new Date(a.fechaEntrega);
      const anio = fechaEntrega.getFullYear().toString();
      const mes = (fechaEntrega.getMonth() + 1).toString().padStart(2, "0");

      return (
        (!marcaFiltro || a.marca === marcaFiltro) &&
        (!anioFiltro || anio === anioFiltro) &&
        (!mesFiltro || mes === mesFiltro)
      );
    });
  }, [autos, marcaFiltro, anioFiltro, mesFiltro]);

  const marcas = [...new Set(autos.map((a) => a.marca))];
  const años = [...new Set(autos.map((a) => new Date(a.fechaEntrega).getFullYear().toString()))];
  const meses = [...new Set(autos.map((a) => (new Date(a.fechaEntrega).getMonth() + 1).toString().padStart(2, "0")))];

  return children({
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
  });
}
