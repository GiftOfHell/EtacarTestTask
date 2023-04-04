import React from "react";
import {Link} from "react-router-dom";
import ClientRoutes from "../../../config/routes";

import {TopRankedCurrencyProps} from "./TopRankedCurrencyProps";
import {formatNumber} from "../../../utils/formatters";

import topRankedCurrencyStyles from "./TopRankedCurrency.module.scss";

function TopRankedCurrency({
        id,
        name,
        symbol,
        priceUsd
    }: TopRankedCurrencyProps) {

    return (
        <Link className={topRankedCurrencyStyles.currency_header} to={`${ClientRoutes.CurrencyStatistics}?id=${id}`}>
            <div>{name} ({symbol})</div>
            <div>${formatNumber(priceUsd)}</div>
        </Link>
    );
}

export default TopRankedCurrency;
