import { useState, useEffect } from "react";

const imagenes = [
  "/images/banner1.jpg",
  "/images/banner3.jpg",
];

export default function BannerPrincipal() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndex((prev) => (prev + 1) % imagenes.length);
    }, 25000); // cambia cada 25 segundos

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="w-full h-64 md:h-80 lg:h-96 overflow-hidden relative">
      <img
        src={imagenes[index]}
        alt={`Banner ${index + 1}`}
        className="w-full h-full object-cover transition-opacity duration-700"
      />
      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
        <h1 className="text-white text-2xl md:text-4xl font-bold">
          Bienvenido a Autos CR
        </h1>
      </div>
    </div>
  );
}
