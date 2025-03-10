import { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import "../../styles/EmblaCarousel.css";

// Importar las imágenes
import bmwImg from '/carusel/bmw.jpg';
import f150Img from '/carusel/f150r.jpg';
import mercedesImg from '/carusel/mercedes.jpg';
import jeepImg from '/carusel/jeep.jpg';
import teslaImg from '/carusel/tesla.jpg';

const vehicles = [
  { img: bmwImg, title: "BMW Serie 2", subtitle: "Confort y rendimiento en su máxima expresión" },
  { img: f150Img, title: "Ford F150", subtitle: "La camioneta robusta para cualquier desafío" },
  { img: mercedesImg, title: "Mercedes-Benz Clase E", subtitle: "Elegancia y potencia combinadas" },
  { img: jeepImg, title: "Jeep Wrangler", subtitle: "El rey del todoterreno" },
  { img: teslaImg, title: "Tesla Model S", subtitle: "El futuro eléctrico del rendimiento" },
];

export default function EmblaCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3500 })]);
  const [randomVehicles, setRandomVehicles] = useState([]);

  useEffect(() => {
    // Barajar los vehículos y seleccionar los primeros tres
    const shuffledVehicles = vehicles.sort(() => 0.5 - Math.random());
    setRandomVehicles(shuffledVehicles.slice(0, 3));
  }, []);

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        {randomVehicles.map((vehicle, index) => (
          <div className="embla__slide" key={index}>
            <img src={vehicle.img} alt={vehicle.title} />
            <div className="embla__text">
              <h2 className="embla__title">{vehicle.title}</h2>
              <p className="embla__subtitle">{vehicle.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}