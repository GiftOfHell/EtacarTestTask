import React, {useContext, useEffect, useState} from "react";
import axios from "axios";

import CurrencyTableRow from "../../components/CurrencyTableRow/CurrencyTableRow";
import Pagination from "../../components/Pagination/Pagination";
import AddToPortfolioModal from "../../components/AddToPortfolioModal/AddToPortfolioModal";

import {CurrencyTableRowProps} from "../../components/CurrencyTableRow/CurrencyTableRowProps";
import {Currency} from "../../types/api";
import {PaginationContext, PaginationContextState} from "../../contexts/pagination.context";
import {ToastContext, ToastContextState} from "../../contexts/toast.context";

import currencyTableStyles from "./CurrencyTable.module.scss";

const ITEMS_PER_PAGE = 10;

function CurrencyTable() {
    const {currentPage, setPagination, totalPages, setTotalPages} = useContext<PaginationContextState>(PaginationContext);
    const {setErrorMessage, setShouldShowToast} = useContext<ToastContextState>(ToastContext);
    const [currencyData, setCurrencyData] = useState<Currency[]>([]);

    useEffect((): void => {
        const COIN_CAP_API_URL = import.meta.env.VITE_COIN_CAP_API;

        axios.get(`${COIN_CAP_API_URL}/assets`).then(res => {
            setCurrencyData(res.data.data);
            setTotalPages(Math.ceil(res.data.data.length / ITEMS_PER_PAGE));
        }).catch(err => {
            setErrorMessage(err);
            setShouldShowToast(true);
        })
    }, []);

    useEffect((): void => {
        setPagination();
    }, [totalPages, currentPage]);

    const prepareCurrencyTableRow = (currency: Currency): CurrencyTableRowProps => {
        return {
            id: currency.id,
            rank: currency.rank,
            name: currency.name,
            symbol: currency.symbol,
            priceUsd: parseFloat(currency.priceUsd),
            marketCapUsd: parseFloat(currency.marketCapUsd),
            volumeUsd24Hr: parseFloat(currency.volumeUsd24Hr),
            changePercent24Hr: parseFloat(currency.changePercent24Hr),
        }
    }

    return (
        <div className={currencyTableStyles.currency_list}>
            <div className={currencyTableStyles.currency_table}>
                <div className={currencyTableStyles.table}>
                    <div className={currencyTableStyles.row}>
                        <div className={`${currencyTableStyles.column} ${currencyTableStyles.rank}`}>
                            Rank
                        </div>
                        <div className={`${currencyTableStyles.column} ${currencyTableStyles.currency_name}`}>
                            Name
                        </div>
                        <div className={`${currencyTableStyles.column} ${currencyTableStyles.price}`}>
                            Price
                        </div>
                        <div className={`${currencyTableStyles.column} ${currencyTableStyles.market_cap}`}>
                            Market Cap
                        </div>
                        <div className={`${currencyTableStyles.column} ${currencyTableStyles.volume}`}>
                            Volume (24Hr)
                        </div>
                        <div className={`${currencyTableStyles.column} ${currencyTableStyles.change}`}>
                            Change (24Hr)
                        </div>
                        <div className={`${currencyTableStyles.column} ${currencyTableStyles.add_to_portfolio}`}>
                        </div>
                    </div>
                    {currencyData.map((currencyTableRow, index) => {
                        if (index === (currentPage - 1) * ITEMS_PER_PAGE + (index % 10)) {
                            return <CurrencyTableRow key={currencyTableRow.id} {...prepareCurrencyTableRow(currencyTableRow)} />
                        }
                    })}
                </div>
            </div>
            <Pagination />
            <AddToPortfolioModal />
        </div>
    );
}

export default CurrencyTable;
