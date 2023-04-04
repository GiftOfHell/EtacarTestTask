import React, {useContext, useEffect, useState} from "react";
import axios from "axios";

import PortfolioModal from "../PortfolioModal/PortfolioModal";

import {CurrencySummaryWithAmount} from "../../types/portfolio";
import {Currency} from "../../types/api";
import {formatNumber} from "../../utils/formatters";
import {PortfolioModalContext, PortfolioModalContextState} from "../../contexts/portfolioModal.context";

import portfolioStyles from "./Portfolio.module.scss";
import {ToastContext, ToastContextState} from "../../contexts/toast.context";

function Portfolio() {
    const {
        lastAddedCurrencyToPortfolio,
        currencyPortfolioRows,
        setCurrencyPortfolioRows,
        setShouldShowPortfolioModal
    } = useContext<PortfolioModalContextState>(PortfolioModalContext);
    const {setErrorMessage, setShouldShowToast} = useContext<ToastContextState>(ToastContext);
    const [currentCurrencySummaryWithAmountData, setCurrentCurrencySummaryWithAmountData] = useState<Currency[]>([]);
    const [currentTotalPrice, setCurrentTotalPrice] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect((): void => {
        const COIN_CAP_API_URL = import.meta.env.VITE_COIN_CAP_API;

        axios.get(`${COIN_CAP_API_URL}/assets`, {
            params: {
                ids: currencyPortfolioRows ? currencyPortfolioRows.map(row => row.id).join(',') : []
            }
        }).then(res => {
            setCurrentCurrencySummaryWithAmountData(res.data.data);
        }).catch(err => {
            setErrorMessage(err);
            setShouldShowToast(true);
        })
    }, []);

    useEffect((): void => {
        if (currencyPortfolioRows.length) {
            localStorage.setItem("currencyPortfolioRows", JSON.stringify(currencyPortfolioRows));
        }
    }, [currencyPortfolioRows]);

    useEffect((): void => {
        const storedPortfolioData = localStorage.getItem("currencyPortfolioRows");
        const portfolioData: CurrencySummaryWithAmount[] = storedPortfolioData ? JSON.parse(storedPortfolioData) : [];
        const existingRow = portfolioData.find(row => row.id === lastAddedCurrencyToPortfolio.id);

        if (existingRow) {
            const updatedPortfolioData = portfolioData.map((row) => {
                if (row.id === lastAddedCurrencyToPortfolio.id) {
                    return {
                        ...row,
                        priceUsd: row.priceUsd + lastAddedCurrencyToPortfolio.priceUsd,
                        amount: row.amount + lastAddedCurrencyToPortfolio.amount
                    };
                }
                return row;
            });
            setCurrencyPortfolioRows(updatedPortfolioData);
        } else {
            if (lastAddedCurrencyToPortfolio.id !== "") {
                setCurrencyPortfolioRows([...portfolioData, lastAddedCurrencyToPortfolio]);
            } else {
                setCurrencyPortfolioRows([...portfolioData]);
            }
        }
    }, [lastAddedCurrencyToPortfolio]);

    useEffect((): void => {
        setTotalPrice(currencyPortfolioRows.reduce((acc, curr) => {
            return acc + curr.priceUsd;
        }, 0));
    }, [currencyPortfolioRows])

    useEffect((): void => {
        setCurrentTotalPrice(currentCurrencySummaryWithAmountData.reduce((acc, curr) => {
            const currencyPortfolioRow = currencyPortfolioRows && currencyPortfolioRows.find(row => row.id === curr.id);
            const currentCurrencySummaryWithAmountAmount = currencyPortfolioRow ? currencyPortfolioRow.amount : 0;
            return acc + parseFloat(curr.priceUsd) * currentCurrencySummaryWithAmountAmount;
        }, 0));
    }, [currencyPortfolioRows, currentCurrencySummaryWithAmountData])

    const preparePortfolioText = (): string => {
        const difference = currentTotalPrice - totalPrice;
        const differenceSign = difference > 0 ? "+" : "";
        const differenceUsd = formatNumber(difference);
        const differencePercentage = formatNumber(difference / totalPrice * 100);
        return `${formatNumber(totalPrice)} USD ${differenceSign}${differenceUsd} (${differenceSign}${differencePercentage}%)`;
    }

    return (
        <div>
            <button className={portfolioStyles.portfolio_button} onClick={() => setShouldShowPortfolioModal(true)}>
                {lastAddedCurrencyToPortfolio.id !== ""
                    ? <div>
                        {lastAddedCurrencyToPortfolio.name}
                        ({lastAddedCurrencyToPortfolio.symbol})
                        ${formatNumber(lastAddedCurrencyToPortfolio.priceUsd)}
                    </div>
                    : <>
                        {currencyPortfolioRows.length
                            ? <div>{preparePortfolioText()}</div>
                            : <div>Portfolio is Empty</div>
                        }
                    </>
                }
            </button>
            <PortfolioModal />
        </div>
    );
}

export default Portfolio;
