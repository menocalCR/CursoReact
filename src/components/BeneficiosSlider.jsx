import Slider from "react-slick";
import { FaWhatsapp } from "react-icons/fa";

const beneficios = [
  {
    titulo: "Extendemos tu garantía",
    detalle:
      "Al realizar las revisiones de tu vehículo con nuestro taller automotriz, podrás extender tu garantía hasta 12 meses.",
    imagen: "/images/garantia.jpg",
  },
  {
    titulo: "Reservá tu vehículo en línea",
    detalle:
      "Podrás reservar aquí tu vehículo con apenas $100 dólares.",
    imagen: "/images/reserva.jpg",
  },
  {
    titulo: "Respaldo de la marca",
    detalle:
      "Más de 13 años de experiencia en la venta de vehículos y más de 6.000 vehículos vendidos.",
    imagen: "/images/experiencia.png",
  },
  {
     titulo: "Garantia exclusiva y taller propio",
    detalle:
      "Podrás reservar aquí tu vehículo con apenas $100 dólares.",
    imagen: "/images/garantia2.jpg",
  }
  ,
  {
     titulo: "Certificamos nuestros vehiculos",
    detalle:
      "Revisamos y certificamos todos nuestros vehiculos a traves de nuestro taller de servicio Automotriz.",
    imagen: "/images/taller.jpg",
  }
];

export default function BeneficiosSlider() {
    const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 2 } },
        { breakpoint: 640, settings: { slidesToShow: 1 } },
  ],
};

  return (
    <div className="max-w-10xl mx-auto px-4 py-10 relative">
      <h2 className="text-3xl font-bold text-center text-white mb-6">
        ¿Por qué elegir comprar en Autos CR?
      </h2>
      <div className="max-w-6xl mx-auto px-1 py-10">
      <Slider {...settings}>
        {beneficios.map((item, index) => (
          <div key={index} className="px-2 w-[400px]">
            <div className="bg-white rounded-md shadow-md overflow-hidden flex flex-col h-[360px] text-sm transform transition-transform hover:scale-105">
                <div className="flex justify-center">
                    <img
                    src={item.imagen}
                    alt={item.titulo}
                    className="w-full h-38 object-cover object-center mx-auto max-w-[360px] border-[4px] border-transparent"
                    />
                </div>
                <div className="p-3 flex-grow text-center">
                    <p className="text-gray-700 text-sm">{item.detalle}</p>
                </div>

                    <div className="bg-blue-50 px-5 py-1 border-t border-gray-200 text-center mb-[5px]">
                        <h3 className="text-sm font-bold text-blue-700">{item.titulo}</h3>
                    </div>

                </div>
            </div>

        ))}
      </Slider>
      </div>

      {/* Botón flotante de WhatsApp esto esta en prueba, no lleva a ningun sitio*/}
      <a
        href="https://wa.me/506XXXXXXXX"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50"
      >
        <FaWhatsapp size={24} />
      </a>
    </div>
  );
}
