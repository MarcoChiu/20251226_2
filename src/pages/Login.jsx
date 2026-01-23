import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { setToken } from '../utils/frontCookie';
import Loading from '../components/Loading';
import { showToast, showAlert } from '../utils/sweetAlert';
import { login } from '../services/authService';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await login({
                username: data.email,
                password: data.password,
            });

            const { token, expired } = response;
            if (token) {
                await showToast('success', '登入成功');

                setToken(token, expired);
                // 轉址邏輯：如果有來源頁面則轉回來源，否則回到首頁
                const from = location.state?.from?.pathname || "/";
                navigate(from, { replace: true });
            }

        } catch (error) {
            showAlert('error', '登入失敗', error.response?.data?.message || '發生錯誤');
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
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                            id="email"
                                            placeholder="請輸入email name@example.com"
                                            {...register('email', {
                                                required: 'Email 為必填',
                                                pattern: {
                                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                    message: 'Email 格式不正確',
                                                },
                                            })}
                                        />
                                        {errors.email && (
                                            <div className="invalid-feedback">{errors.email.message}</div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">
                                            密碼
                                        </label>
                                        <input
                                            type="password"
                                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                            id="password"
                                            placeholder="請輸入密碼"
                                            {...register('password', {
                                                required: '密碼為必填',
                                            })}
                                        />
                                        {errors.password && (
                                            <div className="invalid-feedback">{errors.password.message}</div>
                                        )}
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
