import { Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PhotoMenu from './PhotoMenu.jsx';
import { searchPhotos } from '../../services/unsplashService';



const PhotoLayout = () => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [remainingCalls, setRemainingCalls] = useState(null);
    const navigate = useNavigate();

    const fetchPhotos = async (query) => {
        if (query.length < 3) {
            setError('搜尋字串至少需要 3 個字元');
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const response = await searchPhotos(query);
            setPhotos(response.data.results);

            // 從 response headers 取得剩餘呼叫次數
            const remaining = response.headers['x-ratelimit-remaining'];
            setRemainingCalls(remaining);

            console.log('Photos fetched:', response.data.results);
            console.log('Remaining API calls:', remaining);

            // 搜尋成功後自動導航到 detail 頁面
            navigate('/photo/detail');
        } catch (err) {
            setError(err.message);
            console.error('Error fetching photos:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-4">
                    <PhotoMenu
                        onSearch={fetchPhotos}
                        loading={loading}
                        error={error}
                        remainingCalls={remainingCalls}
                    />
                </div>
                <div className="col-8">
                    <Outlet context={{ photos, loading, error }} />
                </div>
            </div>
        </div>
    )
}

export default PhotoLayout;