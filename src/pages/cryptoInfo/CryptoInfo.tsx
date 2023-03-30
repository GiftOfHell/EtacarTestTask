import React from "react";
import cryptoInfoStyles from "./CryptoInfo.module.scss";
import CryptoChart from "../../components/CryptoChart/CryptoChart";

function CryptoInfo() {

    return <div className={cryptoInfoStyles.crypto_info}>
        <div className={cryptoInfoStyles.wrapper}>
            <p className={`${cryptoInfoStyles.info_block} ${cryptoInfoStyles.crypto_name}`}>Bitcoin (BTC)</p>
            <div>
                <p className={cryptoInfoStyles.info_block}>Supply: 19.33m</p>
                <p className={cryptoInfoStyles.info_block}>Max Supply: 21m</p>
            </div>
            <div>
                <p className={cryptoInfoStyles.info_block}>Price: 28374.84$</p>
                <p className={cryptoInfoStyles.info_block}>Market Cap: 548.52b</p>
            </div>
            <p className={cryptoInfoStyles.info_block}>Volume (24Hr): 8.26b</p>
            <p className={cryptoInfoStyles.info_block}>Vwap (24Hr): 27911.82</p>
            <p className={cryptoInfoStyles.info_block}>Change (24Hr): 5.22%</p>
            <div className={cryptoInfoStyles.chart}>
                <CryptoChart/>
            </div>
            <div className={cryptoInfoStyles.explorer_button_container}>
                <button className={cryptoInfoStyles.explorer_button}>
                    More Details
                </button>
            </div>
        </div>
    </div>
}

export default CryptoInfo;