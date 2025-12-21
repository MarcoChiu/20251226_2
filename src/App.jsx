import { RouterProvider, createHashRouter } from 'react-router-dom';
import { routes } from './routes';

export const App = () => {
  return (
    <RouterProvider router={createHashRouter(routes)} />
  )
}

export default App;

