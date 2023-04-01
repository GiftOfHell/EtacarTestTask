import React, {useContext, useEffect, useState} from "react";
import axios from "axios";

import CryptoCurrencyRow from "../../components/CryptoCurrencyRow/CryptoCurrencyRow";
import Pagination from "../../components/Pagination/Pagination";
import AddToBagModal from "../../components/AddToBagModal/AddToBagModal";

import {CryptoCurrencyRowProps} from "../../components/CryptoCurrencyRow/CryptoCurrencyRowProps";
import {ApiCryptoRow} from "../../types/api";
import {PaginationContext} from "../../contexts/pagination.context";

import cryptoListStyles from "./CryptoList.module.scss";

function CryptoList() {
    const {currentPageNumber, setPagination} = useContext(PaginationContext);
    const [cryptoData, setCryptoData] = useState<ApiCryptoRow[]>([]);

    const COIN_CAP_API_URL = import.meta.env.VITE_COIN_CAP_API;
    const ITEMS_PER_PAGE = 10;

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

    const prepareCryptoRow = (cryptoRow: ApiCryptoRow): CryptoCurrencyRowProps => {
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

    return <div className={cryptoListStyles.crypto_currency_list}>
        <div className={cryptoListStyles.crypto_table}>
            <div className={cryptoListStyles.table}>
                <div className={cryptoListStyles.row}>
                    <div className={cryptoListStyles.rank}>Rank</div>
                    <div className={cryptoListStyles.currency_name}>Name</div>
                    <div className={cryptoListStyles.price}>Price</div>
                    <div className={cryptoListStyles.market_cap}>Market Cap
                    </div>
                    <div className={cryptoListStyles.volume}>Volume (24Hr)
                    </div>
                    <div className={cryptoListStyles.change}>Change (24Hr)
                    </div>
                    <div className={cryptoListStyles.add_to_bag}></div>
                </div>
                {cryptoData.map((cryptoRow) => {
                    return <CryptoCurrencyRow key={cryptoRow.id} {...prepareCryptoRow(cryptoRow)}/>
                })}
            </div>
        </div>
        <Pagination/>
        <AddToBagModal/>
    </div>
}

export default CryptoList;
