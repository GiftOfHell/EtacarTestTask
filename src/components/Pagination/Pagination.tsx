import React, {useContext} from "react";

import {PaginationContext} from "../../contexts/pagination.context";
import {DOTS, MAX_AMOUNT_PAGES} from "../../constants/pagination.constants";

import cryptoListStyles from "./Pagination.module.scss";

function Pagination() {
    const {currentPageNumber, setCurrentPageNumber, pages} = useContext(PaginationContext);

    const preparePaginationTabClassName = (page: number): string => {
        if (page === currentPageNumber) {
            return `${cryptoListStyles.pagination_element} ${cryptoListStyles.active}`;
        }
        return `${cryptoListStyles.pagination_element}`;
    }

    const handleNextTabPaginationClick = (): void => {
        if (currentPageNumber !== MAX_AMOUNT_PAGES) {
            setCurrentPageNumber(currentPageNumber + 1);
        }
    }

    const handlePrevTabPaginationClick = (): void => {
        if (currentPageNumber !== 1) {
            setCurrentPageNumber(currentPageNumber - 1);
        }
    }

    return <div className={cryptoListStyles.pagination}>
        <div className={cryptoListStyles.pagination_element}
             onClick={() => handlePrevTabPaginationClick()}>&#60;</div>
        {pages.map((page, index) => {
            return page === DOTS
                ? <div className={cryptoListStyles.pagination_dots} key={index}>...</div>
                : <div className={preparePaginationTabClassName(page)}
                       key={index} onClick={() => setCurrentPageNumber(page)}>{page}</div>
        })}
        <div className={cryptoListStyles.pagination_element}
             onClick={() => handleNextTabPaginationClick()}>&#62;</div>
    </div>
}

export default Pagination;
