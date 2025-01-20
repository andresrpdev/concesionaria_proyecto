import { supabase } from "../lib/supabase" // Asegúrate de que la ruta sea correcta
import {autos} from "../data/autos.json";
export async function getVehicleById(id) {
  const { data, error } = await supabase
    .from('vehicles') // La tabla de vehículos
    .select('*') // Seleccionamos todos los campos
    .eq('id', id) // Buscamos por el id específico
    .single(); // Para asegurarnos de que obtenemos solo un vehículo

  if (error) {
    console.error("Error al obtener el vehículo:", error.message);
    return null;
  }

  return data; // Si no hay error, devolvemos el vehículo encontrado
}

export const uniqueYears = [...new Set(autos.map((auto) => auto.año))].sort((a, b) => b - a);

export const uniqueBrands = [...new Set(autos.map((auto) => auto.marca))].sort();

export const brandOptions = uniqueBrands.map((brand) => ({ value: brand, label: brand }));

export const bodyOptions =[{value:"Sedán",label:"Sedán"},{value:"Hatchback",label:"Hatchback"},{value:"SUV",label:"SUV"},{value:"Coupé",label:"Coupé"},{value:"Convertible",label:"Convertible"},{value:"Pickup",label:"Pickup"},{value:"Minivan",label:"Minivan"},{value:"Van",label:"Van"},{value:"Camioneta",label:"Camioneta"},{value:"Deportivo",label:"Deportivo"},{value:"Familiar",label:"Familiar"},{value:"Eléctrico",label:"Eléctrico"},{value:"Híbrido",label:"Híbrido"}]

