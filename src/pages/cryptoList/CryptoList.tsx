import React, {useContext, useEffect, useState} from "react";

import CryptoCurrencyRow, {CryptoRowProps} from "../../components/CryptoCurrencyRow/CryptoCurrencyRow";
import cryptoListStyles from "./CryptoList.module.scss";
import {AddToBagModalContext} from "../../contexts/showAddToBagModal.context";
import axios from "axios";
import {ApiCryptoRow} from "../../types/api";
import {PaginationContext} from "../../contexts/pagination.context";
import Pagination from "../../components/Pagination/Pagination";

function CryptoList() {
    const {shouldShowAddToBagModal, setShouldShowAddToBagModal} = useContext(AddToBagModalContext);
    const [cryptoData, setCryptoData] = useState<ApiCryptoRow[]>([]);
    const COIN_CAP_API_URL = import.meta.env.VITE_COIN_CAP_API;
    const {
        currentPageNumber,
        setPagination
    } = useContext(PaginationContext);
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
                    <div className={cryptoListStyles.addToBag}></div>
                </div>
                {cryptoData.map((cryptoRow) => {
                    return <CryptoCurrencyRow {...prepareCryptoRow(cryptoRow)}/>
                })}
            </div>
        </div>
        <Pagination/>
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