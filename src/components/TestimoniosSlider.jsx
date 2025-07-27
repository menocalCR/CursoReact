import Slider from "react-slick";
import { useTestimonios } from "../context/TestimoniosContext";

export default function TestimoniosSlider() {
  const { testimonios } = useTestimonios();

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center text-white mb-10">
        Lo que dicen nuestros clientes
      </h2>
      <Slider {...settings}>
        {testimonios.map((t) => (
          <div key={t.id} className="px-3">
            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between h-full text-sm">
              <div className="text-yellow-400 text-xl mb-2">★★★★★</div>
              <p className="text-gray-700 italic mb-4">“{t.mensaje}”</p>
              <p className="text-right font-semibold text-blue-700">– {t.nombre}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
