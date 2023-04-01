import React from "react";
import {Link} from "react-router-dom";
import ClientRoutes from "../../../config/routes";

import {CryptoHeaderProps} from "./CryptoHeaderProps";

import cryptoHeaderStyles from "./CryptoHeader.module.scss";

function CryptoHeader(
    {
        id,
        name,
        symbol,
        priceUsd
    }: CryptoHeaderProps) {

    return <Link className={cryptoHeaderStyles.crypto_header} to={`${ClientRoutes.CryptoInfo}?id=${id}`}>
        <div>{name} ({symbol})</div>
        <div>${priceUsd.toFixed(2)}</div>
    </Link>
}

export default CryptoHeader;
