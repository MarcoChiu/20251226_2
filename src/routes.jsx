import { lazy } from 'react';
import Layout from './layouts/Layout';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const PhotoLayout = lazy(() => import('./pages/photo/PhotoLayout'));
const PhotoIndex = lazy(() => import('./pages/photo/PhotoIndex'));
const PhotoDetail = lazy(() => import('./pages/photo/PhotoDetail'));
const PhotoQuery = lazy(() => import('./pages/photo/PhotoQuery'));
const PhotoParams = lazy(() => import('./pages/photo/PhotoParams'));
const Week1 = lazy(() => import('./pages/hw/Week1'));
const Week2 = lazy(() => import('./pages/hw/Week2'));
const Week3 = lazy(() => import('./pages/hw/Week3'));
const Week4 = lazy(() => import('./pages/hw/Week4'));
const Login = lazy(() => import('./pages/Login'));

const ProductList = lazy(() => import('./pages/week5/ProductList'));
const ShoppingCart = lazy(() => import('./pages/week5/ShoppingCart'));


export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home />, title: '首頁', isShow: true },
      { path: 'about', element: <About />, title: '關於我', isShow: true },
      {
        path: 'hw', title: '第一至四週作業', isShow: true, children:
          [
            { index: true, element: <Week1 />, title: '第一週 - 從函式拆解認識設計模式', isShow: true },
            { path: 'week2', element: <Week2 />, title: '第二週 - RESTful API 串接', isShow: true, isAuth: true },
            { path: 'week3', element: <Week3 />, title: '第三週 - 熟練 React.js', isShow: true, isAuth: true },
            { path: 'week4', element: <Week4 />, title: '第四週 - 元件化', isShow: true, isAuth: true },
          ],
      },
      {
        path: 'week5', title: '第五週 - Vite、React Router', isShow: true, children:
          [
            { index: true, element: <ProductList />, title: '商品列表', isShow: true, isAuth: true },
            { path: 'cart', element: <ShoppingCart />, title: '購物車', isShow: true, isAuth: true },
          ],
      },
      {
        path: 'photo', element: <PhotoLayout />, title: '相簿', isShow: true, isAuth: true,
        children: [
          { index: true, element: <PhotoIndex />, title: '歡迎使用照片搜尋系統', isShow: true },
          { path: 'detail', element: <PhotoDetail />, title: '照片詳情', isShow: false },
          { path: 'query', element: <PhotoQuery />, title: 'Query String 測試頁面', isShow: true },
          { path: 'params', element: <PhotoParams />, title: 'URL Params 測試頁面', isShow: true },
          { path: 'params/:id', element: <PhotoParams />, title: '參數詳情', isShow: false },
          { path: 'params/:id/:category', element: <PhotoParams />, title: '參數詳情', isShow: false },
          { path: 'params/:id/:category/:name', element: <PhotoParams />, title: '參數詳情', isShow: false },
        ],
      },
      {
        path: 'login', element: <Login />, title: '登入', isShow: false,
      },
    ],
  },
];

