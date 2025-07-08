import React, { useState } from "react";
import { useAutos } from "./context/AutosContext";
import  FiltroAutos  from "./components/FiltroAutos";
import AutoPaginador from "./components/organisms/AutoPaginador";
import AutoAnimatePresence from "./components/organisms/AutoAnimatePresence";

 function App() {

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
    <div className="relative min-h-screen">
      {/* Fondo y overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed z-0"
        style={{ backgroundImage: "url('/images/fibra-carbon.jpg')" }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-70 z-10" />

      {/* Contenido */}
      <div className="relative z-20 p-6">
        <header className="text-center mb-10 text-white">
          <h1 className="text-4xl font-bold text-blue-400 drop-shadow-lg">Autos CR</h1>
          <p className="text-lg text-gray-300">Los mejores vehículos usados y seminuevos del país</p>
        </header>
        <FiltroAutos />
        <AutoAnimatePresence first ={first} slideVariants={slideVariants} autosPaginados={autosPaginados}>        
        </AutoAnimatePresence>
       {/* <div className="flex flex-wrap justify-center gap-6">
          <AnimatePresence mode="wait">
            <motion.div
                key={first} // cambia en cada página
                variants={slideVariants}//animacion
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-wrap justify-center gap-6"
              >
                {autosPaginados.map((auto) => (<AutoCard key={auto.id} auto={auto} /> ))}
            </motion.div>
          </AnimatePresence>
       </div>*/}

      {/* paginator */}
        <AutoPaginador first ={first} rows={rows} autosFiltrados = {autosFiltrados} onPageChange={onPageChange}></AutoPaginador>
      </div>
    </div>
  );
}
export default App;