import useEmblaCarousel from 'embla-carousel-react';
import { useState, useEffect } from 'react';
import { getAllVehicles } from '../../utils/vehicleUtils';

export default function EmblaCarousel() {
  const [autos, setAutos] = useState([]); // Estado para almacenar los vehículos
  const [emblaRef] = useEmblaCarousel({
    dragFree: true,
    loop: true,
  });

  useEffect(() => {
    const fetchAutos = async () => {
      try {
        const data = await getAllVehicles(); // Obtén los datos de la base de datos
        setAutos(data); // Almacena los vehículos en el estado
      } catch (error) {
        console.error('Error al obtener vehículos:', error);
      }
    };

    fetchAutos();
  }, []); // Ejecuta solo una vez al montar el componente

  const getLastAutos = (autos, count) => {
    return autos.slice(-count); // Obtén los últimos vehículos
  };

  const lastAutos = getLastAutos(autos, 10); // Obtener los últimos 10 autos

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex space-x-4">
        {lastAutos.length === 0 ? ( // Renderiza un mensaje de carga si no hay autos
          <p className="text-center">Cargando vehículos...</p>
        ) : (
          lastAutos.map((auto) => (
            <div
              className="flex-none ml-4 w-72 h-80 bg-white shadow-lg rounded-lg overflow-hidden relative"
              key={auto.id}
            >
              <img
                src={auto.image}
                alt={`${auto.brand} ${auto.model}`}
                className="object-cover w-full h-40"
              />
              <div className="p-4 flex flex-col h-40 justify-between">
                <div>
                  <p className="text-xl font-semibold">
                    {auto.brand} {auto.model}
                  </p>
                  <p className="text-sm text-gray-600">{auto.year}</p>
                  <p className="text-lg font-bold">${auto.price}</p>
                </div>
                <a
                  href={`/catalogo/${auto.id}`}
                  className="bg-gray-800 text-white px-4 py-2 rounded-lg mt-2 hover:bg-gray-700 transition block text-center"
                >
                  Más Info
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
