import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as cartService from '../../services/cartService';
import { createOrder } from '../../services/orderService';
import { showToast, showAlert } from '../../utils/sweetAlert';
import { scrollToTop } from '../../utils/scrollTo';
import Loading from '../../components/Loading';

const ShoppingCart = () => {
    const [cart, setCart] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    useEffect(() => {
        getCart();
    }, []);

    const getCart = async () => {
        setIsLoading(true);
        try {
            const data = await cartService.getCart();
            setCart(data.data);
            scrollToTop();

        } catch (error) {
            showAlert('error', '取得購物車失敗', error.response?.data?.message || '發生錯誤');
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateCartItem = async (item, qty) => {
        setIsLoading(true);
        try {
            await cartService.updateCart(item.id, item.product_id, qty);
            getCart();
        } catch (error) {
            showAlert('error', '更新購物車失敗', error.response?.data?.message || '發生錯誤');
            setIsLoading(false);
        }
    };

    const handleRemoveCartItem = async (id) => {
        setIsLoading(true);
        try {
            await cartService.clearCart(id);
            getCart();
            showToast('success', '已移除商品');
        } catch (error) {
            showAlert('error', '移除商品失敗', error.response?.data?.message || '發生錯誤');
            setIsLoading(false);
        }
    };

    const handleClearCart = async () => {
        setIsLoading(true);
        try {
            await cartService.clearAllCart();
            getCart();
            showToast('success', '已清空購物車');
        } catch (error) {
            showAlert('error', '清空購物車失敗', error.response?.data?.message || '發生錯誤');
            setIsLoading(false);
        }
    };

    const onSubmit = async (data) => {
        setIsLoading(true);
        const { message, ...user } = data;
        const orderData = {
            user,
            message
        };

        try {
            const response = await createOrder(orderData);
            const orderId = response?.orderId;
            showToast('success', '訂單建立成功');
            reset(); // 重置表單
            navigate('/week5/orders', { state: { orderId } });
        } catch (error) {
            showAlert('error', '建立訂單失敗', error.response?.data?.message || '發生錯誤');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {isLoading && <Loading />}
            <div className="container mt-4">
                <div className="d-flex justify-content-between mb-4">
                    <h2>購物車列表</h2>
                </div>

                {cart.carts && cart.carts.length > 0 ? (
                    <div>
                        <div className="text-end mb-3">
                            <button className="btn btn-outline-danger" onClick={handleClearCart}>
                                清空購物車
                            </button>
                        </div>

                        {/* 電腦版 */}
                        <div className="table-responsive d-none d-md-block">
                            <table className="table align-middle">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>圖片</th>
                                        <th>品名</th>
                                        <th style={{ width: '150px' }}>數量/單位</th>
                                        <th className="text-end">單價</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.carts.map((item) => (
                                        <tr key={item.id}>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-danger btn-sm"
                                                    onClick={() => handleRemoveCartItem(item.id)}
                                                >
                                                    x
                                                </button>
                                            </td>
                                            <td>
                                                <div style={{ width: '80px', height: '80px', backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: `url(${item.product.imageUrl || ''})` }}
                                                    className="rounded bg-light border">
                                                    {!item.product.imageUrl && <span className="d-flex w-100 h-100 justify-content-center align-items-center text-secondary small">無圖</span>}
                                                </div>
                                            </td>
                                            <td>
                                                <span className="fw-bold">{item.product.title}</span>
                                                {item.coupon && <div className="text-success small">已套用優惠券：{item.coupon.title}</div>}
                                            </td>
                                            <td>
                                                <div className="input-group input-group-sm">
                                                    <button
                                                        className="btn btn-outline-secondary"
                                                        type="button"
                                                        onClick={() => handleUpdateCartItem(item, item.qty - 1)}
                                                        disabled={item.qty === 1}
                                                    >
                                                        -
                                                    </button>
                                                    <input
                                                        type="number"
                                                        className="form-control text-center p-0"
                                                        value={item.qty}
                                                        readOnly
                                                        style={{ maxWidth: '50px' }}
                                                    />
                                                    <button
                                                        className="btn btn-outline-secondary"
                                                        type="button"
                                                        onClick={() => handleUpdateCartItem(item, item.qty + 1)}
                                                    >
                                                        +
                                                    </button>
                                                    <span className="input-group-text" id="basic-addon2">{item.product.unit}</span>
                                                </div>
                                            </td>
                                            <td className="text-end">
                                                {item.final_total !== item.total ? (
                                                    <>
                                                        <small className="text-muted text-decoration-line-through">
                                                            ${item.total}
                                                        </small>
                                                        <br />
                                                        <small className="text-success">
                                                            折扣價：
                                                        </small>
                                                        ${item.final_total}
                                                    </>
                                                ) : (
                                                    `$${item.total}`
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan="4" className="text-end">總計</td>
                                        <td className="text-end">${cart.total}</td>
                                    </tr>
                                    {cart.final_total !== cart.total && (
                                        <tr>
                                            <td colSpan="4" className="text-end text-success">折扣價</td>
                                            <td className="text-end text-success">${cart.final_total}</td>
                                        </tr>
                                    )}
                                </tfoot>
                            </table>
                        </div>

                        {/* 手機板 */}
                        <div className="d-md-none">
                            {cart.carts.map((item) => (
                                <div key={item.id} className="card mb-3 shadow-sm border-0">
                                    <div className="row g-0">
                                        <div className="col-4 position-relative">
                                            <div style={{
                                                width: '100%',
                                                height: '100%',
                                                minHeight: '120px',
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                backgroundImage: `url(${item.product.imageUrl || ''})`
                                            }} className="rounded-start h-100 bg-light" >
                                                {!item.product.imageUrl && <span className="d-flex position-absolute top-50 start-50 translate-middle text-secondary small">無圖</span>}
                                            </div>
                                        </div>
                                        <div className="col-8">
                                            <div className="card-body py-2 px-3">
                                                <div className="d-flex justify-content-between align-items-start mb-2">
                                                    <span className="card-title fw-bold mb-0" style={{ marginRight: '24px', whiteSpace: 'normal', wordBreak: 'break-word', display: 'block' }}>
                                                        {item.product.title}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-danger btn-sm p-1 lh-1 position-absolute top-0 end-0 m-2"
                                                        onClick={() => handleRemoveCartItem(item.id)}
                                                    >
                                                        <small>x</small>
                                                    </button>
                                                </div>

                                                {item.coupon && <div className="text-success small mb-2">已套用優惠券：{item.coupon.title}</div>}

                                                <div className="d-flex justify-content-between align-items-end">
                                                    <div className="d-flex align-items-center">
                                                        <div className="input-group input-group-sm me-2" style={{ width: 'auto' }}>
                                                            <button
                                                                className="btn btn-outline-secondary"
                                                                type="button"
                                                                onClick={() => handleUpdateCartItem(item, item.qty - 1)}
                                                                disabled={item.qty === 1}
                                                                style={{ padding: '0.25rem 0.5rem' }}
                                                            >
                                                                -
                                                            </button>
                                                            <input
                                                                type="number"
                                                                className="form-control text-center p-0"
                                                                value={item.qty}
                                                                readOnly
                                                                style={{ width: '50px', minWidth: '40px' }}
                                                            />
                                                            <button
                                                                className="btn btn-outline-secondary"
                                                                type="button"
                                                                onClick={() => handleUpdateCartItem(item, item.qty + 1)}
                                                                style={{ padding: '0.25rem 0.5rem' }}
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                        <span className="small text-muted text-nowrap">{item.product.unit}</span>
                                                    </div>
                                                    <div className="text-end">
                                                        {item.final_total !== item.total ? (
                                                            <>
                                                                <small className="text-muted text-decoration-line-through d-block">
                                                                    ${item.total}
                                                                </small>
                                                                <span className="text-success fw-bold">
                                                                    ${item.final_total}
                                                                </span>
                                                            </>
                                                        ) : (
                                                            <span className="fw-bold fs-5">${item.total}</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="card shadow-sm border-0">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <span className="h5 mb-0">總計</span>
                                        <span className="h5 mb-0">${cart.total}</span>
                                    </div>
                                    {cart.final_total !== cart.total && (
                                        <div className="d-flex justify-content-between align-items-center text-success">
                                            <span>折扣價</span>
                                            <span className="fw-bold">${cart.final_total}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* 訂單資訊 */}
                        <div className="card shadow-sm border-0 mt-5 mb-5">
                            <div className="card-body">
                                <h3 className="card-title text-center mb-4">填寫訂購資訊</h3>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                            id="email"
                                            placeholder="請輸入 Email"
                                            {...register('email', {
                                                required: 'Email 為必填',
                                                pattern: {
                                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                    message: 'Email 格式不正確',
                                                },
                                            })}
                                        />
                                        {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">收件人姓名</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                            id="name"
                                            placeholder="請輸入姓名"
                                            {...register('name', { required: '姓名為必填' })}
                                        />
                                        {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="tel" className="form-label">收件人電話</label>
                                        <input
                                            type="tel"
                                            className={`form-control ${errors.tel ? 'is-invalid' : ''}`}
                                            id="tel"
                                            placeholder="請輸入電話"
                                            {...register('tel', {
                                                required: '電話為必填',
                                                minLength: {
                                                    value: 9,
                                                    message: '電話號碼需超過 9 碼'
                                                },
                                                pattern: {
                                                    value: /^09\d{8}$/,
                                                    message: '請輸入有效的台灣手機號碼 (09xxxxxxxx)',
                                                }
                                            })}
                                        />
                                        {errors.tel && <div className="invalid-feedback">{errors.tel.message}</div>}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="address" className="form-label">收件人地址</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                                            id="address"
                                            placeholder="請輸入地址"
                                            {...register('address', { required: '地址為必填' })}
                                        />
                                        {errors.address && <div className="invalid-feedback">{errors.address.message}</div>}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="message" className="form-label">留言</label>
                                        <textarea
                                            className="form-control"
                                            id="message"
                                            rows="3"
                                            placeholder="如果有什麼要告訴我們的..."
                                            {...register('message')}
                                        ></textarea>
                                    </div>

                                    <div className="text-end">
                                        <button type="submit" className="btn btn-danger btn-lg px-5">
                                            送出訂單
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                ) : (
                    <div className="alert alert-secondary text-center">
                        購物車內目前沒有商品
                    </div>
                )}
            </div>
        </>
    );
};

export default ShoppingCart;