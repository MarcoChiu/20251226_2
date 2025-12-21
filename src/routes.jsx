import { useEffect } from 'react';
import { Outlet, useLocation, matchRoutes } from 'react-router-dom';
import NavBar from './components/NavBar';
import { Home } from './pages/Home';
import { About } from './pages/About';
//Router練習
import { PhotoLayout } from './pages/photo/PhotoLayout';
import { PhotoIndex } from './pages/photo/PhotoIndex';
import { PhotoDetail } from './pages/photo/PhotoDetail';
import { PhotoQuery } from './pages/photo/PhotoQuery';
import { PhotoParams } from './pages/photo/PhotoParams';
//作業區
import { Week1 } from './pages/hw/Week1';



// Layout 元件包含 NavBar
export function Layout() {
  const location = useLocation();

  useEffect(() => {
    const matched = matchRoutes(routes, location);
    if (matched) {
      // 取得最後一條匹配到的路由（最深層的子路由）
      const lastRoute = matched[matched.length - 1].route;
      const title = lastRoute?.title || 'React班作業';
      document.title = title;
    }
  }, [location]);

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
        isShow: false
      },
      {
        path: 'hw',
        title: '作業2025 React 作品實戰冬季班',
        isShow: true,
        children: [
          {
            index: true,
            element: <Week1 />,
            title: '第一週 - 從函式拆解認識設計模式',
            isShow: true
          }
        ]
      },
      {
        path: 'about',
        element: <About />,
        title: '關於我',
        isShow: false
      },
      {
        path: 'photo',
        element: <PhotoLayout />,
        title: '相簿',
        isShow: false,
        children: [
          {
            index: true,
            element: <PhotoIndex />,
            title: '歡迎使用照片搜尋系統',
            isShow: true
          },
          {
            path: 'detail',
            element: <PhotoDetail />,
            title: '照片詳情',
            isShow: false
          },
          {
            path: 'query',
            element: <PhotoQuery />,
            title: 'Query String 測試頁面',
            isShow: true,
          },
          {
            path: 'params',
            element: <PhotoParams />,
            title: 'URL Params 測試頁面',
            isShow: true
          },
          {
            path: 'params/:id',
            element: <PhotoParams />,
            title: '參數詳情',
            isShow: false
          },
          {
            path: 'params/:id/:category',
            element: <PhotoParams />,
            title: '參數詳情',
            isShow: false
          },
          {
            path: 'params/:id/:category/:name',
            element: <PhotoParams />,
            title: '參數詳情',
            isShow: false
          }
        ]
      }
    ]
  }
];
