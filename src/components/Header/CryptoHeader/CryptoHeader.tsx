import React from "react";
import cryptoHeaderStyles from "./CryptoHeader.module.scss";

export interface CryptoHeaderProps {
    name: string,
    symbol: string,
    priceUsd: number
}

function CryptoHeader(
    {
        name,
        symbol,
        priceUsd
    }: CryptoHeaderProps) {

    return <div className={cryptoHeaderStyles.crypto_header}>
        {name} ({symbol}) ${priceUsd.toFixed(2)}
    </div>
}

export default CryptoHeader;