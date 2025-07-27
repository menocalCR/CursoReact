import React, { useState } from "react";
import AutoPaginador from "../components/organisms/AutoPaginador";
import { useAutos } from "../context/AutosContext";
import AutoAnimatePresence from "../components/organisms/AutoAnimatePresence";
import FiltroAutos from "../components/FiltroAutos";
import Layout from "../components/Layout";

export default function AutosUsados() {
  const { autosFiltrados } = useAutos(); //variable para asignacion de los autos obtenidos desde el context
  const [first, setFirst] = useState(0);//variable para la paginacion
  const rows = 4 ;
  //VAriables para la paginacion
  const autosPaginados = autosFiltrados.slice(first, first + rows);
  const onPageChange = (e) => setFirst(e.first);

  const slideVariants = { //configuracion de slide para animacion 
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration: 0.4 } },
    exit: { x: -100, opacity: 0, transition: { duration: 0.3 } },
  };
  return (
    <Layout>
        {/* Contenido */}
        <div className="relative z-20 p-6">
            <header className="text-center mb-10 text-white">
            <h1 className="text-4xl font-bold text-blue-400 drop-shadow-lg">Autos CR</h1>
            <p className="text-lg text-gray-300">Los mejores vehículos usados y seminuevos del país</p>
            </header>
            <FiltroAutos />
            <AutoAnimatePresence first ={first} slideVariants={slideVariants} autosPaginados={autosPaginados}>        
            </AutoAnimatePresence>
        {/* paginator */}
            <AutoPaginador first ={first} rows={rows} autosFiltrados = {autosFiltrados} onPageChange={onPageChange}></AutoPaginador>
        </div>
    </Layout> 
  );
}
