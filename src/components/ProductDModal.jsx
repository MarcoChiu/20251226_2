import { useEffect, useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { Modal } from 'bootstrap';

const ProductDModal = forwardRef(({ onDelete }, ref) => {
    const [tempProduct, setTempProduct] = useState(null);
    const modalRef = useRef(null);
    const modalInstance = useRef(null);

    useEffect(() => {
        modalInstance.current = new Modal(modalRef.current, { backdrop: 'static' });
    }, []);

    useImperativeHandle(ref, () => ({
        show: (product) => {
            setTempProduct(product);
            modalInstance.current.show();
        },
        hide: () => {
            modalInstance.current.hide();
        }
    }));

    return (
        <div id="deleteModal" ref={modalRef} className="modal fade" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content border-0">
                    <div className="modal-header bg-danger text-white">
                        <h5 id="deleteModalLabel" className="modal-title">
                            <span>刪除產品</span>
                        </h5>
                        <button type="button" className="btn-close btn-close-white" onClick={() => modalInstance.current.hide()} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        是否刪除 <strong className="text-danger">{tempProduct?.title}</strong> (刪除後將無法恢復)。
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline-secondary" onClick={() => modalInstance.current.hide()}>
                            取消
                        </button>

                        <button type="button" className="btn btn-danger" onClick={() => onDelete(tempProduct)}>
                            確認刪除
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ProductDModal;
