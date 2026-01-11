import PropTypes from 'prop-types';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (!totalPages || totalPages <= 1) return null;

    const handlePageChange = (page, e) => {
        e.preventDefault();
        onPageChange(page);
    };

    return (
        <nav aria-label="Page navigation" className="mt-5">
            <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <a
                        className="page-link"
                        href="/"
                        onClick={(e) => handlePageChange(currentPage - 1, e)}
                        aria-label="Previous"
                    >
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>

                {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    return (
                        <li
                            key={page}
                            className={`page-item ${currentPage === page ? 'active' : ''}`}
                        >
                            <a
                                className="page-link"
                                href="/"
                                onClick={(e) => handlePageChange(page, e)}
                            >
                                {page}
                            </a>
                        </li>
                    );
                })}

                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <a
                        className="page-link"
                        href="/"
                        onClick={(e) => handlePageChange(currentPage + 1, e)}
                        aria-label="Next"
                    >
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
