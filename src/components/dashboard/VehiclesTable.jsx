import { useState, useEffect } from 'react';
import { supabase } from "../../lib/supabase";
import "../../styles/spinner.css"

function VehiclesTable() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // Estado para la modal
  const [vehicleToDelete, setVehicleToDelete] = useState(null); // Estado para el vehículo a eliminar
  
  useEffect(() => {
    const fetchVehicles = async () => {
      const { data, error } = await supabase.from('vehicles').select('*');
      if (error) {
        console.error('Error al obtener los datos:', error.message);
      } else {
        setVehicles(data);
      }
      setLoading(false);
    };

    fetchVehicles();
  }, []);

  if (loading) return (
    <div className='w-full min-h-screen flex items-center justify-center'>
      <div className='loader'></div>
    </div>
  );

  const handleDelete = async (id) => {
    const { error } = await supabase.from('vehicles').delete().eq('id', id);
    if (error) {
      console.error('Error al eliminar el vehículo:', error.message);
    } else {
      setVehicles(vehicles.filter((vehicle) => vehicle.id !== id)); // Eliminar el vehículo del estado
    }
  };


  const openModal = (id) => {
    setVehicleToDelete(id); // Guardar el id del vehículo
    setShowModal(true); // Abrir la modal
  };

  const closeModal = () => {
    setShowModal(false); // Cerrar la modal
    setVehicleToDelete(null); // Limpiar el vehículo seleccionado
  };



  
  return (
    <div className="overflow-x-auto p-4 w-full">
      <table className="min-w-full border-1 border-gray-900">
        <thead>
          <tr className="bg-gray-700 text-white">
            <th className="border w-1/12">Foto</th>
            <th className="py-2 px-4 border w-2/12">Marca</th>
            <th className="py-2 px-4 border w-2/12">Modelo</th>
            <th className="py-2 px-4 border w-1/12">Año</th>
            <th className="py-2 px-4 border w-4/12">Precio</th>
            <th className="py-2 px-4 border w-2/12 text-center">Acciones</th> 
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle, index) => (
            <tr
              key={vehicle.id}
              className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-300`}
            >
              <td className="border flex items-center justify-center"><img className='h-24 w-auto object-cover' src={vehicle.image} alt={vehicle.model} /></td>
              <td className="py-2 px-4 border text-center">{vehicle.brand}</td>
              <td className="py-2 px-4 border text-center">{vehicle.model}</td>
              <td className="py-2 px-4 border text-center">{vehicle.year}</td>
              <td className="py-2 px-4 border text-center">${vehicle.price}</td>
              <td className="py-2 px-4 border text-center"> 
                <a href={`/dashboard/editar-vehiculo/${vehicle.id}`}>
                <button className='bg-blue-300 text-white rounded-lg p-2 hover:bg-blue-400 mx-1'>
                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
                </button>
                </a>
                <button onClick={() => openModal(vehicle.id)} className='bg-red-600 text-white rounded-lg p-2 mx-1 my-1 hover:bg-red-700'>
                <svg width="20px" height="20px" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
    <path d="M6.5 7.08499V21.415C6.5 21.695 6.72 21.915 7 21.915H17C17.28 21.915 17.5 21.695 17.5 21.415V7.08499" stroke="#ffffff" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M14 5.08499H10V3.58499C10 3.30499 10.22 3.08499 10.5 3.08499H13.5C13.78 3.08499 14 3.30499 14 3.58499V5.08499Z" stroke="#ffffff" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M5 5.08499H19" stroke="#ffffff" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M12 10.465V17.925" stroke="#ffffff" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M15 9.465V18.925" stroke="#ffffff" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M9 9.465V18.925" stroke="#ffffff" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4">¿Estás seguro?</h2>
            <p className="mb-4">Esta acción no se puede deshacer.</p>
            <div className="flex justify-center">
              <button
                onClick={() => handleDelete(vehicleToDelete) && closeModal() }
                className="bg-red-600 text-white px-4 py-2 rounded-lg mr-2 hover:bg-red-700"
              >
                Confirmar
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VehiclesTable;
