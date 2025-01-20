import { useState } from 'react';
import { useForm,Controller  } from 'react-hook-form';
import { supabase } from "../../lib/supabase";
import CreatableSelect from 'react-select/creatable';
import { bodyOptions,brandOptions } from '../../utils/vehicleUtils';



const EditVehicleForm = ({ vehicle }) => {
  const [imagePreview, setImagePreview] = useState(vehicle.image);


  const { register, handleSubmit, formState: { errors }, reset, control } = useForm(
   {defaultValues: vehicle} 
  )


  
  


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImageToBucket = async (file) => {
    if (!file) {
      console.error('No se proporcionó un archivo');
      return null;
    }
    
    // Verificar si el archivo tiene un nombre
    if (!file.name) {
      console.error('El archivo no tiene nombre');
      return null;
    }
  
    const fileExt = file.name.split('.').pop(); // Asegúrate de que file tenga un nombre válido
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `vehicles/${fileName}`;
  
    const { data, error } = await supabase.storage
      .from('car_pics')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });
  
    if (error) {
      console.error('Error al subir la imagen:', error.message);
      return null;
    }
  
    const { data: publicUrlData } = supabase.storage
      .from('car_pics')
      .getPublicUrl(filePath);
  
    return publicUrlData.publicUrl;
  };
  

  const onSubmit = async (data) => {
    try {
      // Verificar si se ha cargado una nueva imagen
      let imageUrl = vehicle.image; 
      if (data.image && data.image.length > 0) {
        const file = data.image[0];
        // Subir la nueva imagen y obtener la URL
        const newImageUrl = await uploadImageToBucket(file);
        if (newImageUrl) {
          imageUrl = newImageUrl;
        }
      }
  
      // Construir el objeto 'updateFields' sin incluir 'image' si 'imageUrl' está vacío
      const updateFields = {
        brand: data.brand,
        model: data.model,
        year: data.year,
        engine: data.engine,
        body_type: data.body_type,
        price: data.price,
        description: data.description
      };
  
      // Si tenemos una imagen (vieja o nueva), inclúyela en la actualización
      if (imageUrl) {
        updateFields.image = imageUrl;
      }
  
      const { data: updatedVehicle, error } = await supabase
        .from('vehicles')
        .update(updateFields)
        .eq('id', vehicle.id);
  
      if (error) throw new Error(error.message);
  
      alert('🚗 Vehículo actualizado con éxito');
      reset();
      window.location.href = '/dashboard/lista-vehiculos';
    } catch (error) {
      console.error('Error al actualizar el vehículo:', error);
      alert('❌ Hubo un error al actualizar el vehículo');
    }
  };
  
  
return(
<form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-6">

{/* Imagen */}
<div className="mb-4">
  <label htmlFor="image" className="block text-sm font-medium text-gray-700">Imagen</label>
  <input
  id="image"
  type="file"
  accept="image/*"
  {...register('image', {
    validate: (value) => {
      // Si no se selecciona una nueva imagen, asegurarse de que haya una imagen previa
      if (!value?.length && !vehicle.image) {
        return 'Este campo es obligatorio si no hay una imagen previa';
      }
      return true; // Válido si se seleccionó una imagen o ya hay una existente
    },
  })}
  onChange={handleImageChange}
  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
/>


  {errors.image && <span className="text-red-500 text-sm">{errors.image.message}</span>}

  {imagePreview && (
    <div className="mt-4">
      <img src={imagePreview} alt="Vista previa" className="max-w-full max-h-48 object-cover rounded-md" />
    </div>
  )}
</div>

{/* Campos en dos columnas */}
<div className="grid grid-cols-2 gap-4">
  {/* Marca */}
  <div className="mb-4">
    <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Marca</label>
    <Controller
            name="brand"
            control={control}
            rules={{ required: 'Este campo es obligatorio' }}
            render={({ field }) => (
              <CreatableSelect isClearable
                {...field}
                options={brandOptions}
                className="mt-1"
                instanceId="brand-select"
                defaultInputValue={vehicle.brand}
              />
            )}
          />
    {errors.brand && <span className="text-red-500 text-sm">{errors.brand.message}</span>}
  </div>

  {/* Modelo */}
  <div className="mb-4">
    <label htmlFor="model" className="block text-sm font-medium text-gray-700">Modelo</label>
    <input
      id="model"
      {...register('model', { required: 'Este campo es obligatorio' })}
      className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {errors.model && <span className="text-red-500 text-sm">{errors.model.message}</span>}
  </div>

  {/* Año */}
  <div className="mb-4">
    <label htmlFor="year" className="block text-sm font-medium text-gray-700">Año</label>
    <input
      id="year"
      type="number"
      {...register('year', {
        required: 'Este campo es obligatorio',
        min: { value: 1900, message: 'El año debe ser mayor a 1900' },
        max: { value: new Date().getFullYear(), message: 'El año no puede ser mayor al actual' }
      })}
      className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {errors.year && <span className="text-red-500 text-sm">{errors.year.message}</span>}
  </div>

  {/* Motor */}
  <div className="mb-4">
    <label htmlFor="engine" className="block text-sm font-medium text-gray-700">Motor</label>
    <input
      id="engine"
      {...register('engine', { required: 'Este campo es obligatorio' })}
      className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {errors.engine && <span className="text-red-500 text-sm">{errors.engine.message}</span>}
  </div>

  {/* Tipo de Carrocería */}
  <div className="mb-4">
    <label htmlFor="body_type" className="block text-sm font-medium text-gray-700">Tipo de Carrocería</label>
    <Controller
            name="body_type"
            control={control}
            rules={{ required: 'Este campo es obligatorio' }}
            render={({ field }) => (
              <CreatableSelect isClearable
                {...field}
                options={bodyOptions}
                className="mt-1"
                instanceId="bodyOptions-select"
                defaultInputValue={vehicle.body_type}
              />
            )}
          />
      
    {errors.body_type && <span className="text-red-500 text-sm">{errors.body_type.message}</span>}
  </div>

  {/* Precio */}
  <div className="mb-4">
    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Precio</label>
    <input
      id="price"
      type="number"
      {...register('price', {
        required: 'Este campo es obligatorio',
        min: { value: 0, message: 'El precio debe ser mayor a 0' }
      })}
      className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {errors.price && <span className="text-red-500 text-sm">{errors.price.message}</span>}
  </div>
</div>


{/* 📝 Descripción */}
<div className="mb-6">
  <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
  <textarea
    id="description"
    {...register('description', { required: 'Este campo es obligatorio' })}
    className="mt-1 p-2 w-full h-32 border border-gray-300 rounded-md"
  />
</div>

{/* ✅ Botón de Envío */}
<button
  type="submit"
  className="w-full py-3 px-8 bg-blue-600 text-white rounded-md hover:bg-blue-700"
>
  Confirmar 
</button>
</form>
)  
};

export default EditVehicleForm;
