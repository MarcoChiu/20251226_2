import { useState, useEffect, useRef } from "react";
import * as productService from '../../services/productService';
import Loading from '../../components/Loading';
import Pagination from '../../components/Pagination';
import ProductUserModal from '../../components/ProductUserModal';
import ProductCard from '../../components/ProductCard';
import { showAlert } from '../../utils/sweetAlert';
import { scrollToTop } from '../../utils/scrollTo';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const productModalRef = useRef(null);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async (page = 1) => {
        setIsLoading(true);
        try {
            const data = await productService.getUserProducts(page);
            setProducts(data.products);
            setPageInfo(data.pagination);
            scrollToTop();


        } catch (error) {
            showAlert('error', '取得產品失敗', error.response?.data?.message || '發生錯誤');
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
                            <ProductCard product={product}>
                                <button
                                    type="button"
                                    className="btn btn-outline-primary w-100"
                                    onClick={() => openProductModal(product)}
                                >
                                    詳細資料
                                </button>
                            </ProductCard>
                        </div>
                    ))}
                </div>

                {/* 分頁 */}
                <Pagination
                    currentPage={pageInfo.current_page}
                    totalPages={pageInfo.total_pages}
                    onPageChange={getProducts}
                />

                {/* 詳細資料 */}
                <ProductUserModal ref={productModalRef} />
            </div>
        </>
    );
}

export default ProductList;