const PhotoIndex = () => {
    return (
        <div className="card">
            <div className="card-body">
                <h3 className="card-title">歡迎使用照片搜尋系統</h3>
                <hr />
                <h5>使用說明：</h5>
                <ul className="list-group list-group-flush mb-3">
                    <li className="list-group-item">
                        <strong>1. 輸入搜尋關鍵字</strong>
                        <p className="mb-0 text-muted">在左側搜尋框輸入至少 3 個字元的關鍵字</p>
                    </li>
                    <li className="list-group-item">
                        <strong>2. 點擊搜尋按鈕</strong>
                        <p className="mb-0 text-muted">系統會從 Unsplash 搜尋相關照片</p>
                    </li>
                    <li className="list-group-item">
                        <strong>3. 查看搜尋結果</strong>
                        <p className="mb-0 text-muted">搜尋完成後，此頁面會自動切換到照片顯示頁面</p>
                    </li>
                    <li className="list-group-item">
                        <strong>4. API 呼叫次數限制</strong>
                        <p className="mb-0 text-muted">Unsplash API 有呼叫次數限制，請注意剩餘次數提示</p>
                    </li>
                </ul>

                <div className="alert alert-info" role="alert">
                    <strong>提示：</strong>您可以搜尋任何主題，例如：nature、cat、mountain、ocean 等
                </div>

                <div className="alert alert-warning" role="alert">
                    <strong>注意：</strong>搜尋關鍵字必須至少包含 3 個字元才能進行搜尋
                </div>
            </div>
        </div>
    );
}


export default PhotoIndex;