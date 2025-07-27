import Slider from "react-slick";

const marcas = [
  { src: "https://www.autogarageliberia.com/wp-content/uploads/2021/06/ford-logo-1-1-300x112.png", alt: "Ford" },
  { src: "https://www.autogarageliberia.com/wp-content/uploads/2021/06/1024px-Jeep_logo.svg-300x121.png", alt: "Jeep" },
  { src: "https://www.autogarageliberia.com/wp-content/uploads/2021/06/30011-bmw-logo-300x300.png", alt: "BMW" },
  { src: "https://www.autogarageliberia.com/wp-content/uploads/2021/06/unnamed-300x223.png", alt: "Dodge" },
  { src: "https://www.autogarageliberia.com/wp-content/uploads/2021/06/toyota-logo-vector-300x300.png", alt: "Toyota" },
  { src: "https://www.autogarageliberia.com/wp-content/uploads/2021/06/Nissan-logo.svg-300x259.png", alt: "Nissan" },
  { src: "https://www.autogarageliberia.com/wp-content/uploads/2021/06/Chevrolet-logo-300x170.png", alt: "Chevrolet" },
  { src: "https://www.autogarageliberia.com/wp-content/uploads/2021/06/hyundai-logo-0-300x184.png", alt: "Hyundai" },
  { src: "https://www.autogarageliberia.com/wp-content/uploads/2021/06/Isuzu-Logo-300x169.png", alt: "Izuzu" },
  { src: "https://www.autogarageliberia.com/wp-content/uploads/2021/06/audi-logo-300x200.jpg", alt: "Audi" },
  { src: "https://www.autogarageliberia.com/wp-content/uploads/2021/06/Mercedes-logo-300x169.png", alt: "Mercedes" },
];

export default function MarcasCarrusel() {
  const settings = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };

return (
    <div className="py-10">
      <div className="max-w-6xl mx-auto px-4 bg-gradient-to-b from-white to-transparent rounded-md shadow-md">
        <h2 className="text-center text-2xl font-bold mb-6 uppercaseblack">
          Vendemos las marcas más reconocidas del país
        </h2>
        <Slider {...settings}>
          {marcas.map((marca, index) => (
            <div key={index} className="flex justify-center items-center px-4">
              <img
                src={marca.src}
                alt={marca.alt}
                className="h-24 object-contain transition duration-300"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
