import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { setToken } from '../utils/frontCookie';
import Loading from '../components/Loading';
import Swal from 'sweetalert2';
import { login } from '../services/authService';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const data = await login({
                username: formData.email,
                password: formData.password,
            });
            //console.log('Login success:', data);

            const { token, expired } = data;
            if (token) {
                await Swal.fire({
                    icon: 'success',
                    title: '登入成功',
                    showConfirmButton: false,
                    timer: 1500
                });

                setToken(token, expired);
                // 轉址邏輯：如果有來源頁面則轉回來源，否則回到首頁
                const from = location.state?.from?.pathname || "/";
                navigate(from, { replace: true });
            }

        } catch (error) {
            //console.error('Login failed:', error);
            Swal.fire({
                icon: 'error',
                title: '登入失敗',
                text: error.response?.data?.message || '發生錯誤'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {isLoading && <Loading />}
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-4">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h2 className="card-title text-center mb-4">登入</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            placeholder="請輸入email name@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">
                                            密碼
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            name="password"
                                            placeholder="請輸入密碼"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="d-grid gap-2">
                                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                                            登入
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
