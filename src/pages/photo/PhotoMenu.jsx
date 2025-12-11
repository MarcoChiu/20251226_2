import { useState } from 'react';

export   function PhotoMenu({ onSearch, loading, error, remainingCalls }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            onSearch(searchTerm.trim()); //將文字帶入給onSearch(父元件的fetchPhotos)
        }
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div>
            <h4>搜尋照片</h4>
            
            <form onSubmit={handleSearch} className="mb-3">
                <div className="input-group">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="輸入搜尋關鍵字 (至少3個字)" 
                        value={searchTerm}
                        onChange={handleInputChange}
                        disabled={loading}
                    />
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        disabled={loading || searchTerm.length < 3}
                    >
                        {loading ? '搜尋中...' : '搜尋'}
                    </button>
                </div>
                <small className="form-text text-muted">
                    已輸入 {searchTerm.length} 個字元 (需要至少 3 個)
                </small>
            </form>

            {remainingCalls !== null && (
                <div className="alert alert-info" role="alert">
                    剩餘 API 呼叫次數: {remainingCalls}
                </div>
            )}
            
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
        </div>
    )
}