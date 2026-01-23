import { useEffect, useState, useRef } from 'react';
import { getOrders, getOrder } from '../../services/orderService';
import OrderModal from '../../components/OrderModal';
import Loading from '../../components/Loading';
import Pagination from '../../components/Pagination';
import { showAlert } from '../../utils/sweetAlert';
import { scrollToTop } from '../../utils/scrollTo';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [pagination, setPagination] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const orderModalRef = useRef(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async (page = 1) => {
        setIsLoading(true);
        try {
            const data = await getOrders(page);
            setOrders(data.orders);
            setPagination(data.pagination);
            scrollToTop();

        } catch (error) {
            showAlert('error', '取得訂單列表失敗', error.response?.data?.message || '發生錯誤');
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenModal = async (orderId) => {
        setIsLoading(true);
        try {
            const data = await getOrder(orderId);
            orderModalRef.current.show(data.order);
        } catch (error) {
            showAlert('error', '取得訂單細節失敗', error.response?.data?.message || '發生錯誤');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {isLoading && <Loading />}
            <OrderModal ref={orderModalRef} onPaymentSuccess={() => fetchOrders(pagination.current_page)} />
            <div className="container mt-4">
                <h2 className="mb-4">訂單列表</h2>
                {/* 電腦版 */}
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden d-none d-md-block">
                    <div className="card-body p-0">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light text-secondary border-bottom">
                                <tr>
                                    <th className="py-3 ps-4">訂單編號</th>
                                    <th className="py-3">下單時間</th>
                                    <th className="py-3">Email</th>
                                    <th className="py-3">選購商品</th>
                                    <th className="py-3">總金額</th>
                                    <th className="py-3">付款狀態</th>
                                    <th className="py-3 pe-4 text-end">操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id}>
                                        <td className="ps-4 text-secondary">
                                            <span className="font-monospace small">{order.id}</span>
                                        </td>
                                        <td className="text-secondary small">
                                            {new Date(order.create_at * 1000).toLocaleString()}
                                        </td>
                                        <td>
                                            <span className="text-dark fw-medium">{order.user?.email}</span>
                                        </td>
                                        <td style={{ minWidth: '250px' }}>
                                            <ul className="list-unstyled mb-0">
                                                {Object.values(order.products).map((product) => (
                                                    <li key={product.id} className="text-secondary small d-flex align-items-center mb-1">
                                                        <i className="bi bi-box-seam me-2 text-primary-subtle"></i>
                                                        <span className="text-truncate" style={{ maxWidth: '200px' }}>{product.product.title}</span>
                                                        <span className="ms-2 badge bg-light text-secondary border">x{product.qty}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </td>
                                        <td className="fw-bold text-primary">${order.total}</td>
                                        <td>
                                            {order.is_paid ? (
                                                <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-3">
                                                    <i className="bi bi-check-circle-fill me-1"></i>已付款
                                                </span>
                                            ) : (
                                                <span className="badge bg-danger-subtle text-danger border border-danger-subtle rounded-pill px-3">
                                                    <i className="bi bi-exclamation-circle-fill me-1"></i>未付款
                                                </span>
                                            )}
                                        </td>
                                        <td className="pe-4 text-end">
                                            <button
                                                type="button"
                                                className="btn btn-primary btn-sm rounded-pill px-3"
                                                onClick={() => handleOpenModal(order.id)}
                                            >
                                                查看細節
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 手機板 */}
                <div className="d-md-none">
                    {orders.map((order) => (
                        <div className="card mb-4 shadow-sm border-0 rounded-3" key={order.id}>
                            <div className="card-header bg-white py-3 border-0">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <span className="badge bg-secondary-subtle text-secondary-emphasis rounded-pill px-3">
                                        訂單編號: {order.id?.substring(0, 10)}...
                                    </span>
                                    {order.is_paid ? (
                                        <span className="badge bg-success-subtle text-success rounded-pill">已付款</span>
                                    ) : (
                                        <span className="badge bg-danger-subtle text-danger rounded-pill">未付款</span>
                                    )}
                                </div>
                                <div className="text-muted small">
                                    {new Date(order.create_at * 1000).toLocaleString()}
                                </div>
                            </div>
                            <div className="card-body pt-0">
                                <div className="mb-3">
                                    <label className="text-muted small form-label mb-1">Email</label>
                                    <div className="text-break fw-medium">{order.user?.email}</div>
                                </div>

                                <div className="mb-3">
                                    <label className="text-muted small form-label mb-1">選購商品</label>
                                    <div className="bg-light p-3 rounded-3">
                                        <ul className="list-unstyled mb-0">
                                            {Object.values(order.products).map((product) => (
                                                <li key={product.id} className="d-flex justify-content-between align-items-center mb-2 last:mb-0">
                                                    <span className="text-truncate text-secondary" style={{ maxWidth: '70%' }}>{product.product.title}</span>
                                                    <span className="text-nowrap fw-medium">x {product.qty}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="border-top pt-3 mt-2">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <small className="text-muted d-block mb-1">總金額</small>
                                            <div className="fs-4 fw-bold text-primary">${order.total}</div>
                                        </div>
                                        <button
                                            type="button"
                                            className="btn btn-primary px-4 rounded-pill"
                                            onClick={() => handleOpenModal(order.id)}
                                        >
                                            查看細節
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 分頁 */}
                <Pagination
                    currentPage={pagination.current_page}
                    totalPages={pagination.total_pages}
                    onPageChange={fetchOrders}
                />
            </div>
        </>
    );
};

export default Orders;
