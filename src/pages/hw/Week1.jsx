import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Modal } from "bootstrap";

const Week1 = () => {
    const [data, setData] = useState([]);
    const [product, setProduct] = useState(null);
    const path = import.meta.env.BASE_URL;

    const modalRef = useRef(null);
    const myModal = useRef(null);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${path}data/week1.json`);
                setData(response.data[0]);
            } catch (error) {
                console.error('Error loading data:', error);
            }
        })();
    }, []);

    useEffect(() => {
        myModal.current = new Modal(modalRef.current);
    }, []);

    const openModal = (product) => {
        setProduct(product);
        myModal.current.show();
    };

    const closeModal = () => {
        setProduct(null);
        myModal.current.hide();
    };

    return (
        <div className="container mt-3">
            {/* Data */}
            <div className="row">
                {
                    data.length > 0 && data.map((item) => (
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
                    ))
                }
            </div>

            {/* Modal */}
            <div className="modal fade" ref={modalRef} tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        {product && (
                            <>
                                <div className="modal-header">
                                    <h5 className="modal-title font-weight-bold">{product.title}</h5>
                                    <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <img src={product.imageUrl} className="img-fluid rounded mb-3" alt={product.title} />
                                    <p className="text-muted"><span className="badge bg-secondary mb-2">{product.category}</span></p>
                                    <h6>產品描述：</h6>
                                    <p>{product.description}</p>
                                    <hr />
                                    <p className="mb-0">售價：<strong className="text-danger">{product.price}</strong> {product.unit} / <del className="text-muted">{product.origin_price}</del> {product.unit}</p>
                                    {product.imagesUrl && product.imagesUrl.length > 0 && (
                                        <div className="mt-3">
                                            <h6>更多圖片：</h6>
                                            <div className="d-flex flex-wrap gap-2">
                                                {product.imagesUrl.map((url, index) => (
                                                    <img
                                                        key={index}
                                                        src={url}
                                                        className="img-fluid rounded shadow-sm"
                                                        style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                                        alt={`${product.title}-${index}`}
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
    );
}


export default Week1;