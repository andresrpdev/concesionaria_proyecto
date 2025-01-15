
import useEmblaCarousel from 'embla-carousel-react';
import data from "../../data/autos.json";

const getLastAutos = (autos, count) => {
  return autos.slice(-count);
};

export default function EmblaCarousel() {
  const [emblaRef] = useEmblaCarousel({
    dragFree: true, // Permite arrastre libre
    loop: true,
  });

  const lastAutos = getLastAutos(data.autos, 10); // Obtener los últimos 10 autos

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex space-x-4">
        {lastAutos.map((auto) => (
          <div className="flex-none ml-4 w-72 h-80 bg-white shadow-lg rounded-lg overflow-hidden relative" key={auto.id}>
            <img 
              src={auto.imagen} 
              alt={`${auto.marca} ${auto.modelo}`} 
              className="object-cover w-full h-40" 
            />
            <div className="p-4 flex flex-col h-40 justify-between">
              <div>
                <p className="text-xl font-semibold">{auto.marca} {auto.modelo}</p>
                <p className="text-sm text-gray-600">{auto.año}</p>
                <p className="text-lg font-bold">{auto.precio}</p>
              </div>
              <a href={`/catalogo/${auto.id}`} className="bg-gray-800 text-white px-4 py-2 rounded-lg mt-2 hover:bg-gray-700 transition block text-center">
                Más Info
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
