
const Pagination = ({ pageInfo, onPageChange }) => {
    return (
        <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
                <li className={`page-item ${!pageInfo.has_pre && 'disabled'}`}>
                    <a className="page-link" href="/" onClick={(e) => {
                        e.preventDefault();
                        if (pageInfo.has_pre) {
                            onPageChange(pageInfo.current_page - 1);
                            window.scrollTo(0, 0);
                        }
                    }}>
                        &laquo;
                    </a>
                </li>
                {
                    Array.from({ length: pageInfo.total_pages }).map((_, index) => (
                        <li className={`page-item ${pageInfo.current_page === index + 1 && 'active'}`} key={index}>
                            <a className="page-link" href="/" onClick={(e) => {
                                e.preventDefault();
                                onPageChange(index + 1);
                                window.scrollTo(0, 0);
                            }}>
                                {index + 1}
                            </a>
                        </li>
                    ))
                }
                <li className={`page-item ${!pageInfo.has_next && 'disabled'}`}>
                    <a className="page-link" href="/" onClick={(e) => {
                        e.preventDefault();
                        if (pageInfo.has_next) {
                            onPageChange(pageInfo.current_page + 1);
                            window.scrollTo(0, 0);
                        }
                    }}>
                        &raquo;
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
