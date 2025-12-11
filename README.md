# React Router DOM 學習專案

這是一個使用 React Router DOM v7 建立的學習專案，展示了路由的各種功能與用法。

## 專案技術棧

- React 19.2.0
- React Router DOM 7.10.1
- Vite 7.2.4
- Bootstrap 5.3.8
- Axios (用於 API 請求)

## 專案結構

```
src/
├── App.jsx                 # 主應用程式，設定 RouterProvider
├── routes.jsx             # 路由配置檔案
├── components/
│   └── NavBar.jsx         # 導航列元件
├── pages/
│   ├── Home.jsx           # 首頁
│   ├── About.jsx          # 關於頁面
│   ├── UrlGenerator.jsx   # URL 編號產生器
│   ├── YouTubeInfo.jsx    # YouTube 影片資訊查詢
│   └── photo/
│       ├── PhotoLayout.jsx    # 相簿佈局（父路由）
│       ├── PhotoIndex.jsx     # 相簿首頁
│       ├── PhotoDetail.jsx    # 照片詳情頁
│       ├── PhotoMenu.jsx      # 照片選單
│       ├── PhotoQuery.jsx     # Query String 範例
│       └── PhotoParams.jsx    # URL Params 範例
└── assets/
    └── all.scss           # 樣式檔案
```

## React Router DOM 功能展示

### 1. 基本路由設定

使用 `createHashRouter` 建立路由：

```jsx
import { RouterProvider, createHashRouter } from 'react-router-dom';
import { routes } from './routes';

function App() {
  return <RouterProvider router={createHashRouter(routes)} />
}
```

### 2. 巢狀路由 (Nested Routes)

在 `routes.jsx` 中使用 `children` 建立巢狀路由：

```jsx
{
  path: '/',
  element: <Layout />,
  children: [
    { index: true, element: <Home /> },
    { path: 'about', element: <About /> },
    {
      path: 'photo',
      element: <PhotoLayout />,
      children: [
        { index: true, element: <PhotoIndex /> },
        { path: 'detail', element: <PhotoDetail /> }
      ]
    }
  ]
}
```

### 3. Layout 元件

使用 `<Outlet />` 渲染子路由：

```jsx
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
```

### 4. URL Parameters (動態路由)

**檔案：** `PhotoParams.jsx`

展示如何使用 `useParams` 取得 URL 參數：

```jsx
import { useParams } from 'react-router-dom';

function PhotoParams() {
  const { id, category, name } = useParams();
  // ...
}
```

**路由設定：**

```jsx
{ path: 'params/:id/:category/:name', element: <PhotoParams /> }
```

**URL 範例：**
- `#/photo/params/123`
- `#/photo/params/456/nature`
- `#/photo/params/789/people/john`

### 5. Query String

**檔案：** `PhotoQuery.jsx`

展示如何使用 `useSearchParams` 處理查詢字串：

```jsx
import { useSearchParams } from 'react-router-dom';

function PhotoQuery() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const category = searchParams.get('category');
  // ...
}
```

**URL 範例：**
- `#/photo/query?id=123&category=nature`
- `#/photo/query?name=john&page=2`

### 6. 程式化導航

在 `PhotoLayout.jsx` 中使用 `useNavigate` 進行導航：

```jsx
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();
navigate('/photo/detail'); // 導航到指定路徑
```

### 7. Link 元件

在 `NavBar.jsx` 中使用 `Link` 建立導航連結：

```jsx
import { Link } from 'react-router-dom';

<Link to="/" className="nav-link">Home</Link>
<Link to="/about" className="nav-link">About</Link>
```

### 8. Outlet Context

在父路由傳遞資料給子路由：

```jsx
// 父元件
<Outlet context={{ photos, loading, error }} />

// 子元件
import { useOutletContext } from 'react-router-dom';
const { photos, loading, error } = useOutletContext();
```

## 功能頁面說明

### 📸 相簿功能 (`/photo`)

- **PhotoLayout**: 父佈局，使用 Axios 呼叫 Unsplash API
- **PhotoIndex**: 說明頁面，展示使用方式
- **PhotoDetail**: 顯示搜尋結果，接收來自 Outlet Context 的資料
- **PhotoMenu**: 搜尋表單，需輸入至少 3 個字元

### 🔗 URL 產生器 (`/urlgenerator`)

自動解析 URL 並產生遞增編號的檔案連結。

### 📺 YouTube 資訊查詢 (`/youtube`)

使用 YouTube oEmbed API 查詢影片資訊。

## useParams vs useSearchParams 比較

| 特性 | useParams | useSearchParams |
|------|-----------|-----------------|
| URL 格式 | `/photo/params/123/nature` | `/photo/query?id=123&category=nature` |
| 路由設定 | `path: "params/:id/:category"` | `path: "query"` |
| 取值方式 | `const {id} = useParams()` | `searchParams.get('id')` |
| 參數類型 | 必須在路由中定義 | 完全可選，靈活性高 |
| 適用場景 | RESTful API、資源識別 | 篩選、分頁、可選參數 |

## 安裝與執行

```bash
# 安裝相依套件
npm install

# 啟動開發伺服器
npm run dev

# 建置專案
npm run build
```

## 學習重點

1. ✅ Hash Router vs Browser Router
2. ✅ 巢狀路由與 Outlet
3. ✅ URL Parameters (useParams)
4. ✅ Query String (useSearchParams)
5. ✅ 程式化導航 (useNavigate)
6. ✅ Link 元件
7. ✅ Outlet Context 資料傳遞
8. ✅ 路由配置模組化

## 注意事項

- 本專案使用 **Hash Router**，URL 會包含 `#` 符號
- 若要改用 Browser Router，將 `createHashRouter` 改為 `createBrowserRouter`
- NavBar 元件必須在 Router Context 內才能使用 `useLocation` 等 hooks

## 參考資源

- [React Router 官方文件](https://reactrouter.com/)
- [React Router v7 Migration Guide](https://reactrouter.com/upgrading/v6)
