import "../../styles/filters.css";
import data from "../../data/autos.json";
const {autos} = data;
export default function Search() {
    return (
        <div className="catalogo-container">
            <div className="search-bar flex justify-center">
                    <div className="relative text-gray-700 flex items-center">
                    <div className="absolute left-3">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    </g>
                </svg>
                    </div>
                    <input 
                        type="text"
                        
                        
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-md w-[40vw] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Buscar modelo o marca"
                    />
                </div>
            </div>

            {/* Filtros */}
            
            <div className="filters flex space-x-2 w-[80vw] my-4  p-5 rounded-t-3xl rounded-b-3xl ">
                <select 
                    className="filter-select  border  text-gray-900 text-md border-t-0  border-x-0 border-b-2 focus:ring-0
                     block w-full p-2.5 " 
                
                >
                    <option value="">Filtrar por marca</option>
                    <option value="Audi">Audi</option>
                    <option value="BMW">BMW</option>
                    <option value="Ford">Ford</option>
                    <option value="Chevrolet">Chevrolet</option>
                    <option value="Toyota">Toyota</option>
                </select>

                <select 
                    className="filter-select  border  text-gray-900 text-md border-t-0  border-x-0 border-b-2 focus:ring-0
                    block w-full p-2.5 " 
                  
                >
                    <option value={0}>Filtrar por precio</option>
                    <option value={50000}>Hasta $50,000</option>
                    <option value={60000}>Hasta $60,000</option>
                    <option value={100000}>Hasta $100,000</option>
                </select>

                <select 
                   className="filter-select  border  text-gray-900 text-md border-t-0  border-x-0 border-b-2 focus:ring-0
                   block w-full p-2.5 " 
                  
                >
                    <option value={0}>Año</option>
                    <option value={50000}>2025</option>
                    <option value={60000}>2024</option>
                    <option value={100000}>2023</option>
                    <option value={100000}>2022</option>
                    <option value={100000}>2021</option>
                    <option value={100000}>2020</option>
                    <option value={100000}>2019</option>
                    <option value={100000}>2018</option>
                    <option value={100000}>2017 o menos</option>
                </select>

                <select 
                    className="filter-select  border  text-gray-900 text-md border-t-0  border-x-0 border-b-2 focus:ring-0
                    block w-full p-2.5 " 
                  
                >
                    <option value={0}>Carroceria</option>
                    <option value={50000}>SUV</option>
                    <option value={60000}>Hatchback</option>
                    <option value={100000}>Sedán</option>
                    <option value={100000}>Coupé</option>
                    <option value={100000}>Camioneta</option>
                </select>
                    
            </div>
        <section className="cards-container place-items-center grid grid-cols-3 grid-rows-10 gap-4">
            {/* Card */}
            {autos.map((auto)=>{
                return( 
                    <a href={`/catalogo/${auto.id}`} className="card w-96 h-auto bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
                        <img transition:name={`${auto.id} image box`} src={auto.imagen} alt="auto" className="card-img w-full h-48 object-cover md:w-1/2"/>
                        <div className="card-info p-4 flex flex-col justify-between">
                            <div>
                                <h3 className="card-title text-xl font-semibold text-gray-800">{auto.marca}</h3>
                                <p className="card-modelo text-gray-600">{auto.modelo}</p>
                            </div>
                            <p className="card-precio text-lg font-bold text-blue-500 mt-2">${auto.precio}</p>
                        </div>
                    </a>
                )
            })}
        </section>

    </div>
    );
}