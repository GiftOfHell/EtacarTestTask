import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import ClientRoutes from "../../config/routes";
import axios from "axios";

import TopRankedCurrency from "./TopRankedCurrency/TopRankedCurrency";
import Portfolio from "../Portfolio/Portfolio";

import {TopRankedCurrencyProps} from "./TopRankedCurrency/TopRankedCurrencyProps";
import {Currency} from "../../types/api";
import {ToastContext, ToastContextState} from "../../contexts/toast.context";

import headerStyles from "./Header.module.scss";


function Header() {
    const {setErrorMessage, setShouldShowToast} = useContext<ToastContextState>(ToastContext);
    const [topRankedCurrencyData, setTopRankedCurrencyData] = useState<Currency[]>([]);

    const prepareTobRankedCurrency = (currency: Currency): TopRankedCurrencyProps => {
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
                limit: 3
            }
        }).then(res => {
            setTopRankedCurrencyData(res.data.data);
        }).catch(err => {
            setErrorMessage(err);
            setShouldShowToast(true);
        })
    }, []);

    return (
        <header className={headerStyles.header}>
            <Link className={headerStyles.company_name} to={ClientRoutes.CurrencyTable}>Crypto</Link>
            <div className={headerStyles.header_center}>
                {topRankedCurrencyData.map((topRankedCurrency) => {
                    return <TopRankedCurrency key={topRankedCurrency.id} {...prepareTobRankedCurrency(topRankedCurrency)} />
                })}
            </div>
            <div className={headerStyles.header_right}>
                <Portfolio />
            </div>
        </header>
    );
}

export default Header;
