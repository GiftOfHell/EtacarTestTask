import React, {useContext, useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import axios from "axios";

import CurrencyChart from "../../components/CurrencyChart/CurrencyChart";
import AddToPortfolio from "../../components/AddToPortfolio/AddToPortfolio";
import AddToPortfolioModal from "../../components/AddToPortfolioModal/AddToPortfolioModal";

import {CurrencySummary} from "../../types/portfolio";
import {Currency} from "../../types/api";
import {formatNumber} from "../../utils/formatters";
import {ToastContext, ToastContextState} from "../../contexts/toast.context";

import currencyStatisticsStyles from "./CurrencyStatistics.module.scss";

function CurrencyStatistics() {
    const {setErrorMessage, setShouldShowToast} = useContext<ToastContextState>(ToastContext);
    const [currencyStatisticsData, setCurrencyStatisticsData] = useState<Currency>();
    const [searchParams] = useSearchParams();

    const prepareCurrencySummary = (currency: Currency): CurrencySummary => {
        return {
            id: currency.id,
            name: currency.name,
            symbol: currency.symbol,
            priceUsd: parseFloat(currency.priceUsd)
        }
    }

    useEffect((): void => {
        const COIN_CAP_API_URL = import.meta.env.VITE_COIN_CAP_API;

        axios.get(`${COIN_CAP_API_URL}/assets`, {
            params: {
                ids: searchParams.get("id")
            }
        }).then(res => {
            setCurrencyStatisticsData(res.data.data[0]);
        }).catch(err => {
            setErrorMessage(err);
            setShouldShowToast(true);
        })
    }, [searchParams]);

    return (
        <div className={currencyStatisticsStyles.currency_info}>
            <div className={currencyStatisticsStyles.wrapper}>
                {currencyStatisticsData && (
                    <>
                        <p className={`${currencyStatisticsStyles.info_block} ${currencyStatisticsStyles.currency_name}`}>
                            {currencyStatisticsData.name} ({currencyStatisticsData.symbol})
                        </p>
                        <div className={currencyStatisticsStyles.info_line}>
                            <p className={currencyStatisticsStyles.info_block}>Supply:</p>
                            <p className={currencyStatisticsStyles.info_block}>
                                {formatNumber(parseFloat(currencyStatisticsData.supply))}
                            </p>
                        </div>
                        <div className={currencyStatisticsStyles.info_line}>
                            <p className={currencyStatisticsStyles.info_block}>Price:</p>
                            <p className={currencyStatisticsStyles.info_block}>
                                ${formatNumber(parseFloat(currencyStatisticsData.priceUsd))}
                            </p>
                        </div>
                        <div className={currencyStatisticsStyles.info_line}>
                            <p className={currencyStatisticsStyles.info_block}>Market Cap:</p>
                            <p className={currencyStatisticsStyles.info_block}>
                                {formatNumber(parseFloat(currencyStatisticsData.marketCapUsd))}
                            </p>
                        </div>
                        <div className={currencyStatisticsStyles.info_line}>
                            <p className={currencyStatisticsStyles.info_block}>Volume (24Hr):</p>
                            <p className={currencyStatisticsStyles.info_block}>
                                {formatNumber(parseFloat(currencyStatisticsData.volumeUsd24Hr))}
                            </p>
                        </div>
                        <div className={currencyStatisticsStyles.info_line}>
                            <p className={currencyStatisticsStyles.info_block}>Vwap (24Hr):</p>
                            <p className={currencyStatisticsStyles.info_block}>
                                {formatNumber(parseFloat(currencyStatisticsData.vwap24Hr))}
                            </p>
                        </div>
                        <div className={currencyStatisticsStyles.info_line}>
                            <p className={currencyStatisticsStyles.info_block}>Change (24Hr):</p>
                            <p className={currencyStatisticsStyles.info_block}>
                                {parseFloat(currencyStatisticsData.changePercent24Hr) > 0 ? "+" : ""}
                                {formatNumber(parseFloat(currencyStatisticsData.changePercent24Hr))}%
                            </p>
                        </div>
                        <div className={currencyStatisticsStyles.chart}>
                            <CurrencyChart />
                        </div>
                        <div className={currencyStatisticsStyles.buttons_container}>
                            <a href={currencyStatisticsData.explorer}>
                                <button className={currencyStatisticsStyles.explorer_button}>
                                    More Details
                                </button>
                            </a>
                            <AddToPortfolio {...prepareCurrencySummary(currencyStatisticsData)} />
                            <AddToPortfolioModal />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default CurrencyStatistics;
