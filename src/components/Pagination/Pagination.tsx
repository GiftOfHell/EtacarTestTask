import React, {useContext} from "react";
import cryptoListStyles from "./Pagination.module.scss";
import {PaginationContext} from "../../contexts/pagination.context";
import {DOTS, MAX_AMOUNT_PAGES} from "../../constants/pagination.constants";

function Pagination() {
    const {
        currentPageNumber,
        setCurrentPageNumber,
        pages
    } = useContext(PaginationContext);


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

    const handlePrevTabPaginationClick = () => {
        if (currentPageNumber !== 1) {
            setCurrentPageNumber(currentPageNumber - 1);
        }
    }

    return <div className={cryptoListStyles.pagination}>
        <div className={cryptoListStyles.pagination_element}
             onClick={() => handlePrevTabPaginationClick()}>&#60;</div>
        {pages.map((page) => {
            return page === DOTS ? <div className={cryptoListStyles.pagination_dots}>...</div> :
                <div
                    className={preparePaginationTabClassName(page)}
                    key={page} onClick={() => setCurrentPageNumber(page)}>{page}</div>
        })}
        <div className={cryptoListStyles.pagination_element}
             onClick={() => handleNextTabPaginationClick()}>&#62;</div>
    </div>

}

export default Pagination;