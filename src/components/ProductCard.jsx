import PropTypes from 'prop-types';

const ProductCard = ({ product, children, showStatus = false }) => {
    return (
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
                {showStatus && !product.is_enabled && (
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
                {/* 使用children讓前面自動決定按鈕 */}
                {children}
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        imageUrl: PropTypes.string,
        title: PropTypes.string.isRequired,
        category: PropTypes.string,
        description: PropTypes.string,
        origin_price: PropTypes.number,
        price: PropTypes.number,
        is_enabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    }).isRequired,
    children: PropTypes.node,
    showStatus: PropTypes.bool
};

export default ProductCard;
