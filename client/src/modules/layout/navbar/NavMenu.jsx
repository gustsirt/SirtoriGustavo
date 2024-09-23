import { Link } from "@tanstack/react-router";

const publicNavItems = [
  { name: 'Home', path: '/' },
  { name: 'Login', path: '/login' },
  { name: 'Register', path: '/register' },
  { name: 'Private', path: '/private' },
];

const privateNavItems = [
  { name: 'Private', path: '/private' },
  { name: 'Profile', path: '/profile' },
  { name: 'Contributions', path: '/contributions' },
  { name: 'Logout', path: '/logout' },
  { name: 'HomePublic', path: '/' },
];

export default function NavMenu({ type = 'public', layout = 'desktop' }) {
  const navItems = type === 'public' ? publicNavItems : privateNavItems;

  // Vista para dispositivos desktop
  if (layout === 'desktop') {
    return (
      <div className="hidden sm:block sm:ml-6">
        <div className="flex space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="text-gray-700 hover:bg-gray-100 hover:text-indigo-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  // Vista para dispositivos móviles
  if (layout === 'mobile') {
    return (
      <div className="sm:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="text-gray-700 hover:bg-gray-100 hover:text-indigo-700 block px-3 py-2 rounded-md text-base font-medium"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
