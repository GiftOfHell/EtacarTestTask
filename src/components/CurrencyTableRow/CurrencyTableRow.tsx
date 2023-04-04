import React from "react";
import {Link} from "react-router-dom";
import ClientRoutes from "../../config/routes";

import AddToPortfolio from "../AddToPortfolio/AddToPortfolio";

import {formatNumber} from "../../utils/formatters";
import {CurrencyTableRowProps} from "./CurrencyTableRowProps";

import currencyTableRowStyles from "./CurrencyTableRow.module.scss";

function CurrencyTableRow({
        id,
        rank,
        name,
        symbol,
        priceUsd,
        marketCapUsd,
        volumeUsd24Hr,
        changePercent24Hr
    }: CurrencyTableRowProps) {

    return (
        <div className={currencyTableRowStyles.currency_row}>
            <Link className={currencyTableRowStyles.link} to={`${ClientRoutes.CurrencyStatistics}?id=${id}`}>
                <div className={currencyTableRowStyles.currency_row_info}>
                    <div className={`${currencyTableRowStyles.cell} ${currencyTableRowStyles.rank}`}>{rank}</div>
                    <div className={`${currencyTableRowStyles.cell} ${currencyTableRowStyles.currency_name}`}>
                        <div>{name}</div>
                        <div>({symbol})</div>
                    </div>
                    <div className={`${currencyTableRowStyles.cell} ${currencyTableRowStyles.price}`}>
                        ${formatNumber(priceUsd)}
                    </div>
                    <div
                        className={`${currencyTableRowStyles.cell} ${currencyTableRowStyles.market_cap}`}>
                        {formatNumber(marketCapUsd)}
                    </div>
                    <div
                        className={`${currencyTableRowStyles.cell} ${currencyTableRowStyles.volume}`}>
                        {formatNumber(volumeUsd24Hr)}
                    </div>
                    <div className={`${currencyTableRowStyles.cell} ${currencyTableRowStyles.change}`}>
                        {changePercent24Hr > 0 ? "+" : ""}{formatNumber(changePercent24Hr)}%
                    </div>
                </div>
            </Link>
            <div className={`${currencyTableRowStyles.cell} ${currencyTableRowStyles.add_to_portfolio}`}>
                <AddToPortfolio {...{id, name, symbol, priceUsd}} />
            </div>
        </div>
    );
}

export default CurrencyTableRow;
