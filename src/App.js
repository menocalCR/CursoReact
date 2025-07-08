import React, { useState, useEffect } from "react";
import { Paginator } from "primereact/paginator";
import  AutoCard from "./components/AutoCard";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const slideVariants = { //configuracion de slide para animacion 
  initial: { x: 100, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { duration: 0.4 } },
  exit: { x: -100, opacity: 0, transition: { duration: 0.3 } },
};

  const [autos, setAutos] = useState([]); //variable para asignacion de los autos
  const [first, setFirst] = useState(0);//variable para la paginacion
  const rows = 8;

 {/* consulta de registros por medio de API */}
  useEffect(() => {
    fetch("http://localhost:3001/autos")
      .then((res) => res.json())
      .then((data) => setAutos(data))
      .catch((err) => console.error("Error al cargar autos:", err));
  }, []);

  const autosPaginados = autos.slice(first, first + rows);
  const onPageChange = (e) => setFirst(e.first);

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

        <div className="flex flex-wrap justify-center gap-6">
          <AnimatePresence mode="wait">
            <motion.div
                key={first} // cambia en cada página
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-wrap justify-center gap-6"
              >
                {autosPaginados.map((auto) => (<AutoCard key={auto.id} auto={auto} /> ))}
            </motion.div>
          </AnimatePresence>
       </div>
       
      {/* paginator */}
        <div className="flex justify-center mt-10">
          <Paginator
            first={first}
            rows={rows}
            totalRecords={autos.length}
            onPageChange={onPageChange}
            template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
            className="bg-white/80 backdrop-blur-md rounded-md shadow-md p-2"
          />
        </div>
      </div>
    </div>
  );
}
