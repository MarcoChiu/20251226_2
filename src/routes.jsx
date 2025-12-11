import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { PhotoLayout } from './pages/photo/PhotoLayout';
import { PhotoIndex } from './pages/photo/PhotoIndex';
import { PhotoDetail } from './pages/photo/PhotoDetail';
import { PhotoQuery } from './pages/photo/PhotoQuery';
import { PhotoParams } from './pages/photo/PhotoParams';

// Layout 元件包含 NavBar
function Layout() {
  return (
    <>
      <NavBar />
      <div className='App'>
        <Outlet />
      </div>
    </>
  );
}

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'photo',
        element: <PhotoLayout />,
        children: [
          {
            index: true,
            element: <PhotoIndex />
          },
          {
            path: 'detail',
            element: <PhotoDetail />
          },
          {
            path: 'query',
            element: <PhotoQuery />
          },
          {
            path: 'params',
            element: <PhotoParams />
          },
          {
            path: 'params/:id',
            element: <PhotoParams />
          },
          {
            path: 'params/:id/:category',
            element: <PhotoParams />
          },
          {
            path: 'params/:id/:category/:name',
            element: <PhotoParams />
          }
        ]
      }
    ]
  }
];
