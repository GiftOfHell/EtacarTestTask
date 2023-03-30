import React from "react";

import cryptoStyles from "./CryptoCurrencyRow.module.scss";
import AddCryptoToBag from "./AddCryptoToBag/AddCryptoToBag";

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

    return <tr className={cryptoStyles.crypto_currency_row} key={id}>
        <th className={cryptoStyles.crypto_table_element}>{rank}</th>
        <th className={`${cryptoStyles.currency_name} ${cryptoStyles.crypto_table_element}`}>
            <div>{name}</div>
            <div>{symbol}</div>
        </th>
        <th className={cryptoStyles.crypto_table_element}>${priceUsd.toFixed(2)}</th>
        <th className={cryptoStyles.crypto_table_element}>{(marketCapUsd / 1e6).toFixed(2)}m</th>
        <th className={cryptoStyles.crypto_table_element}>{(volumeUsd24Hr / 1e6).toFixed(2)}m</th>
        <th className={cryptoStyles.crypto_table_element}>{changePercent24Hr.toFixed(2)}%</th>
        <th className={cryptoStyles.crypto_table_element}>
            <AddCryptoToBag/>
        </th>
    </tr>

}

export default CryptoCurrencyRow;