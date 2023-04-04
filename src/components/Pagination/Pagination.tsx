import React, {useContext} from "react";

import {PaginationContext, PaginationContextState} from "../../contexts/pagination.context";

import paginationStyles from "./Pagination.module.scss";

function Pagination() {
    const {currentPage, setCurrentPage, totalPages, pageNumbers} = useContext<PaginationContextState>(PaginationContext);

    const preparePaginationTabClassName = (page: number): string => {
        if (page === currentPage) {
            return `${paginationStyles.pagination_element} ${paginationStyles.active}`;
        }
        return `${paginationStyles.pagination_element}`;
    }

    const handleNextPaginationTabClick = (): void => {
        if (currentPage !== totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    const handlePrevPaginationTabClick = (): void => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    return (
        <div className={paginationStyles.pagination}>
            <div className={paginationStyles.pagination_element} onClick={() => handlePrevPaginationTabClick()}>&#60;</div>
            {pageNumbers.map((page, index) => (
                 page === 0
                    ? <div className={paginationStyles.pagination_dots} key={index}>...</div>
                    : <div className={preparePaginationTabClassName(page)} key={index} onClick={() => setCurrentPage(page)}>{page}</div>
            ))}
            <div className={paginationStyles.pagination_element} onClick={() => handleNextPaginationTabClick()}>&#62;</div>
        </div>
    );
}

export default Pagination;
