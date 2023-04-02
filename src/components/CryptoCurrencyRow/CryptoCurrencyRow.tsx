import React from "react";
import {Link} from "react-router-dom";
import ClientRoutes from "../../config/routes";

import AddCryptoToBag from "../AddCryptoToBag/AddCryptoToBag";

import {CryptoCurrencyRowProps} from "./CryptoCurrencyRowProps";
import cryptoStyles from "./CryptoCurrencyRow.module.scss";

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
    }: CryptoCurrencyRowProps) {

    return <div className={cryptoStyles.crypto_currency_row}>
        <Link className={cryptoStyles.link} to={`${ClientRoutes.CryptoInfo}?id=${id}`}>
            <div className={cryptoStyles.crypto_currency_row_info}>
                <div className={`${cryptoStyles.cell} ${cryptoStyles.rank}`}>{rank}</div>
                <div className={`${cryptoStyles.cell} ${cryptoStyles.currency_name}`}>
                    <div>{name}</div>
                    <div>({symbol})</div>
                </div>
                <div className={`${cryptoStyles.cell} ${cryptoStyles.price}`}>
                    ${priceUsd.toFixed(2)}
                </div>
                <div
                    className={`${cryptoStyles.cell} ${cryptoStyles.market_cap}`}>
                    {(marketCapUsd / 1e9).toFixed(2)}b
                </div>
                <div
                    className={`${cryptoStyles.cell} ${cryptoStyles.volume}`}>
                    {(volumeUsd24Hr / 1e6).toFixed(2)}m
                </div>
                <div className={`${cryptoStyles.cell} ${cryptoStyles.change}`}>
                    {changePercent24Hr.toFixed(2)}%
                </div>
            </div>
        </Link>
        <div className={`${cryptoStyles.cell} ${cryptoStyles.add_to_bag}`}>
            <AddCryptoToBag {...{id, name, symbol, priceUsd}}/>
        </div>
    </div>
}

export default CryptoCurrencyRow;
