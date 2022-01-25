import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
    const pageCount = Math.ceil(itemsCount / pageSize); // количество страниц
    const pages = _.range(1, pageCount + 1); // создает массив с числами от start  до end, третьим параметром можно добавить шаг
    if (pageCount === 1) return null;

    return (
        <ul className="pagination">
            {pages.map((page) => (
                <li
                    key={page}
                    className={
                        "page-item " + (page === currentPage ? "active" : "")
                    }
                >
                    <span
                        className="page-link"
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </span>
                </li>
            ))}
        </ul>
    );
};
Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
};
export default Pagination;
