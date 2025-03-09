import "../../styles/filters.css";
import "../../styles/spinner.css";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { uniqueBrands, uniqueYears } from "../../utils/vehicleUtils";

export default function Search() {
  const [inputValue, setInputValue] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [priceRange, setPriceRange] = useState(0);
  const [selectedBodyType, setSelectedBodyType] = useState("");

  const [allVehicles, setAllVehicles] = useState([]); // Datos originales
  const [vehicles, setVehicles] = useState([]); // Datos filtrados
  const [loading, setLoading] = useState(true);

  // Obtener datos de la base de datos
  useEffect(() => {
    const fetchVehicles = async () => {
      const { data, error } = await supabase.from("vehicles").select("*");
      if (error) {
        console.error("Error al obtener los datos:", error.message);
      } else {
        setAllVehicles(data);
        setVehicles(data); // Inicialmente, mostrar todos
      }
      setLoading(false);
    };

    fetchVehicles();
  }, []);

  // Filtrar vehículos en base a los filtros seleccionados
  useEffect(() => {
    const filteredVehicles = allVehicles.filter((vehicle) => {
      const matchesSearch =
        inputValue === "" ||
        vehicle.brand.toLowerCase().includes(inputValue.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(inputValue.toLowerCase());

      const matchesBrand =
        selectedBrand === "" ||
        vehicle.brand.toLowerCase() === selectedBrand.toLowerCase();

      const matchesYear = selectedYear === "" || vehicle.year === Number(selectedYear);

      const matchesPrice = priceRange === 0 || vehicle.price <= priceRange;

      const matchesBodyType =
        selectedBodyType === "" || vehicle.body_type === selectedBodyType;

      return matchesSearch && matchesBrand && matchesYear && matchesPrice && matchesBodyType;
    });

    setVehicles(filteredVehicles);
  }, [inputValue, selectedBrand, selectedYear, priceRange, selectedBodyType, allVehicles]);

  return (
    <div className="catalogo-container">
      <h1 className="text-md">Catálogo de Autos</h1>

      {/* Barra de búsqueda */}
      <div className="search-bar flex justify-center">
        <div className="relative text-gray-700 flex items-center">
          <div className="absolute left-3">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-500"
            >
              <path
                d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-md w-[40vw] focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Buscar modelo o marca"
          />
        </div>
      </div>

      {/* Filtros */}
      <div className="filters flex space-x-2 w-[80vw] my-4 p-5 rounded-t-3xl rounded-b-3xl">
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="filter-select border text-gray-900 text-md border-t-0 border-x-0 border-b-2 focus:ring-0 block w-full p-2.5"
        >
          <option value="">Filtrar por marca</option>
          {uniqueBrands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>

        <select
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="filter-select border text-gray-900 text-md border-t-0 border-x-0 border-b-2 focus:ring-0 block w-full p-2.5"
        >
          <option value={0}>Filtrar por precio</option>
          <option value={50000}>Hasta $50,000</option>
          <option value={60000}>Hasta $60,000</option>
          <option value={100000}>Hasta $100,000</option>
          <option value={150000}>Hasta $150,000</option>
        </select>

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="filter-select border text-gray-900 text-md border-t-0 border-x-0 border-b-2 focus:ring-0 block w-full p-2.5"
        >
          <option value="">Año</option>
          {uniqueYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <select
          value={selectedBodyType}
          onChange={(e) => setSelectedBodyType(e.target.value)}
          className="filter-select border text-gray-900 text-md border-t-0 border-x-0 border-b-2 focus:ring-0 block w-full p-2.5"
        >
          <option value="">Carrocería</option>
          <option value="SUV">SUV</option>
          <option value="Hatchback">Hatchback</option>
          <option value="Sedan">Sedán</option>
          <option value="Coupe">Coupé</option>
          <option value="Pickup">Pickup</option>
        </select>
      </div>

      {/* Resultados */}
      {loading ? (
        <div className="loader m-auto"></div>
      ) : (
        <section className="cards-container mx-28 place-items-center grid grid-cols-3 grid-rows-10 gap-4">
          {vehicles.length > 0 ? (
            vehicles.map((vehicle) => (
              <a href={`/catalogo/${vehicle.id}`} key={vehicle.id}>
                <div className="card bg-white shadow-lg p-4 rounded-lg text-center">
        <img src={vehicle.image} alt={vehicle.model} className="w-64 h-48 object-cover" />
          <h2 className="text-md uppercase font-semibold mt-1">{vehicle.brand} {vehicle.model} {vehicle.engine}</h2>
          <p>{vehicle.year}</p>
          <p className="text-lg font-semibold text-amber-700">${vehicle.price}</p>
          
        </div>
        </a>
      ))
    ) : (
      <p className="col-span-3">No se encontraron vehículos.</p>
    )}
  </section>
)}

            
        </div>
    );
}
