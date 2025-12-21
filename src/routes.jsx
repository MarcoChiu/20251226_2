import { lazy } from 'react';
import Layout from './components/Layout';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const PhotoLayout = lazy(() => import('./pages/photo/PhotoLayout'));
const PhotoIndex = lazy(() => import('./pages/photo/PhotoIndex'));
const PhotoDetail = lazy(() => import('./pages/photo/PhotoDetail'));
const PhotoQuery = lazy(() => import('./pages/photo/PhotoQuery'));
const PhotoParams = lazy(() => import('./pages/photo/PhotoParams'));
const Week1 = lazy(() => import('./pages/hw/Week1'));

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
        handle: { title: '首頁' },
        isShow: true,
      },
      {
        path: 'hw',
        handle: { title: '每堂作業' },
        isShow: true,
        children: [
          {
            index: true,
            element: <Week1 />,
            handle: { title: '第一堂 - 從函式拆解認識設計模式' },
            isShow: true,
          },
        ],
      },
      {
        path: 'about',
        element: <About />,
        handle: { title: '關於我' },
        isShow: false,
      },
      {
        path: 'photo',
        element: <PhotoLayout />,
        handle: { title: '相簿' },
        isShow: true,
        children: [
          {
            index: true,
            element: <PhotoIndex />,
            handle: { title: '歡迎使用照片搜尋系統' },
            isShow: true,
          },
          {
            path: 'detail',
            element: <PhotoDetail />,
            handle: { title: '照片詳情' },
            isShow: false,
          },
          {
            path: 'query',
            element: <PhotoQuery />,
            handle: { title: 'Query String 測試頁面' },
            isShow: true,
          },
          {
            path: 'params',
            element: <PhotoParams />,
            handle: { title: 'URL Params 測試頁面' },
            isShow: true,
          },
          {
            path: 'params/:id',
            element: <PhotoParams />,
            handle: { title: '參數詳情' },
            isShow: false,
          },
          {
            path: 'params/:id/:category',
            element: <PhotoParams />,
            handle: { title: '參數詳情' },
            isShow: false,
          },
          {
            path: 'params/:id/:category/:name',
            element: <PhotoParams />,
            handle: { title: '參數詳情' },
            isShow: false,
          },
        ],
      },
    ],
  },
];
