import { useEffect, useRef, useImperativeHandle, forwardRef, useState } from 'react';
import { Modal } from 'bootstrap';

const OrderModal = forwardRef((props, ref) => {
    const modalRef = useRef(null);
    const modalInstance = useRef(null);
    const [tempOrder, setTempOrder] = useState(null);

    useEffect(() => {
        modalInstance.current = new Modal(modalRef.current);
    }, []);

    useImperativeHandle(ref, () => ({
        show: (order) => {
            setTempOrder(order);
            modalInstance.current.show();
        },
        hide: () => {
            modalInstance.current.hide();
        }
    }));

    if (!tempOrder) return (
        <div id="orderModal" ref={modalRef} className="modal fade" tabIndex="-1" aria-labelledby="orderModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content"></div>
            </div>
        </div>
    );

    return (
        <div id="orderModal" ref={modalRef} className="modal fade" tabIndex="-1" aria-labelledby="orderModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content border-0 shadow-lg">
                    <div className="modal-header bg-dark text-white border-0 py-3">
                        <h5 className="modal-title d-flex align-items-center gap-2" id="orderModalLabel">
                            <i className="bi bi-receipt"></i> 訂單細節
                        </h5>
                        <button type="button" className="btn-close btn-close-white" onClick={() => modalInstance.current.hide()} aria-label="Close"></button>
                    </div>

                    <div className="modal-body p-4 bg-light">
                        <div className="row g-4 mb-4">
                            <div className="col-md-6">
                                <div className="card h-100 border-0 shadow-sm">
                                    <div className="card-header bg-white border-bottom-0 pt-3 pb-0">
                                        <h6 className="card-title mb-0 fw-bold text-primary">
                                            <i className="bi bi-person-fill me-2"></i>顧客資訊
                                        </h6>
                                    </div>
                                    <div className="card-body">
                                        <table className="table table-borderless table-sm mb-0">
                                            <tbody>
                                                <tr>
                                                    <th className="text-secondary w-25">姓名</th>
                                                    <td className="fw-medium">{tempOrder.user.name}</td>
                                                </tr>
                                                <tr>
                                                    <th className="text-secondary">Email</th>
                                                    <td className="fw-medium text-break">{tempOrder.user.email}</td>
                                                </tr>
                                                <tr>
                                                    <th className="text-secondary">電話</th>
                                                    <td className="fw-medium">{tempOrder.user.tel}</td>
                                                </tr>
                                                <tr>
                                                    <th className="text-secondary">地址</th>
                                                    <td className="fw-medium text-break">{tempOrder.user.address}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card h-100 border-0 shadow-sm">
                                    <div className="card-header bg-white border-bottom-0 pt-3 pb-0">
                                        <h6 className="card-title mb-0 fw-bold text-primary">
                                            <i className="bi bi-info-circle-fill me-2"></i>訂單資訊
                                        </h6>
                                    </div>
                                    <div className="card-body">
                                        <table className="table table-borderless table-sm mb-0">
                                            <tbody>
                                                <tr>
                                                    <th className="text-secondary w-25">訂單編號</th>
                                                    <td className="fw-medium text-truncate" style={{ maxWidth: '150px' }} title={tempOrder.id}>
                                                        {tempOrder.id}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th className="text-secondary">下單時間</th>
                                                    <td>{new Date(tempOrder.create_at * 1000).toLocaleString()}</td>
                                                </tr>
                                                <tr>
                                                    <th className="text-secondary">付款狀態</th>
                                                    <td>
                                                        {tempOrder.is_paid ? (
                                                            <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill">
                                                                <i className="bi bi-check-circle-fill me-1"></i>已付款
                                                            </span>
                                                        ) : (
                                                            <span className="badge bg-danger-subtle text-danger border border-danger-subtle rounded-pill">
                                                                <i className="bi bi-exclamation-circle-fill me-1"></i>未付款
                                                            </span>
                                                        )}
                                                    </td>
                                                </tr>
                                                {tempOrder.is_paid && (
                                                    <tr>
                                                        <th className="text-secondary">付款時間</th>
                                                        <td>{new Date(tempOrder.paid_date * 1000).toLocaleString()}</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card border-0 shadow-sm">
                            <div className="card-header bg-white border-bottom py-3">
                                <h6 className="mb-0 fw-bold">
                                    <i className="bi bi-cart-check-fill me-2 text-primary"></i>選購商品
                                </h6>
                            </div>
                            <div className="card-body p-0">
                                <div className="table-responsive">
                                    <table className="table align-middle mb-0 table-hover">
                                        <thead className="table-light">
                                            <tr>
                                                <th className="ps-4 py-3">商品詳情</th>
                                                <th className="text-center py-3" style={{ width: '120px' }}>數量</th>
                                                <th className="text-end pe-4 py-3" style={{ width: '150px' }}>小計</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.values(tempOrder.products).map((item) => (
                                                <tr key={item.id}>
                                                    <td className="ps-4 py-3">
                                                        <div className="d-flex align-items-center">
                                                            <div
                                                                style={{
                                                                    width: '70px',
                                                                    height: '70px',
                                                                    minWidth: '70px',
                                                                    backgroundSize: 'cover',
                                                                    backgroundPosition: 'center',
                                                                    backgroundImage: `url(${item.product.imageUrl})`
                                                                }}
                                                                className="rounded border shadow-sm me-3"
                                                            ></div>
                                                            <div>
                                                                <div className="fw-medium text-dark mb-1">
                                                                    {item.product.title}
                                                                </div>
                                                                {item.coupon && (
                                                                    <small className="text-success d-flex align-items-center">
                                                                        <i className="bi bi-ticket-perforated-fill me-1"></i>
                                                                        已套用: {item.coupon.title}
                                                                    </small>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="text-center py-3">
                                                        <div className="d-inline-block bg-light px-2 py-1 rounded border">
                                                            <span className="fw-medium">{item.qty}</span>
                                                            <span className="text-muted mx-1">/</span>
                                                            <span className="text-muted small">{item.product.unit}</span>
                                                        </div>
                                                    </td>
                                                    <td className="text-end pe-4 py-3 fw-bold text-primary">
                                                        ${item.final_total?.toLocaleString()}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot className="table-light border-top">
                                            <tr>
                                                <td colSpan="2" className="text-end py-3 fw-bold text-secondary">總金額</td>
                                                <td className="text-end pe-4 py-3">
                                                    <span className="fs-4 fw-bold text-primary">${tempOrder.total?.toLocaleString()}</span>
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer border-top-0 bg-light pb-4 pe-4">
                        <button type="button" className="btn btn-secondary px-4 rounded-pill shadow-sm" onClick={() => modalInstance.current.hide()}>
                            關閉視窗
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default OrderModal;
