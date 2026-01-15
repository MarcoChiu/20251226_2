import { useState, useEffect, useRef } from "react"; // Added useRef
import * as productService from '../../services/productService';
import Loading from '../../components/Loading';
import Pagination from '../../components/Pagination';
import ProductUserModal from '../../components/ProductUserModal'; // Import Modal
import Swal from 'sweetalert2';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const productModalRef = useRef(null); // Ref for Modal

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async (page = 1) => {
        setIsLoading(true);
        try {
            const data = await productService.getUserProducts(page);
            setProducts(data.products);
            setPageInfo(data.pagination);

            // 滾動到商品列表
            setTimeout(() => {
                const scrollTo = document.querySelector('.container.mt-4');
                if (scrollTo) {
                    scrollTo.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 0);

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

    const openProductModal = (product) => {
        productModalRef.current.show(product);
    };

    return (
        <>
            {isLoading && <Loading />}
            <div className="container mt-4">
                <div className="d-flex justify-content-between mb-4">
                    <h2>產品列表</h2>
                </div>

                <div className="row mt-4">
                    {products.map((product) => (
                        <div className="col-md-6 mb-6" key={product.id}>
                            <div className="card h-100 shadow-sm border-0">
                                <div className="position-relative" style={{ height: "250px", overflow: "hidden" }}>
                                    {product.imageUrl ? (
                                        <img
                                            src={product.imageUrl}
                                            className="card-img-top h-100 w-100"
                                            style={{ objectFit: "cover" }}
                                            alt={product.title}
                                        />
                                    ) : (
                                        <div className="h-100 w-100 bg-secondary d-flex align-items-center justify-content-center">
                                            <span className="text-white">無圖片</span>
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
                                    <button
                                        type="button"
                                        className="btn btn-outline-primary w-100"
                                        onClick={() => openProductModal(product)}
                                    >
                                        詳細資料
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <Pagination
                    currentPage={pageInfo.current_page}
                    totalPages={pageInfo.total_pages}
                    onPageChange={getProducts}
                />

                <ProductUserModal ref={productModalRef} />
            </div>
        </>
    );
}

export default ProductList;