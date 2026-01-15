import { useEffect, useState } from 'react';
import * as cartService from '../../services/cartService';
import Swal from 'sweetalert2';
import Loading from '../../components/Loading';

const ShoppingCart = () => {
    const [cart, setCart] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getCart();
    }, []);

    const getCart = async () => {
        setIsLoading(true);
        try {
            const data = await cartService.getCart();
            setCart(data.data);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '取得購物車失敗',
                text: error.response?.data?.message || '發生錯誤'
            });
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
            Swal.fire({
                icon: 'error',
                title: '更新購物車失敗',
                text: error.response?.data?.message || '發生錯誤'
            });
            setIsLoading(false);
        }
    };

    const handleRemoveCartItem = async (id) => {
        setIsLoading(true);
        try {
            await cartService.clearCart(id);
            getCart();
            Swal.fire({
                icon: 'success',
                title: '已移除商品',
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '移除商品失敗',
                text: error.response?.data?.message || '發生錯誤'
            });
            setIsLoading(false);
        }
    };

    const handleClearCart = async () => {
        setIsLoading(true);
        try {
            await cartService.clearAllCart();
            getCart();
            Swal.fire({
                icon: 'success',
                title: '已清空購物車',
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '清空購物車失敗',
                text: error.response?.data?.message || '發生錯誤'
            });
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
                        <div className="table-responsive">
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
                                                {item.product.title}
                                                {item.coupon && <div className="text-success small">已套用優惠券：{item.coupon.title}</div>}
                                            </td>
                                            <td>
                                                <div className="input-group input-group-sm">
                                                    <select
                                                        className="form-select"
                                                        value={item.qty}
                                                        onChange={(e) => handleUpdateCartItem(item, Number(e.target.value))}
                                                    >
                                                        {[...Array(20)].map((_, i) => (
                                                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                                                        ))}
                                                    </select>
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
                    </div>
                ) : (
                    <div className="alert alert-secondary text-center">
                        購物車內目前沒有商品
                    </div>
                )}
            </div>
        </>
    );
}

export default ShoppingCart;