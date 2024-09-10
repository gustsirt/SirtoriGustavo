import { formOptions, useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { useNavigate } from '@tanstack/react-router';
import useAuthApi from './hooks/useAuthApi';
import Frame from '../layout/frame/Frame';

// Definición del esquema de validación usando Zod
const loginSchema = z.object({
  email: z.string().email('Debe ser un correo electrónico válido').nonempty('El correo electrónico es obligatorio'),
  password: z.string().min(5, 'La contraseña debe tener al menos 5 caracteres'),
});

// Configuración de opciones del formulario
const formOpts = formOptions({
  defaultValues: {
    email: 'gustavo.sirtori@gmail.com',
    password: '123456',
  },
  resolver: zodValidator(loginSchema),
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

export default function Login() {
  const navigate = useNavigate({from: '/login'});
  const {error, setError, login} = useAuthApi()
  
  const form = useForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      console.log(value);
      const {email, password} = value
      await login({email, password}, navigate);
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
    <Frame css={"max-w-sm"}>
      <h1 className="text-2xl font-semibold mb-6 text-gray-700">Iniciar sesión</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
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
        <div className="mb-6">
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
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={!canSubmit}
                className={`${
                  !canSubmit
                    ? 'bg-gray-400'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
              >
                {isSubmitting ? 'Enviando...' : 'Ingresar'}
              </button>
              <button
                type="reset"
                onClick={() => form.reset()}
                className="text-indigo-600 hover:underline"
              >
                Restablecer
              </button>
            </div>
          )}
        />
      </form>
    </Frame>
  );
}
