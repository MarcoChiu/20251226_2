import { RouterProvider, createHashRouter } from 'react-router-dom';
import { routes } from './routes';
import { transformRoutes } from './components/Auth';

const App = () => {
  return (
    <RouterProvider router={createHashRouter(transformRoutes(routes))} />
  );
}

export default App;

