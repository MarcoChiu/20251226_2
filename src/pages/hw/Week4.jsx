import { useState, useEffect, useRef } from "react";
import * as productService from '../../services/productService';
import Loading from '../../components/Loading';
import Pagination from '../../components/Pagination';
import ProductCUModal from '../../components/ProductCUModal';
import ProductDModal from '../../components/ProductDModal';
import ProductCard from '../../components/ProductCard';
import Swal from 'sweetalert2';

const Week4 = () => {
    const [products, setProducts] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const productModalRef = useRef(null);
    const deleteModalRef = useRef(null);

    useEffect(() => {
        getProducts();
    }, []);

    //API
    const getProducts = async (page = 1, shouldScroll = true) => {
        setIsLoading(true);
        try {
            const data = await productService.getProducts(page);
            setProducts(data.products);
            setProducts(data.products);
            setPageInfo(data.pagination);

            if (shouldScroll) {
                setTimeout(() => {
                    const scrollTo = document.querySelector('.container.mt-4');
                    if (scrollTo) {
                        scrollTo.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 0);
            }
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


export default Week4;