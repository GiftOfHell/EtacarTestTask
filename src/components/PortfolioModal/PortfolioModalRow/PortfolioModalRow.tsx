import React, {useContext} from "react";

import {CurrencySummaryWithAmount} from "../../../types/portfolio";
import {formatNumber} from "../../../utils/formatters";
import {
    initialCurrencyPortfolioRowState,
    PortfolioModalContext,
    PortfolioModalContextState
} from "../../../contexts/portfolioModal.context";

import portfolioModalRowStyles from "./PortfolioModalRow.module.scss";

function PortfolioModalRow({
        id,
        name,
        symbol,
        priceUsd,
        amount
    }: CurrencySummaryWithAmount) {
    const {
        lastAddedCurrencyToPortfolio,
        setLastAddedCurrencyToPortfolio,
        currencyPortfolioRows,
        setCurrencyPortfolioRows
    } = useContext<PortfolioModalContextState>(PortfolioModalContext);

    const removePortfolioRow = (): void => {
        const notRemovedPortfolioRows = currencyPortfolioRows.filter((row) => row.id !== id);
        localStorage.setItem("currencyPortfolioRows", JSON.stringify(notRemovedPortfolioRows));
        if (id === lastAddedCurrencyToPortfolio.id) {
            setLastAddedCurrencyToPortfolio(initialCurrencyPortfolioRowState);
        }
        setCurrencyPortfolioRows(notRemovedPortfolioRows);
    }

    return (
        <div className={portfolioModalRowStyles.portfolio_currency_row}>
            <div>
                <div className={portfolioModalRowStyles.portfolio_currency_name}>{name} ({symbol})</div>
                <div className={portfolioModalRowStyles.portfolio_currency_amount}>
                    Amount: {formatNumber(amount)}
                </div>
                <div className={portfolioModalRowStyles.portfolio_currency_price}>
                    ${formatNumber(priceUsd)}
                </div>
            </div>
            <div className={portfolioModalRowStyles.remove_button_container}>
                <button className={portfolioModalRowStyles.remove_currency_button} onClick={() => removePortfolioRow()}>Remove</button>
            </div>
        </div>
    );
}

export default PortfolioModalRow;
