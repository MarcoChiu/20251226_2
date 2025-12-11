import { useOutletContext } from 'react-router-dom';

export   function PhotoDetail() {
    const { photos, loading, error } = useOutletContext();

    if (loading) {
        return (
            <div className="text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">載入中...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger" role="alert">
                {error}
            </div>
        );
    }

    if (!photos || photos.length === 0) {
        return (
            <div className="alert alert-info" role="alert">
                請在左側輸入搜尋關鍵字來搜尋照片
            </div>
        );
    }

    return (
        <div>
            <h3 className="mb-4">搜尋結果 ({photos.length} 張照片)</h3>
            <div className="row">
                {photos.map((photo) => (
                    <div key={photo.id} className="col-md-6 mb-4">
                        <div className="card">
                            <img 
                                src={photo.urls.small} 
                                className="card-img-top" 
                                alt={photo.alt_description || 'Photo'}
                            />
                            <div className="card-body">
                                <h5 className="card-title">
                                    {photo.alt_description || 'Untitled'}
                                </h5>
                                <p className="card-text">
                                    <small className="text-muted">
                                        攝影師: {photo.user.name}
                                    </small>
                                </p>
                                <a 
                                    href={photo.links.html} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="btn btn-sm btn-outline-primary"
                                >
                                    在 Unsplash 查看
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}