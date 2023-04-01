import React, {useEffect, useState} from "react";
import cryptoInfoStyles from "./CryptoInfo.module.scss";
import CryptoChart from "../../components/CryptoChart/CryptoChart";
import axios from "axios";
import {ApiCryptoRow} from "../../types/api";
import {useSearchParams} from "react-router-dom";
import AddCryptoToBag from "../../components/CryptoCurrencyRow/AddCryptoToBag/AddCryptoToBag";
import {SavedBagCrypto} from "../../types/bag";
import AddToBagModal from "../../components/AddToBagModal/AddToBagModal";

function CryptoInfo() {
    const [cryptoInfoData, setCryptoInfoData] = useState<ApiCryptoRow>();
    const COIN_CAP_API_URL = import.meta.env.VITE_COIN_CAP_API;
    const [searchParams] = useSearchParams();

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
                    <p className={`${cryptoInfoStyles.info_block} ${cryptoInfoStyles.crypto_name}`}>{cryptoInfoData.name} ({cryptoInfoData.symbol})</p>
                    <div>
                        <p className={cryptoInfoStyles.info_block}>Supply:</p>
                        <p className={cryptoInfoStyles.info_block}>Price:</p>
                        <p className={cryptoInfoStyles.info_block}>Market Cap:</p>
                    </div>
                    <div>
                        <p className={cryptoInfoStyles.info_block}>{(parseFloat(cryptoInfoData.supply) / 1e6).toFixed(2)}m</p>
                        <p className={cryptoInfoStyles.info_block}>${parseFloat(cryptoInfoData.priceUsd).toFixed(2)}</p>
                        <p className={cryptoInfoStyles.info_block}>{(parseFloat(cryptoInfoData.marketCapUsd) / 1e9).toFixed(2)}b</p>
                    </div>
                    <div>
                        <p className={cryptoInfoStyles.info_block}>Volume (24Hr):</p>
                        <p className={cryptoInfoStyles.info_block}>Vwap (24Hr):</p>
                        <p className={cryptoInfoStyles.info_block}>Change (24Hr):</p>
                    </div>
                    <div>
                        <p className={cryptoInfoStyles.info_block}>{(parseFloat(cryptoInfoData.volumeUsd24Hr) / 1e6).toFixed(2)}m</p>
                        <p className={cryptoInfoStyles.info_block}>{parseFloat(cryptoInfoData.vwap24Hr).toFixed(2)}</p>
                        <p className={cryptoInfoStyles.info_block}>{parseFloat(cryptoInfoData.changePercent24Hr).toFixed(2)}%</p>
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