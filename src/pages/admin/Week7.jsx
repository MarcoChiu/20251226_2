import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as productService from '../../services/productService';
import Loading from '../../components/Loading';
import Pagination from '../../components/Pagination';
import ProductCUModal from '../../components/ProductCUModal';
import ProductDModal from '../../components/ProductDModal';
import ProductCard from '../../components/ProductCard';
import { showAlert } from '../../utils/sweetAlert';
import { scrollToTop } from '../../utils/scrollTo';
import { createMessage } from '../../store/messageSlice';

const Week7 = () => {
    const [products, setProducts] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const productModalRef = useRef(null);
    const deleteModalRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        getProducts();
    }, []);

    //API
    const getProducts = async (page = 1, shouldScroll = true) => {
        setIsLoading(true);
        try {
            const data = await productService.getProducts(page);
            setProducts(data.products);
            setPageInfo(data.pagination);

            if (shouldScroll) {
                scrollToTop();
            }
        } catch (error) {
            showAlert('error', '取得產品失敗', error.response?.data?.message || '發生錯誤');
        } finally {
            setIsLoading(false);
        }
    };

    const createProduct = async (product) => {
        setIsLoading(true);
        try {
            const productData = {
                ...product,
                origin_price: Number(product.origin_price),
                price: Number(product.price)
            };

            await productService.createProduct(productData);
            productModalRef.current.hide();
            await getProducts(pageInfo.current_page, false);
            dispatch(createMessage({ success: true, message: `新增 ${product.title} 成功`, type: 'success', title: '系統通知' }));
        } catch (error) {
            showAlert('error', '新增失敗', error.response?.data?.message || '發生錯誤');
        } finally {
            setIsLoading(false);
        }
    };

    const updateProduct = async (product) => {
        setIsLoading(true);
        try {
            const productData = {
                ...product,
                origin_price: Number(product.origin_price),
                price: Number(product.price)
            };

            await productService.updateProduct(product.id, productData);
            productModalRef.current.hide();
            await getProducts(pageInfo.current_page, false);
            dispatch(createMessage({ success: true, message: `更新 ${product.title} 成功`, type: 'primary', title: '系統通知' }));
        } catch (error) {
            showAlert('error', '更新失敗', error.response?.data?.message || '發生錯誤');
        } finally {
            setIsLoading(false);
        }
    };

    const deleteProduct = async (product) => {
        setIsLoading(true);
        try {
            await productService.deleteProduct(product.id);
            deleteModalRef.current.hide();
            if (products.length === 1 && pageInfo.current_page > 1) {
                await getProducts(pageInfo.current_page - 1, false);
            } else {
                await getProducts(pageInfo.current_page, false);
            }

            dispatch(createMessage({ success: true, message: `刪除 ${product.title} 成功`, type: 'danger', title: '系統通知' }));
        } catch (error) {
            showAlert('error', '刪除失敗', error.response?.data?.message || '發生錯誤');
        } finally {
            setIsLoading(false);
        }
    };

    //畫面操作
    const openProductModal = (status, product) => {
        productModalRef.current.show(status, product);
    };

    const openDeleteModal = (product) => {
        deleteModalRef.current.show(product);
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
                    </div>
                </div>

                <div className="row mt-4">
                    {products.map((product) => (
                        <div className="col-md-6 mb-6" key={product.id}>
                            <ProductCard product={product} showStatus={true}>
                                <button type="button" className="btn btn-outline-primary w-50 me-2" onClick={() => openProductModal('edit', product)}>
                                    編輯
                                </button>
                                <button type="button" className="btn btn-outline-danger w-50" onClick={() => openDeleteModal(product)}>
                                    刪除
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

                {/* 新增 編輯 Modal */}
                <ProductCUModal
                    ref={productModalRef}
                    onCreate={createProduct}
                    onUpdate={updateProduct}
                />

                {/* 刪除 Modal */}
                <ProductDModal
                    ref={deleteModalRef}
                    onDelete={deleteProduct}
                />

            </div>
        </>
    );
}


export default Week7;