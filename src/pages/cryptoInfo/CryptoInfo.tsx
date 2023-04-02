import React, {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import axios from "axios";

import CryptoChart from "../../components/CryptoChart/CryptoChart";
import AddCryptoToBag from "../../components/AddCryptoToBag/AddCryptoToBag";
import AddToBagModal from "../../components/AddToBagModal/AddToBagModal";

import {SavedBagCrypto} from "../../types/bag";
import {ApiCryptoRow} from "../../types/api";

import cryptoInfoStyles from "./CryptoInfo.module.scss";

function CryptoInfo() {
    const [cryptoInfoData, setCryptoInfoData] = useState<ApiCryptoRow>();
    const [searchParams] = useSearchParams();

    const COIN_CAP_API_URL = import.meta.env.VITE_COIN_CAP_API;

    useEffect(() => {
        axios.get(`${COIN_CAP_API_URL}/assets`, {
            params: {
                ids: searchParams.get("id")
            }
        }).then(res => {
            setCryptoInfoData(res.data.data[0]);
        })
    }, [searchParams]);

    const prepareBagCrypto = (bagCryptoRow: ApiCryptoRow): SavedBagCrypto => {
        return {
            id: bagCryptoRow.id,
            name: bagCryptoRow.name,
            symbol: bagCryptoRow.symbol,
            priceUsd: parseFloat(bagCryptoRow.priceUsd)
        }
    }

    return <div className={cryptoInfoStyles.crypto_info}>
        <div className={cryptoInfoStyles.wrapper}>
            {cryptoInfoData &&
                <>
                    <p className={`${cryptoInfoStyles.info_block} ${cryptoInfoStyles.crypto_name}`}>
                        {cryptoInfoData.name} ({cryptoInfoData.symbol})
                    </p>
                    <div className={cryptoInfoStyles.info_line}>
                        <p className={cryptoInfoStyles.info_block}>Supply:</p>
                        <p className={cryptoInfoStyles.info_block}>
                            {(parseFloat(cryptoInfoData.supply) / 1e6).toFixed(2)}m
                        </p>
                    </div>
                    <div className={cryptoInfoStyles.info_line}>
                        <p className={cryptoInfoStyles.info_block}>Price:</p>
                        <p className={cryptoInfoStyles.info_block}>
                            ${parseFloat(cryptoInfoData.priceUsd).toFixed(2)}
                        </p>
                    </div>
                    <div className={cryptoInfoStyles.info_line}>
                        <p className={cryptoInfoStyles.info_block}>Market Cap:</p>
                        <p className={cryptoInfoStyles.info_block}>
                            {(parseFloat(cryptoInfoData.marketCapUsd) / 1e9).toFixed(2)}b
                        </p>
                    </div>
                    <div className={cryptoInfoStyles.info_line}>
                        <p className={cryptoInfoStyles.info_block}>Volume (24Hr):</p>
                        <p className={cryptoInfoStyles.info_block}>
                            {(parseFloat(cryptoInfoData.volumeUsd24Hr) / 1e6).toFixed(2)}m
                        </p>
                    </div>
                    <div className={cryptoInfoStyles.info_line}>
                        <p className={cryptoInfoStyles.info_block}>Vwap (24Hr):</p>
                        <p className={cryptoInfoStyles.info_block}>
                            {parseFloat(cryptoInfoData.vwap24Hr).toFixed(2)}
                        </p>
                    </div>
                    <div className={cryptoInfoStyles.info_line}>
                        <p className={cryptoInfoStyles.info_block}>Change (24Hr):</p>
                        <p className={cryptoInfoStyles.info_block}>
                            {parseFloat(cryptoInfoData.changePercent24Hr).toFixed(2)}%
                        </p>
                    </div>
                    <div className={cryptoInfoStyles.chart}>
                        <CryptoChart/>
                    </div>
                    <div className={cryptoInfoStyles.buttons_container}>
                        <a href={cryptoInfoData.explorer}>
                            <button className={cryptoInfoStyles.explorer_button}>
                                More Details
                            </button>
                        </a>
                        <AddCryptoToBag {...prepareBagCrypto(cryptoInfoData)}/>
                        <AddToBagModal/>
                    </div>
                </>
            }
        </div>
    </div>
}

export default CryptoInfo;
