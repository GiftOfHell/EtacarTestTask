import React from "react";

import cryptoStyles from "./CryptoCurrencyRow.module.scss";
import AddCryptoToBag from "./AddCryptoToBag/AddCryptoToBag";
import {Link} from "react-router-dom";
import ClientRoutes from "../../config/routes";

export interface CryptoRowProps {
    id: string,
    rank: string,
    name: string,
    symbol: string,
    priceUsd: number,
    marketCapUsd: number,
    volumeUsd24Hr: number,
    changePercent24Hr: number,
}

function CryptoCurrencyRow(
    {
        id,
        rank,
        name,
        symbol,
        priceUsd,
        marketCapUsd,
        volumeUsd24Hr,
        changePercent24Hr
    }: CryptoRowProps) {

    return <Link className={cryptoStyles.link} to={`${ClientRoutes.CryptoInfo}?id=${id}`}>
        <div className={cryptoStyles.crypto_currency_row}>
            <div className={cryptoStyles.rank}>{rank}</div>
            <div className={cryptoStyles.currency_name}>
                <div>{name}</div>
                <div>{symbol}</div>
            </div>
            <div className={cryptoStyles.price}>${priceUsd.toFixed(2)}</div>
            <div
                className={cryptoStyles.market_cap}>{(marketCapUsd / 1e9).toFixed(2)}b
            </div>
            <div
                className={cryptoStyles.volume}>{(volumeUsd24Hr / 1e6).toFixed(2)}m
            </div>
            <div className={cryptoStyles.change}>{changePercent24Hr.toFixed(2)}%
            </div>
            <div className={cryptoStyles.addToBag}>
                <AddCryptoToBag/>
            </div>
        </div>
    </Link>
}

export default CryptoCurrencyRow;