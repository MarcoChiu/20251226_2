import { useEffect, useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { Modal } from 'bootstrap';
import { uploadImage } from '../services/imageService';
import Swal from 'sweetalert2';
import Loading from './Loading';

const defaultProduct = {
    title: "",
    category: "",
    origin_price: 0,
    price: 0,
    unit: "",
    description: "",
    content: "",
    is_enabled: 1,
    imageUrl: "",
    imagesUrl: [],
    salefrom: "",
    saleto: ""
};

const ProductCUModal = forwardRef(({ onUpdate, onCreate }, ref) => {
    const [tempProduct, setTempProduct] = useState(defaultProduct);
    const [isNew, setIsNew] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const modalRef = useRef(null);
    const modalInstance = useRef(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        modalInstance.current = new Modal(modalRef.current, { backdrop: 'static' });
    }, []);

    useImperativeHandle(ref, () => ({
        show: (status, product) => {
            if (status === 'create') {
                setTempProduct(defaultProduct);
                setIsNew(true);
            } else {
                setTempProduct({ ...product });
                setIsNew(false);
            }
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            modalInstance.current.show();
        },
        hide: () => {
            modalInstance.current.hide();
        }
    }));

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setTempProduct({
            ...tempProduct,
            [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
        });
    };

    const handleImageChange = (index, value) => {
        const newImages = [...tempProduct.imagesUrl];
        newImages[index] = value;
        setTempProduct({ ...tempProduct, imagesUrl: newImages });
    };

    const addImageField = () => {
        const newImages = [...(tempProduct.imagesUrl || []), ''];
        setTempProduct({ ...tempProduct, imagesUrl: newImages });
    };

    const removeImageField = () => {
        const newImages = [...(tempProduct.imagesUrl || [])];
        newImages.pop();
        setTempProduct({ ...tempProduct, imagesUrl: newImages });
    };

    const validateFile = (file) => {
        const validTypes = ['image/jpeg', 'image/png'];
        if (!validTypes.includes(file.type)) {
            Swal.fire({
                icon: 'error',
                title: '格式錯誤',
                text: '僅限使用 jpg、jpeg 與 png 格式'
            });
            return false;
        }
        const maxSize = 3;
        if ((file.size / 1024 / 1024) > maxSize) {
            Swal.fire({
                icon: 'error',
                title: '檔案過大',
                text: `檔案大小限制為 ${maxSize}MB 以下`
            });
            return false;
        }
        return true;
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!validateFile(file)) {
            e.target.value = ''; // Clear input
            return;
        }

        setIsUploading(true);
        try {
            const res = await uploadImage(file);
            if (res.success) {
                setTempProduct({ ...tempProduct, imageUrl: res.imageUrl });
                Swal.fire({
                    icon: 'success',
                    title: '圖片上傳成功',
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: '圖片上傳失敗',
                    text: res.message || '未知錯誤'
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '圖片上傳錯誤',
                text: error.message || '發生錯誤'
            });
        } finally {
            setIsUploading(false);
            e.target.value = ''; // Clear input
        }
    };

    const handleImageFileUpload = async (index, e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!validateFile(file)) {
            e.target.value = ''; // Clear input
            return;
        }

        setIsUploading(true);
        try {
            const res = await uploadImage(file);
            if (res.success) {
                const newImages = [...tempProduct.imagesUrl];
                newImages[index] = res.imageUrl;
                setTempProduct({ ...tempProduct, imagesUrl: newImages });

                Swal.fire({
                    icon: 'success',
                    title: '圖片上傳成功',
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: '圖片上傳失敗',
                    text: res.message || '未知錯誤'
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '圖片上傳錯誤',
                text: error.message || '發生錯誤'
            });
        } finally {
            setIsUploading(false);
            e.target.value = ''; // Clear input
        }
    };

    const handleConfirm = () => {
        // 驗證販售日期必填
        if (!tempProduct.salefrom || !tempProduct.saleto) {
            Swal.fire({
                icon: 'error',
                title: '欄位必填',
                text: '請填寫販售日期起和販售日期迄'
            });
            return;
        }

        // 驗證販售日期
        if (new Date(tempProduct.salefrom) > new Date(tempProduct.saleto)) {
            Swal.fire({
                icon: 'error',
                title: '日期錯誤',
                text: '販售日期起不可以大於販售日期迄'
            });
            return;
        }

        if (isNew) {
            onCreate(tempProduct);
        } else {
            onUpdate(tempProduct);
        }
    };

    return (
        <div id="productModal" ref={modalRef} className="modal fade" tabIndex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl">
                <div className="modal-content border-0">
                    <div className="modal-header bg-dark text-white">
                        <h5 id="productModalLabel" className="modal-title">
                            {isNew ? '新增產品' : '編輯產品'}
                        </h5>
                        <button type="button" className="btn-close btn-close-white" onClick={() => modalInstance.current.hide()} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">

                        <div className="row">
                            {/*左*/}
                            <div className="col-sm-4">
                                <div className="mb-3">
                                    <label htmlFor="imageUrl" className="form-label">封面圖片</label>
                                    <div className="input-group mb-3">
                                        <input name="imageUrl" type="text" className="form-control" placeholder="請輸入圖片連結" value={tempProduct.imageUrl} onChange={handleInputChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="fileInput" className="form-label">或 上傳圖片</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="fileInput"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            disabled={isUploading}
                                        />
                                    </div>
                                    {tempProduct.imageUrl && <img className="img-fluid mt-3" src={tempProduct.imageUrl} alt="" />}
                                </div>
                                <h3 className="mb-3">產品圖片</h3>
                                {Array.isArray(tempProduct.imagesUrl) && tempProduct.imagesUrl.map((url, index) => (
                                    <div className="mb-3" key={index}>
                                        <label className="form-label">圖片網址 {index + 1}</label>
                                        <input type="text" className="form-control mb-2" placeholder="請輸入圖片連結"
                                            value={url}
                                            onChange={(e) => handleImageChange(index, e.target.value)}
                                        />
                                        <input
                                            type="file"
                                            className="form-control"
                                            onChange={(e) => handleImageFileUpload(index, e)}
                                            disabled={isUploading}
                                        />
                                        {url && <img className="img-fluid mt-3 mb-3" src={url} alt="" />}
                                    </div>
                                ))}
                                <div className="d-flex justify-content-between">
                                    {(!tempProduct.imagesUrl || tempProduct.imagesUrl.length === 0 || tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]) && (
                                        <button className="btn btn-outline-primary btn-sm w-100 me-2" onClick={addImageField}>
                                            新增圖片
                                        </button>
                                    )}
                                    {tempProduct.imagesUrl && tempProduct.imagesUrl.length > 0 && (
                                        <button className="btn btn-outline-danger btn-sm w-100" onClick={removeImageField}>
                                            刪除圖片
                                        </button>
                                    )}
                                </div>
                            </div>
                            {/*右*/}
                            <div className="col-sm-8">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">標題</label>
                                    <input id="title" name="title" type="text" className="form-control" placeholder="請輸入標題" value={tempProduct.title} onChange={handleInputChange} />
                                </div>

                                <div className="row">
                                    <div className="mb-3 col-md-6">
                                        <label htmlFor="category" className="form-label">分類</label>
                                        <input id="category" name="category" type="text" className="form-control" placeholder="請輸入分類" value={tempProduct.category} onChange={handleInputChange} />
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label htmlFor="unit" className="form-label">單位</label>
                                        <input id="unit" name="unit" type="text" className="form-control" placeholder="請輸入單位" value={tempProduct.unit} onChange={handleInputChange} />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="mb-3 col-md-6">
                                        <label htmlFor="origin_price" className="form-label">原價</label>
                                        <input id="origin_price" name="origin_price" type="number" className="form-control" placeholder="請輸入原價" value={tempProduct.origin_price} onChange={handleInputChange} />
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label htmlFor="price" className="form-label">售價</label>
                                        <input id="price" name="price" type="number" className="form-control" placeholder="請輸入售價" value={tempProduct.price} onChange={handleInputChange} />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="mb-3 col-md-6">
                                        <label htmlFor="salefrom" className="form-label">販售日期起</label>
                                        <input id="salefrom" name="salefrom" type="date" className="form-control" value={tempProduct.salefrom || ''} onChange={handleInputChange} />
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label htmlFor="saleto" className="form-label">販售日期迄</label>
                                        <input id="saleto" name="saleto" type="date" className="form-control" value={tempProduct.saleto || ''} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <hr />
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">產品描述</label>
                                    <textarea id="description" name="description" className="form-control" placeholder="請輸入產品描述" value={tempProduct.description} onChange={handleInputChange} rows={10}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="content" className="form-label">說明內容</label>
                                    <textarea id="content" name="content" className="form-control" placeholder="請輸入說明內容" value={tempProduct.content} onChange={handleInputChange} rows={10}></textarea>
                                </div>

                                <div className="row">


                                </div>
                                <div className="mb-3">
                                    <div className="form-check">
                                        <input id="is_enabled" name="is_enabled" className="form-check-input" type="checkbox" checked={!!tempProduct.is_enabled} onChange={handleInputChange} />
                                        <label className="form-check-label" htmlFor="is_enabled">是否啟用</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline-secondary" onClick={() => modalInstance.current.hide()}>
                            取消
                        </button>
                        <button type="button" className="btn btn-primary" onClick={handleConfirm}>
                            確認
                        </button>
                    </div>
                    {isUploading && <Loading />}
                </div>
            </div>
        </div >
    );
});

export default ProductCUModal;
