import { useState, useEffect, useRef } from "react";
import { Modal } from "bootstrap";
import * as productService from '../../services/productService';
import Loading from '../../components/Loading';
import Pagination from '../../components/Pagination';
import Swal from 'sweetalert2';

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
    imagesUrl: []
};


const Week3 = () => {
    const [products, setProducts] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    const [tempProduct, setTempProduct] = useState(defaultProduct);
    const [isNew, setIsNew] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const productModalRef = useRef(null);
    const deleteModalRef = useRef(null);
    const productModal = useRef(null);
    const deleteModal = useRef(null);

    useEffect(() => {
        productModal.current = new Modal(productModalRef.current, { backdrop: 'static' });
        deleteModal.current = new Modal(deleteModalRef.current, { backdrop: 'static' });
        getProducts();
    }, []);

    //API
    const getProducts = async (page = 1) => {
        setIsLoading(true);
        try {
            const data = await productService.getProducts(page);
            setProducts(data.products);
            setPageInfo(data.pagination);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '取得產品失敗',
                text: error.response?.data?.message || '發生錯誤'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const createProduct = async () => {
        setIsLoading(true);
        try {
            const productData = {
                ...tempProduct,
                origin_price: Number(tempProduct.origin_price),
                price: Number(tempProduct.price)
            };

            await productService.createProduct(productData);
            closeProductModal();
            await getProducts(pageInfo.current_page);
            Swal.fire({ icon: 'success', title: '新增成功' });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '新增失敗',
                text: error.response?.data?.message || '發生錯誤'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const fakeProducts = async () => {
        setIsLoading(true);
        try {
            const counts = 20;
            const categories = ["電子產品", "衣服", "書籍", "家具", "玩具"];
            const adjectives = ["超級", "精緻", "豪華", "實用", "時尚", "復古", "智能", "環保", "限量", "經典"];
            const nouns = ["手錶", "外套", "小說", "椅子", "機器人", "耳機", "背包", "桌子", "公仔", "手機"];

            const fakeProductsData = Array.from({ length: counts }).map((_, i) => {
                const category = categories[Math.floor(Math.random() * categories.length)];
                const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
                const noun = nouns[Math.floor(Math.random() * nouns.length)];
                const price = Math.floor(Math.random() * 9000) + 100;

                return {
                    title: `${adj}${noun} ${Math.floor(Math.random() * 1000)}`,
                    category: category,
                    origin_price: price + Math.floor(Math.random() * 1000),
                    price: price,
                    unit: "個",
                    description: `這是一個${adj}的${noun}，非常適合您。`,
                    content: `產品編號：${Date.now()}-${i}`,
                    is_enabled: 1,
                    imageUrl: `https://picsum.photos/300/300?random=${Math.random()}`,
                    imagesUrl: []
                };
            });

            let successCount = 0;
            for (const product of fakeProductsData) {
                try {
                    await productService.createProduct(product);
                    successCount++;
                } catch (err) {
                    console.error("Failed to create fake product:", product.title, err);
                }
            }

            await getProducts(pageInfo.current_page);
            Swal.fire({
                icon: 'success',
                title: '假資料建立完成',
                text: `成功建立 ${successCount} / ${counts} 筆產品`
            });

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '建立假資料失敗',
                text: error.message || '發生錯誤'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const updateProduct = async () => {
        setIsLoading(true);
        try {
            const productData = {
                ...tempProduct,
                origin_price: Number(tempProduct.origin_price),
                price: Number(tempProduct.price)
            };

            await productService.updateProduct(tempProduct.id, productData);
            closeProductModal();
            await getProducts(pageInfo.current_page);
            Swal.fire({ icon: 'success', title: '更新成功' });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '更新失敗',
                text: error.response?.data?.message || '發生錯誤'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const deleteProduct = async () => {
        setIsLoading(true);
        try {
            await productService.deleteProduct(tempProduct.id);
            closeDeleteModal();
            if (products.length === 1 && pageInfo.current_page > 1) {
                await getProducts(pageInfo.current_page - 1);
            } else {
                await getProducts(pageInfo.current_page);
            }

            Swal.fire({ icon: 'success', title: '刪除成功' });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '刪除失敗',
                text: error.response?.data?.message || '發生錯誤'
            });
        } finally {
            setIsLoading(false);
        }
    };

    //畫面操作
    const openProductModal = (status, product) => {
        if (status === 'create') {
            setTempProduct(defaultProduct);
            setIsNew(true);
        } else {
            setTempProduct({ ...product });
            setIsNew(false);
        }
        productModal.current.show();
    };

    const openDeleteModal = (product) => {
        setTempProduct(product);
        deleteModal.current.show();
    };

    const closeProductModal = () => {
        productModal.current.hide();
    };

    const closeDeleteModal = () => {
        deleteModal.current.hide();
    };

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

    return (
        <>
            {isLoading && <Loading />}
            <div className="container mt-4">
                <div className="d-flex justify-content-between mb-4">
                    <h2>產品列表</h2>
                    <div>
                        <button className="btn btn-primary me-2" onClick={() => openProductModal('create')}>
                            建立產品
                        </button>
                        <button className="btn btn-outline-secondary " onClick={fakeProducts} disabled={isLoading}>
                            建立產品(假資料)
                        </button>
                    </div>
                </div>

                <div className="row mt-4">
                    {products.map((product) => (
                        <div className="col-md-6 mb-6" key={product.id}>
                            <div className="card h-100 shadow-sm border-0">
                                <div className="position-relative" style={{ height: "250px", overflow: "hidden" }}>
                                    <img
                                        src={product.imageUrl}
                                        className="card-img-top h-100 w-100"
                                        style={{ objectFit: "cover" }}
                                        alt={product.title}
                                    />
                                    {!product.is_enabled && (
                                        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center">
                                            <span className="text-white fw-bold border border-white px-3 py-1 rounded">未啟用</span>
                                        </div>
                                    )}
                                </div>
                                <div className="card-body d-flex flex-column">
                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                        <h5 className="card-title text-truncate mb-0" style={{ maxWidth: "70%" }}>{product.title}</h5>
                                        <span className="badge bg-secondary">{product.category}</span>
                                    </div>
                                    <p className="card-text text-muted small mb-auto" style={{
                                        display: "-webkit-box",
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: "vertical",
                                        overflow: "hidden"
                                    }}>
                                        {product.description}
                                    </p>
                                    <div className="d-flex justify-content-between align-items-center mt-3">
                                        <div>
                                            {product.origin_price !== product.price && (
                                                <small className="text-decoration-line-through text-muted me-2">${product.origin_price}</small>
                                            )}
                                            <span className="fw-bold text-danger">${product.price}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer bg-transparent border-top-0 d-flex justify-content-between pb-3">
                                    <button type="button" className="btn btn-outline-primary w-50 me-2" onClick={() => openProductModal('edit', product)}>
                                        編輯
                                    </button>
                                    <button type="button" className="btn btn-outline-danger w-50" onClick={() => openDeleteModal(product)}>
                                        刪除
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 分頁 */}
                <Pagination pageInfo={pageInfo} onPageChange={getProducts} />

                {/* 新增 編輯 */}
                <div id="productModal" ref={productModalRef} className="modal fade" tabIndex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content border-0">
                            <div className="modal-header bg-dark text-white">
                                <h5 id="productModalLabel" className="modal-title">
                                    {isNew ? '新增產品' : '編輯產品'}
                                </h5>
                                <button type="button" className="btn-close btn-close-white" onClick={closeProductModal} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-sm-4">
                                        <div className="mb-3">
                                            <label htmlFor="imageUrl" className="form-label">封面圖片</label>
                                            <input name="imageUrl" type="text" className="form-control" placeholder="請輸入圖片連結" value={tempProduct.imageUrl} onChange={handleInputChange} />
                                            <img className="img-fluid mt-3" src={tempProduct.imageUrl} alt="" />
                                        </div>
                                        <h3 className="mb-3">產品圖片</h3>
                                        {Array.isArray(tempProduct.imagesUrl) && tempProduct.imagesUrl.map((url, index) => (
                                            <div className="mb-3" key={index}>
                                                <label className="form-label">圖片網址 {index + 1}</label>
                                                <input type="text" className="form-control" placeholder="請輸入圖片連結"
                                                    value={url}
                                                    onChange={(e) => handleImageChange(index, e.target.value)}
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
                                        <hr />
                                        <div className="mb-3">
                                            <label htmlFor="description" className="form-label">產品描述</label>
                                            <textarea id="description" name="description" className="form-control" placeholder="請輸入產品描述" value={tempProduct.description} onChange={handleInputChange} rows={10}></textarea>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="content" className="form-label">說明內容</label>
                                            <textarea id="content" name="content" className="form-control" placeholder="請輸入說明內容" value={tempProduct.content} onChange={handleInputChange} rows={10}></textarea>
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
                                <button type="button" className="btn btn-outline-secondary" onClick={closeProductModal}>
                                    取消
                                </button>
                                <button type="button" className="btn btn-primary" onClick={isNew ? createProduct : updateProduct}>
                                    確認
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 刪除 */}
                <div id="deleteModal" ref={deleteModalRef} className="modal fade" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content border-0">
                            <div className="modal-header bg-danger text-white">
                                <h5 id="deleteModalLabel" className="modal-title">
                                    <span>刪除產品</span>
                                </h5>
                                <button type="button" className="btn-close btn-close-white" onClick={closeDeleteModal} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                是否刪除 <strong className="text-danger">{tempProduct.title}</strong> (刪除後將無法恢復)。
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-outline-secondary" onClick={closeDeleteModal}>
                                    取消
                                </button>
                                <button type="button" className="btn btn-danger" onClick={deleteProduct}>
                                    確認刪除
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Week3;