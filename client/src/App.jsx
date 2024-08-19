import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const router = createRouter({
  routeTree,
  context: { authentication: null },
  defaultNotFoundComponent: () => <div>Global Not Found 🙄</div>, // 404
});

// en las rutas anidadas para el 404 se pone esto tras el componente
// notFoundComponent: () => (
//     <div>I'm the Not found page, inside /visibleLayout</div>
//   ),

function App() {
  const authentication = useAuth();
  return <RouterProvider router={router} />;
}

export default App

// Tanstack Router
// https://www.youtube.com/watch?v=HKS9gLHhz2s
// Tanstack Form
// https://www.youtube.com/watch?v=Pf1qn35bgjs
