import React from "react";
import cryptoHeaderStyles from "./CryptoHeader.module.scss";
import ClientRoutes from "../../../config/routes";
import {Link} from "react-router-dom";

export interface CryptoHeaderProps {
    id: string,
    name: string,
    symbol: string,
    priceUsd: number
}

function CryptoHeader(
    {
        id,
        name,
        symbol,
        priceUsd
    }: CryptoHeaderProps) {

    return <Link className={cryptoHeaderStyles.crypto_header} to={`${ClientRoutes.CryptoInfo}?id=${id}`}>
        {name} ({symbol}) ${priceUsd.toFixed(2)}
    </Link>
}

export default CryptoHeader;