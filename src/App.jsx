import { RouterProvider, createHashRouter } from 'react-router-dom';
import { routes } from './routes';

function App() {
  return (
    <RouterProvider router={createHashRouter(routes)} />
  )
}

export default App
