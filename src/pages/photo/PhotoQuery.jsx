import { useSearchParams, Link } from 'react-router-dom';

export  function PhotoQuery() {
    const [searchParams] = useSearchParams();
    
    // 從 URL 取得參數
    const id = searchParams.get('id') || '';
    const category = searchParams.get('category') || '';
    const name = searchParams.get('name') || '';

    // 取得所有 query parameters
    const allParams = {};
    for (let [key, value] of searchParams.entries()) {
        allParams[key] = value;
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Query String 測試頁面</h2>

            {/* 顯示當前的 Query Parameters */}
            <div className="card mb-4">
                <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">目前的 Query Parameters</h5>
                </div>
                <div className="card-body">
                    {Object.keys(allParams).length > 0 ? (
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>參數名稱</th>
                                    <th>參數值</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(allParams).map(([key, value]) => (
                                    <tr key={key}>
                                        <td><code>{key}</code></td>
                                        <td><code>{value}</code></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-muted mb-0">目前沒有任何 query parameters</p>
                    )}
                    <div className="mt-3">
                        <strong>完整 URL:</strong>
                        <br />
                        <code>{window.location.href}</code>
                    </div>
                </div>
            </div>

            {/* 顯示個別參數值 */}
            <div className="card mb-4">
                <div className="card-header">
                    <h5 className="mb-0">參數詳情</h5>
                </div>
                <div className="card-body">
                    <div className="row g-3">
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-body">
                                    <h6 className="card-subtitle mb-2 text-muted">ID</h6>
                                    <p className="card-text">
                                        {id ? <code className="fs-5">{id}</code> : <span className="text-muted">未設定</span>}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-body">
                                    <h6 className="card-subtitle mb-2 text-muted">Category</h6>
                                    <p className="card-text">
                                        {category ? <code className="fs-5">{category}</code> : <span className="text-muted">未設定</span>}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-body">
                                    <h6 className="card-subtitle mb-2 text-muted">Name</h6>
                                    <p className="card-text">
                                        {name ? <code className="fs-5">{name}</code> : <span className="text-muted">未設定</span>}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 測試連結 */}
            <div className="card mb-4">
                <div className="card-header">
                    <h5 className="mb-0">測試連結</h5>
                </div>
                <div className="card-body">
                    <p className="text-muted">點擊下方連結測試不同的 query string 組合</p>
                    <div className="d-flex flex-wrap gap-2">
                        <Link to="/photo/query?id=123" className="btn btn-outline-primary btn-sm">
                            ?id=123
                        </Link>
                        <Link to="/photo/query?id=456&category=nature" className="btn btn-outline-primary btn-sm">
                            ?id=456&category=nature
                        </Link>
                        <Link to="/photo/query?id=789&category=people&name=john" className="btn btn-outline-primary btn-sm">
                            ?id=789&category=people&name=john
                        </Link>
                        <Link to="/photo/query" className="btn btn-outline-secondary btn-sm">
                            清空參數
                        </Link>
                    </div>
                </div>
            </div>

            {/* 使用說明 */}
            <div className="card">
                <div className="card-header">
                    <h5 className="mb-0">使用說明</h5>
                </div>
                <div className="card-body">
                    <h6>useParams vs useSearchParams 差異：</h6>
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>useParams</th>
                                    <th>useSearchParams</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>URL 格式</strong></td>
                                    <td><code>/photo/params/123/nature</code></td>
                                    <td><code>/photo/query?id=123&category=nature</code></td>
                                </tr>
                                <tr>
                                    <td><strong>路由設定</strong></td>
                                    <td><code>path="/params/:id/:category?"</code></td>
                                    <td><code>path="/query"</code></td>
                                </tr>
                                <tr>
                                    <td><strong>取值方式</strong></td>
                                    <td><code>const {`{id}`} = useParams()</code></td>
                                    <td><code>searchParams.get('id')</code></td>
                                </tr>
                                <tr>
                                    <td><strong>特點</strong></td>
                                    <td>RESTful 風格，較簡潔</td>
                                    <td>可選參數，較靈活</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h6 className="mt-3">範例：</h6>
                    <ul>
                        <li>URL: <code>/photo/query?id=123&category=nature&name=john</code></li>
                        <li><code>searchParams.get('id')</code> - 取得 id 參數</li>
                        <li><code>searchParams.get('category')</code> - 取得 category 參數</li>
                        <li>所有參數都是可選的，不需要在路由中定義</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}