import { useAppStore } from "../../store/useAppStore";
import { crearURLCompleta } from "../others/urifoto";


export default function NavUser() {
  const { currentUser } = useAppStore();

  if (!currentUser) { return null; }

  const initials = toString(currentUser?.given_name?.charAt(0) + currentUser?.family_name?.charAt(0)).toUpperCase()
  console.log(initials);

  return (
    <div className="flex items-center space-x-2">
      {currentUser?.photo
      ? (
        <img className='flex justify-center items-center font-bold rounded-full w-8 h-8'
          src={crearURLCompleta(currentUser.photo)}
          alt="User Avatar"
        />)
      : <span className='flex justify-center items-center font-bold rounded-full w-8 h-8'>
          {initials ? initials : "?"}
        </span>
      }
      <img
        src={currentUser.avatar || '/default-avatar.png'}
        alt="User Avatar"
        className="w-8 h-8 rounded-full"
      />
      <span className="text-gray-700 font-medium">
        {currentUser.full_name}
      </span>
    </div>
  );
}
