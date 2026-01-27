import { useEffect, useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { Modal } from 'bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import * as cartService from '../services/cartService';
import { showToast, showAlert } from '../utils/sweetAlert';
import Loading from './Loading';

const ProductUserModal = forwardRef((props, ref) => {
    const [product, setProduct] = useState(null);
    const [qty, setQty] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [currentImage, setCurrentImage] = useState('');
    const modalRef = useRef(null);
    const modalInstance = useRef(null);
    const { isAuth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        modalInstance.current = new Modal(modalRef.current, { backdrop: 'static' });
    }, []);

    useImperativeHandle(ref, () => ({
        show: (item) => {
            setProduct(item);
            setQty(1);
            setCurrentImage(item.imageUrl);
            modalInstance.current.show();
        },
        hide: () => {
            modalInstance.current.hide();
        }
    }));

    const handleAddToCart = async () => {
        if (!isAuth) {
            showAlert('warning', '請先登入', '需登入會員才能加入購物車');
            modalInstance.current.hide();
            navigate('/login');
            return;
        }
        if (!product) return;
        setIsLoading(true);
        try {
            await cartService.addCart(product.id, qty);
            modalInstance.current.hide();
            showToast('success', '加入購物車成功');
        } catch (error) {
            showAlert('error', '加入購物車失敗', error.response?.data?.message || '發生錯誤');
        } finally {
            setIsLoading(false);
        }
    };

    if (!product) return (
        <div id="productUserModal" ref={modalRef} className="modal fade" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-xl">
                <div className="modal-content"></div>
            </div>
        </div>
    );

    return (
        <div id="productUserModal" ref={modalRef} className="modal fade" tabIndex="-1" aria-labelledby="productUserModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content border-0 shadow-lg">
                    <div className="modal-header border-bottom-0 p-4 pb-0">

                        <span className="badge bg-light text-dark fs-6">{product.category}</span>
                        <button type="button" className="btn-close" onClick={() => modalInstance.current.hide()} aria-label="Close"></button>
                    </div>
                    <div className="modal-body p-4">
                        <div className="row g-4 mb-4">
                            <div className="col-12">
                                <h2 className="display-6 fw-bold">{product.title}</h2>
                            </div>
                        </div>

                        <div className="row g-4 d-flex align-items-center">

                            <div className="col-md-6">
                                <div className="ratio ratio-1x1 bg-light rounded shadow-sm overflow-hidden position-relative">
                                    {currentImage ? (
                                        <img
                                            src={currentImage}
                                            className="img-fluid object-fit-cover w-100 h-100"
                                            alt={product.title}
                                        />
                                    ) : (
                                        <div className="h-100 w-100 bg-secondary d-flex align-items-center justify-content-center" style={{ minHeight: "300px" }}>
                                            <span className="text-white">無圖片</span>
                                        </div>
                                    )}
                                </div>
                            </div>


                            <div className="col-md-6 d-flex flex-column">
                                <div className="d-flex align-items-end mb-4">
                                    {product.origin_price !== product.price && (
                                        <div className="me-3">
                                            <small className="text-muted text-decoration-line-through">原價 NT$ {product.origin_price}</small>
                                        </div>
                                    )}
                                    <div>
                                        <h3 className="text-danger fw-bold mb-0">NT$ {product.price}</h3>
                                    </div>
                                </div>

                                <div className="p-3 bg-light rounded mb-4">
                                    <div className="d-flex align-items-center mb-3">
                                        <label htmlFor="qtySelect" className="form-label me-3 mb-0 fw-bold">數量</label>
                                        <select
                                            id="qtySelect"
                                            className="form-select w-auto"
                                            value={qty}
                                            onChange={(e) => setQty(Number(e.target.value))}
                                        >
                                            {[...Array(20)].map((_, i) => (
                                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <button
                                        className="btn btn-primary w-100 py-2 fw-bold shadow-sm"
                                        type="button"
                                        onClick={handleAddToCart}
                                    >
                                        加入購物車
                                    </button>
                                </div>


                                {product.imagesUrl && product.imagesUrl.length > 0 && (
                                    <div className="d-flex gap-2 overflow-auto">

                                        {product.imageUrl && (
                                            <div
                                                className={`ratio ratio-1x1 border rounded cursor-pointer ${currentImage === product.imageUrl ? 'border-primary border-2' : 'border-light'}`}
                                                style={{ width: '80px', height: '80px', cursor: 'pointer' }}
                                                onClick={() => setCurrentImage(product.imageUrl)}
                                            >
                                                <img src={product.imageUrl} className="img-fluid object-fit-cover" alt="Main" />
                                            </div>
                                        )}

                                        {product.imagesUrl.map((img, index) => (
                                            img && (
                                                <div
                                                    key={index}
                                                    className={`ratio ratio-1x1 border rounded cursor-pointer ${currentImage === img ? 'border-primary border-2' : 'border-light'}`}
                                                    style={{ width: '80px', height: '80px', cursor: 'pointer' }}
                                                    onClick={() => setCurrentImage(img)}
                                                >
                                                    <img src={img} className="img-fluid object-fit-cover" alt={`Thumb ${index + 1}`} />
                                                </div>
                                            )
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="row g-4 mt-2">
                            <div className="col-12">
                                <div className="mb-4">
                                    <h5 className="fw-bold mb-2">產品描述</h5>
                                    <p className="text-muted" style={{ lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>{product.description}</p>
                                </div>

                                <div className="mb-4">
                                    <h5 className="fw-bold mb-2">商品內容</h5>
                                    <div className="bg-light p-3 rounded">
                                        <p className="mb-0 text-dark" style={{ whiteSpace: 'pre-wrap' }}>{product.content}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                {isLoading && <Loading />}
            </div>
        </div>
    );
});

export default ProductUserModal;
