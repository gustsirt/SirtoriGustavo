import { formOptions, useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { useNavigate } from '@tanstack/react-router';
import useAuthApi from './hooks/useAuthApi';
import Frame from '../layout/frame/Frame';

// Definición del esquema de validación usando Zod
const registerSchema = z.object({
  given_name: z.string().max(50, 'El nombre no puede exceder los 50 caracteres').nonempty('El nombre es obligatorio'),
  family_name: z.string().max(50, 'El apellido no puede exceder los 50 caracteres').nonempty('El apellido es obligatorio'),
  email: z.string().email('Debe ser un correo electrónico válido').nonempty('El correo electrónico es obligatorio'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres').nonempty('La contraseña es obligatoria'),
  confirm_password: z.string().min(6, 'La confirmación de la contraseña debe tener al menos 6 caracteres'). nonempty('La confirmación de la contraseña es obligatoria'),
  birthday: z.date().optional(),
}).refine((data) => data.password === data.confirm_password, {
  message: 'Las contraseñas no coinciden',
  path: ['confirm_password'], // Marca el error en el campo de confirmación
});

// Configuración de opciones del formulario
const formOpts = formOptions({
  defaultValues: {
    given_name: 'Profe',
    family_name: 'Prueba',
    email: 'profe.gust@gmail.com',
    password: '123456',
    confirm_password: '123456',
    birthday: '',
  },
  resolver: zodValidator(registerSchema),
});

function FieldInfo({ field }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em className="text-red-600">{field.state.meta.errors.join(',')}</em>
      ) : null}
      {field.state.meta.isValidating ? (
        <span className="text-blue-600">Validando...</span>
      ) : null}
    </>
  );
}

export default function Register() {
  const navigate = useNavigate({from: '/register'});
  const {error, setError, register} = useAuthApi()

  const form = useForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      const formValues = value
      delete formValues.confirm_password;
      if (formValues.birthday === '') delete formValues.birthday;
      console.log(formValues);
      await register(formValues, navigate);
    },
  });

  if (error) return (
    <div className="p-8 min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white shadow-md rounded-lg flex flex-col items-center">
        <p className="text-xl font-semibold mb-6 text-gray-700" >{error}</p>
        <button
            onClick={()=>setError(null)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Re intentar
        </button>
      </div>
    </div>)

  return (
    <Frame css={"max-w-lg"}>
      <h1 className="text-2xl font-semibold mb-6 text-gray-700">Registro</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="mb-4">
          <form.Field
            name="given_name"
            children={(field) => (
              <>
                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">Nombre:</label>
                <input
                  id={field.name}
                  name={field.name}
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </>
            )}
          />
        </div>
        <div className="mb-4">
          <form.Field
            name="family_name"
            children={(field) => (
              <>
                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">Apellido:</label>
                <input
                  id={field.name}
                  name={field.name}
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </>
            )}
          />
        </div>
        <div className="mb-4">
          <form.Field
            name="email"
            children={(field) => (
              <>
                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">Correo electrónico:</label>
                <input
                  id={field.name}
                  name={field.name}
                  type="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </>
            )}
          />
        </div>
        <div className="mb-4">
          <form.Field
            name="password"
            children={(field) => (
              <>
                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">Contraseña:</label>
                <input
                  id={field.name}
                  name={field.name}
                  type="password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </>
            )}
          />
        </div>
        <div className="mb-4">
          <form.Field
            name="confirm_password"
            children={(field) => (
              <>
                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">Confirmar Contraseña:</label>
                <input
                  id={field.name}
                  name={field.name}
                  type="password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </>
            )}
          />
        </div>
        <div className="mb-4">
          <form.Field
            name="birthday"
            children={(field) => (
              <>
                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">Fecha de nacimiento:</label>
                <input
                  id={field.name}
                  name={field.name}
                  type="date"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </>
            )}
          />
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Registrarse
          </button>
        </div>
      </form>
    </Frame>
  );
}
