import { useAppStore } from "../../store/useAppStore";
import { crearURLCompleta } from "../others/urifoto";


export default function NavUser() {
  const { currentUser } = useAppStore();

  if (!currentUser) { return null; }

  console.log("!!!!!!!!!!!!!!!! ",currentUser);
  
  let initials = currentUser?.given_name?.charAt(0) + currentUser?.family_name?.charAt(0)
  console.log(initials);

  return (
    <div className="flex items-center space-x-2">
      {currentUser?.photo
      ? (
        <img className='flex justify-center items-center font-bold rounded-full w-8 h-8'
          src={currentUser.photo}
          alt="User Avatar"
        />)
      : <span className='flex justify-center items-center font-bold rounded-full w-8 h-8 uppercase'>
          {initials ? initials : "?"}
        </span>
      }
      <span className="text-gray-700 font-medium">
        {currentUser.full_name}
      </span>
    </div>
  );
}
