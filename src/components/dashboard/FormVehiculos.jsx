import { useState } from 'react';
import { useForm,Controller  } from 'react-hook-form';
import { supabase } from "../../lib/supabase";
import CreatableSelect from 'react-select/creatable';
import { bodyOptions,brandOptions } from '../../utils/vehicleUtils';
import { v4 as uuidv4 } from 'uuid';


const AddVehicleForm = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const { register, handleSubmit, formState: { errors }, reset,watch ,control} = useForm();

  
  // Previsualizar la imagen seleccionada
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        alert('Solo se permiten imágenes JPG o PNG');
        return;
      }
      setImagePreview(URL.createObjectURL(file));
    }
  };
  

  // Subir la imagen al bucket de Supabase
  const uploadImageToBucket = async (file) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `vehicles/${fileName}`;
    const { data, error } = await supabase.storage.from('car_pics').upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });
    if (error) {
      console.error('Error al subir la imagen:', error.message);
      return null;
    }
    const { data: publicUrlData } = supabase.storage.from('car_pics').getPublicUrl(filePath);
    return publicUrlData.publicUrl;
  };

  // Subir datos a la base de datos
  const onSubmit = async (data) => {
    try {
      const imageFile = data.image[0];

      // Subir la imagen al bucket
      const imageUrl = await uploadImageToBucket(imageFile);

      if (!imageUrl) {
        alert('Error al subir la imagen');
        return;
      }

      const realBrand = data.brand.value
      // Insertar datos en la base de datos
      const { data: vehicleData, error } = await supabase
        .from('vehicles')
        .insert([
          {
            brand: realBrand,
            model: data.model,
            year: data.year,
            engine: data.engine,
            body_type: data.body_type, // Ajustado para que coincida con el nombre del campo
            price: data.price,
            description: data.description,
            image: imageUrl,
          }
        ]);

      if (error) throw new Error(error.message);

      console.log('Vehículo agregado:', vehicleData);
      alert('🚗 Vehículo agregado con éxito');
      reset();
      setImagePreview(null);

    } catch (error) {
      console.error('Error al agregar el vehículo:', error);
      alert('❌ Hubo un error al agregar el vehículo');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-6">

      {/* Imagen */}
      <div className="mb-4">
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Imagen</label>
        <input
          id="image"
          type="file"
          accept="image/*"
          {...register('image', { required: 'Este campo es obligatorio' })}
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
        Agregar Vehículo
      </button>
    </form>
  );
};

export default AddVehicleForm;
