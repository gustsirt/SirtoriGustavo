import { createLazyFileRoute } from '@tanstack/react-router'
import AssociateCard from '../../components/AssociateCard';

export const Route = createLazyFileRoute('/_public/')({
  component: Home,
})

const associates = [
  {
    name: 'Gustavo Sirtori',
    title: 'Desarrollador MERN & Analista de Datos',
    bio: 'Especialista en desarrollo de aplicaciones MERN y análisis de datos con más de 5 años de experiencia.',
    profileImage: 'https://via.placeholder.com/150',
    contact: 'gustavo.sirtori@gmail.com',
  },
  {
    name: 'John Doe',
    title: 'Frontend Developer',
    bio: 'Experto en React y Tailwind CSS, con una pasión por crear interfaces de usuario dinámicas y accesibles.',
    profileImage: 'https://via.placeholder.com/150',
    contact: 'john.doe@example.com',
  },
  {
    name: 'Jane Smith',
    title: 'Backend Developer',
    bio: 'Con un enfoque en Node.js y MongoDB, Jane ha liderado varios proyectos exitosos en la nube.',
    profileImage: 'https://via.placeholder.com/150',
    contact: 'jane.smith@example.com',
  },
  // Agrega más asociados según sea necesario...
];

function Home() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Asociados</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {associates.map((associate) => (
          <AssociateCard
            key={associate.name}
            name={associate.name}
            title={associate.title}
            bio={associate.bio}
            profileImage={associate.profileImage}
            contact={associate.contact}
          />
        ))}
      </div>
    </div>
  );
}