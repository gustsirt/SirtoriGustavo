import { useNavigate } from "@tanstack/react-router";
import { useAppStore } from "../../store/useAppStore";

export function LogOut ({router}) {
  const navigate = useNavigate({from: '/logout'});
  const { logout } = useAppStore()
    
  const handleLogout = async () => {
    try {
      logout();
      router.invalidate();

    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div className="p-8 min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-semibold mb-6 text-gray-700">Cerrar sesión</h1>
        <p className="mb-6 text-gray-600">¿Estás seguro de que deseas cerrar la sesión?</p>
        <div className="flex items-center justify-between">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cerrar sesión
          </button>
          <button
            onClick={() => navigate({ to: '/private' })}
            className="text-indigo-600 hover:underline"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}