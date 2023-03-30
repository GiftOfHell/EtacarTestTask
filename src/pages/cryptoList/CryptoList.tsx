import React, {useContext, useEffect, useState} from "react";

import CryptoCurrencyRow, {CryptoRowProps} from "../../components/CryptoCurrencyRow/CryptoCurrencyRow";
import cryptoListStyles from "./CryptoList.module.scss";
import {AddToBagModalContext} from "../../contexts/showAddToBagModal.context";
import axios from "axios";
import {ApiCryptoRow} from "../../types/api";

function CryptoList() {
    const {shouldShowAddToBagModal, setShouldShowAddToBagModal} = useContext(AddToBagModalContext);
    const [cryptoData, setCryptoData] = useState<ApiCryptoRow[]>([]);
    const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
    const [pages, setPages] = useState<number[]>([]);
    const COIN_CAP_API_URL = import.meta.env.VITE_COIN_CAP_API;
    const ITEMS_PER_PAGE = 10;
    const MAX_AMOUNT_PAGES = 10;
    const DOTS = 0;

    useEffect(() => {
        axios.get(`${COIN_CAP_API_URL}/assets`, {
            params: {
                offset: (currentPageNumber - 1) * ITEMS_PER_PAGE,
                limit: ITEMS_PER_PAGE
            }
        }).then(res => {
            setCryptoData(res.data.data);
        })
        setPagination();
    }, [currentPageNumber]);

    const prepareCryptoRow = (cryptoRow: ApiCryptoRow): CryptoRowProps => {
        return {
            id: cryptoRow.id,
            rank: cryptoRow.rank,
            name: cryptoRow.name,
            symbol: cryptoRow.symbol,
            priceUsd: parseFloat(cryptoRow.priceUsd),
            marketCapUsd: parseFloat(cryptoRow.marketCapUsd),
            volumeUsd24Hr: parseFloat(cryptoRow.volumeUsd24Hr),
            changePercent24Hr: parseFloat(cryptoRow.changePercent24Hr),
        }
    }

    const prepareModalStateClassName = (): string => {
        if (shouldShowAddToBagModal) {
            return `${cryptoListStyles.modal} ${cryptoListStyles.show}`;
        }
        return `${cryptoListStyles.modal} ${cryptoListStyles.doNotShow}`;
    }

    const closeAddToBagModal = (): void => {
        setShouldShowAddToBagModal(false);
    }

    const setPagination = (): void => {
        if (currentPageNumber <= 3) {
            const leftPages = [];
            for (let i = 1; i <= 3; i++) {
                leftPages.push(i);
            }
            setPages([...leftPages, DOTS, MAX_AMOUNT_PAGES]);
            return;
        }
        if (currentPageNumber >= MAX_AMOUNT_PAGES - 2) {
            const rightPages = [];
            for (let i = MAX_AMOUNT_PAGES - 2; i <= MAX_AMOUNT_PAGES; i++) {
                rightPages.push(i);
            }
            setPages([1, DOTS, ...rightPages]);
            return;
        } else {
            const middlePages = [];
            for (let i = currentPageNumber - 1; i <= currentPageNumber + 1; i++) {
                middlePages.push(i);
            }
            setPages([1, DOTS, ...middlePages, DOTS, MAX_AMOUNT_PAGES]);
            return;
        }
    }

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

    return <div className={cryptoListStyles.crypto_currency_list}>
        <div className={cryptoListStyles.crypto_table}>
            <table className={cryptoListStyles.table}>
                <thead className={cryptoListStyles.thead}>
                <tr>
                    <th className={cryptoListStyles.column_name}>Rank</th>
                    <th className={`${cryptoListStyles.currency_name} ${cryptoListStyles.column_name}`}>Name</th>
                    <th className={cryptoListStyles.column_name}>Price</th>
                    <th className={cryptoListStyles.column_name}>Market Cap</th>
                    <th className={cryptoListStyles.column_name}>Volume (24Hr)</th>
                    <th className={cryptoListStyles.column_name}>Change (24Hr)</th>
                    <th className={cryptoListStyles.column_name}></th>
                </tr>
                </thead>
                <tbody className={cryptoListStyles.tbody}>
                {cryptoData.map((cryptoRow) => {
                    return <CryptoCurrencyRow {...prepareCryptoRow(cryptoRow)}/>
                })}
                </tbody>
            </table>
        </div>
        <div className={cryptoListStyles.pagination}>
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
        <div
            className={prepareModalStateClassName()}>
            <div className={cryptoListStyles.modal_content}>
                <input type="text" className={cryptoListStyles.input_amount_of_crypto}
                       placeholder="Enter amount of crypto"></input>
                <div>
                    <button className={cryptoListStyles.confirm_amount_button}>Confirm</button>
                    <button className={cryptoListStyles.cancel_amount_button} onClick={closeAddToBagModal}>Cancel
                    </button>
                </div>
            </div>
        </div>
    </div>
}

export default CryptoList;