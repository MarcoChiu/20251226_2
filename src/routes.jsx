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
        element: <Home />,
        title: '首頁',
        isShow: true
      },
      {
        path: 'about',
        element: <About />,
        title: '關於我',
        isShow: true
      },
      {
        path: 'photo',
        element: <PhotoLayout />,
        title: '相簿',
        isShow: true,
        children: [
          {
            index: true,
            element: <PhotoIndex />
          },
          {
            path: 'detail',
            isShow: false,
            element: <PhotoDetail />
          },
          {
            path: 'query',
            element: <PhotoQuery />,
            title: '查詢',
            isShow: true,
          },
          {
            path: 'params',
            element: <PhotoParams />,
            title: '路徑參數',
            isShow: true
          },
          {
            path: 'params/:id',
            element: <PhotoParams />,
            isShow: false,
          },
          {
            path: 'params/:id/:category',
            element: <PhotoParams />,
            isShow: false,
          },
          {
            path: 'params/:id/:category/:name',
            element: <PhotoParams />,
            isShow: false,
          }
        ]
      }
    ]
  }
];
