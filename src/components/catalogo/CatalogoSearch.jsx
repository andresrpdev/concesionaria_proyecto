import "../../styles/filters.css";
import { useEffect, useState } from "react";
import data from "../../data/autos.json";
const { autos } = data;

export default function Search() {
    const [inputValue, setInputValue] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedYear, setSelectedYear] = useState("");

    // Obtener años únicos
     const uniqueYears = [...new Set(autos.map((auto) => auto.año))].sort((a, b) => b - a);

    // Obtener marcas únicas
    const uniqueBrands = [...new Set(autos.map((auto) => auto.marca))].sort();

    useEffect(() => {
        console.log(inputValue);

    }, [inputValue]);

    return (
        <div className="catalogo-container">
            <h1>Catálogo de Autos</h1>

            
            <div className="search-bar flex justify-center">
                <div className="relative text-gray-700 flex items-center">
                    <div className="absolute left-3">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500">
                            <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
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
                <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)} className="filter-select border text-gray-900 text-md border-t-0 border-x-0 border-b-2 focus:ring-0 block w-full p-2.5">
                    <option value="">Filtrar por marca</option>
                    {uniqueBrands.map((brand) => (
                        <option key={brand} value={brand}>{brand}</option>
                    ))}
                </select>

                <select className="filter-select border text-gray-900 text-md border-t-0 border-x-0 border-b-2 focus:ring-0 block w-full p-2.5">
                    <option value={0}>Filtrar por precio</option>
                    <option value={50000}>Hasta $50,000</option>
                    <option value={60000}>Hasta $60,000</option>
                    <option value={100000}>Hasta $100,000</option>
                </select>

                <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}   className="filter-select border text-gray-900 text-md border-t-0 border-x-0 border-b-2 focus:ring-0 block w-full p-2.5">
                    <option value={0}>Año</option>
                    {uniqueYears.map((year) => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>

                <select className="filter-select border text-gray-900 text-md border-t-0 border-x-0 border-b-2 focus:ring-0 block w-full p-2.5">
                    <option value={0}>Carrocería</option>
                    <option value="SUV">SUV</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Sedán">Sedán</option>
                    <option value="Coupé">Coupé</option>
                    <option value="Camioneta">Camioneta</option>
                </select>
            </div>

            {/* 🏎️ Cards de Autos */}
            <section className="cards-container place-items-center grid grid-cols-3 grid-rows-10 gap-4">
                {autos
                    .filter((auto) => {
                        const searchTerm = inputValue.toLowerCase();
                        const combinedText = `${auto.marca} ${auto.modelo}`.toLowerCase();
                        const carroceriaFilter = auto.carroceria.toLowerCase() === selectedBrand.toLowerCase()
                        return combinedText.includes(searchTerm) || carroceriaFilter;
                    })
                    .map((auto) => (
                        <a
                            key={auto.id}
                            href={`/catalogo/${auto.id}`}
                            className="card w-96 h-auto bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row"
                        >
                            <img src={auto.imagen} alt={auto.modelo} className="card-img w-full h-48 object-cover md:w-1/2" />
                            <div className="card-info p-4 flex flex-col justify-between">
                                <div>
                                    <h3 className="card-title text-xl font-semibold text-gray-800">{auto.marca}</h3>
                                    <p className="card-modelo text-gray-600">{auto.modelo}</p>
                                </div>
                                <p className="card-precio text-lg font-bold text-blue-500 mt-2">${auto.precio}</p>
                            </div>
                        </a>
                    ))}
            </section>
        </div>
    );
}
