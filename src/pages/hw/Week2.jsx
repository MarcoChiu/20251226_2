import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Modal } from "bootstrap";
import { API_ENDPOINTS } from "../../apiConfig";

const Week2 = () => {
    const [products, setProducts] = useState([]);
    const [tempProduct, setTempProduct] = useState(null);

    const modalRef = useRef(null);
    const myModal = useRef(null);

    useEffect(() => {
        myModal.current = new Modal(modalRef.current);
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(API_ENDPOINTS.adminProducts);
                setProducts(response.data.products);
            } catch (error) {
                console.error('Error loading products:', error);
                alert('取得產品失敗');
            }
        };
        fetchProducts();
    }, []);

    const openModal = (product) => {
        setTempProduct(product);
        myModal.current.show();
    };

    const closeModal = () => {
        setTempProduct(null);
        myModal.current.hide();
    };

    return (
        <div className="container mt-3">
            <div className="row">
                {products.length > 0 && products.map((item) => (
                    <div className="col-md-4 mb-4" key={item.id}>
                        <div className="card h-100 d-flex flex-column">
                            <img
                                src={item.imageUrl}
                                className="card-img-top"
                                alt={item.title}
                                style={{ maxHeight: "350px", objectFit: "cover" }}
                            />
                            <div className="card-body d-flex flex-column">
                                <div className="flex-grow-1">
                                    <h5 className="card-title text-primary">
                                        {item.title}
                                    </h5>
                                    <p className="card-text" style={{ textAlign: "justify" }}>
                                        {item.description}
                                    </p>
                                </div>
                                <div className="mt-2 d-flex justify-content-between align-items-center">
                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={() => openModal(item)}
                                    >
                                        詳細內容
                                    </button>
                                    <span className="btn btn-outline-danger">{item.category}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            <div className="modal fade" ref={modalRef} tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        {tempProduct && (
                            <>
                                <div className="modal-header">
                                    <h5 className="modal-title font-weight-bold">{tempProduct.title}</h5>
                                    <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <img src={tempProduct.imageUrl} className="img-fluid rounded mb-3" alt={tempProduct.title} />
                                    <p className="text-muted"><span className="badge bg-secondary mb-2">{tempProduct.category}</span></p>
                                    <h6>產品描述：</h6>
                                    <p>{tempProduct.description}</p>
                                    <hr />
                                    <p className="mb-0">售價：<strong className="text-danger">{tempProduct.price}</strong> {tempProduct.unit} / <del className="text-muted">{tempProduct.origin_price}</del> {tempProduct.unit}</p>
                                    {tempProduct.imagesUrl && tempProduct.imagesUrl.length > 0 && (
                                        <div className="mt-3">
                                            <h6>更多圖片：</h6>
                                            <div className="d-flex flex-wrap gap-2">
                                                {tempProduct.imagesUrl.map((url, index) => (
                                                    <img
                                                        key={index}
                                                        src={url}
                                                        className="img-fluid rounded shadow-sm"
                                                        style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                                        alt={`${tempProduct.title}-${index}`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={closeModal}>關閉</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Week2;