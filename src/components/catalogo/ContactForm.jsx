import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { getVehicleById } from '../../utils/vehicleUtils';

export function ContactForm() {
  const [id, setId] = useState(null);
  const [drive, setDrive] = useState(false);
  const [vehicle, setVehicle] = useState(null);

  // Obtener parámetros de la URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idParam = params.get('id');
    const driveParam = params.get('drive') === 'true'; // Convertir a booleano

    setId(idParam);
    setDrive(driveParam);
  }, []);

  // Cargar datos del vehículo si se tiene un `id`
  useEffect(() => {
    if (id) {
      getVehicleById(id)
        .then((data) => setVehicle(data))
        .catch((err) => console.error('Error al obtener el vehículo:', err));
    }
  }, [id]);

  // Configurar el formulario
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  // Actualizar valores predeterminados cuando se obtenga el vehículo
  useEffect(() => {
    if (vehicle) {
      reset({
        name: '',
        email: '',
        subject: drive
          ? `Prueba de manejo en vehículo: ${vehicle.brand} ${vehicle.model}`
          : `Interesado en comprar vehículo: ${vehicle.brand} ${vehicle.model}`,
        message: '',
      });
    }
  }, [vehicle, drive, reset]);

  // Manejar el envío del formulario
  const onSubmit = (data) => {
    console.log('Datos del formulario:', data);
    console.log('ID del vehículo:', id);
    console.log('Drive:', drive);
  };
  

  return (
    <section className="max-w-6xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
      <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
        Formulario de contacto
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="text-gray-700 dark:text-gray-200">
              Nombre
            </label>
            <input
              id="name"
              type="text"
              {...register('name', { required: 'Este campo es obligatorio' })}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white 
                         border border-gray-200 rounded-md dark:bg-gray-800 
                         dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 
                         focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 
                         focus:outline-none focus:ring"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">Este campo es obligatorio</span>
            )}
          </div>

          <div>
            <label
              htmlFor="emailAddress"
              className="text-gray-700 dark:text-gray-200"
            >
              Correo electrónico
            </label>
            <input
              id="emailAddress"
              type="email"
              {...register('email', { required: 'Este campo es obligatorio' })}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white 
                         border border-gray-200 rounded-md dark:bg-gray-800 
                         dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 
                         focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 
                         focus:outline-none focus:ring"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">Este campo es obligatorio</span>
            )}
          </div>
        </div>

        <div className="mt-6">
          <label htmlFor="subject" className="text-gray-700 dark:text-gray-200">
            Asunto
          </label>
          <input
            id="subject"
            type="text"
            {...register('subject', { required: 'Este campo es obligatorio' })}
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white 
                       border border-gray-200 rounded-md dark:bg-gray-800 
                       dark:text-gray-300 dark:border-gray-600 
                       focus:border-blue-400 focus:ring-blue-300 
                       focus:ring-opacity-40 dark:focus:border-blue-300 
                       focus:outline-none focus:ring"
          />
          {errors.subject && (
            <span className="text-red-500 text-sm">Este campo es obligatorio</span>
          )}
        </div>
        {drive && (
          <div className="mt-6 flex flex-col text-white">
            <label htmlFor="driveDate" className="text-gray-700 dark:text-gray-200">
              Fecha de prueba
            </label>
            <input
              {...register("driveDate", {
                required: "Este campo es obligatorio",
                min: {
                  value: new Date().toISOString().split("T")[0],
                  message: "Introduzca una fecha valida",
                },
              })}
              type="date"
              id="driveDate"
              className="block w-full px-4 py-2 mt-2 text-gray-700 
                         bg-white border border-gray-200 rounded-md dark:bg-gray-800 
                         dark:text-gray-300 dark:border-gray-600 
                         focus:border-blue-400 focus:ring-blue-300 
                         focus:ring-opacity-40 dark:focus:border-blue-300 
                         focus:outline-none focus:ring"
            />
            {errors.driveDate && (
              <span className="text-red-500 text-sm">{errors.driveDate.message}</span>
            )}
          </div>
        )}
        <div className="mt-6">
          <label htmlFor="message" className="text-gray-700 dark:text-gray-200">
            Mensaje
          </label>
          <textarea
            id="message"
            rows="5"
            {...register('message', { required: 'Este campo es obligatorio' })}
            className="block w-full px-4 py-2 mt-2 text-gray-700 
                       bg-white border border-gray-200 rounded-md dark:bg-gray-800 
                       dark:text-gray-300 dark:border-gray-600 
                       focus:border-blue-400 focus:ring-blue-300 
                       focus:ring-opacity-40 dark:focus:border-blue-300 
                       focus:outline-none focus:ring"
          ></textarea>
          {errors.message && (
            <span className="text-red-500 text-sm">Este campo es obligatorio</span>
          )}
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="px-8 py-2.5 leading-5 text-white 
                       transition-colors duration-300 transform 
                       bg-gray-700 rounded-md hover:bg-gray-600 
                       focus:outline-none focus:bg-gray-600"
          >
            Enviar
          </button>
        </div>
      </form>
    </section>
  );
}