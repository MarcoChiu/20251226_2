
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
            <div className="text-center fade-in-up">
                <h1 className="display-1 fw-bold text-primary">404</h1>
                <p className="fs-3"> <span className="text-danger">Opps!</span> 找不到網頁.</p>
                <p className="lead">
                    請確定您的網址是否正確!!!.
                </p>
                <Link to="/" className="btn btn-primary btn-lg shadow-sm hover-effect">
                    回首頁
                </Link>
            </div>
            <style>
                {`
                .fade-in-up {
                    animation: fadeInUp 0.8s ease-out;
                }
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .hover-effect {
                    transition: transform 0.2s;
                }
                .hover-effect:hover {
                    transform: scale(1.05);
                }
                `}
            </style>
        </div>
    );
};

export default NotFound;
