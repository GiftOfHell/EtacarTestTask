import React, {useEffect, useState} from "react";
import CryptoHeader, {CryptoHeaderProps} from "./CryptoHeader/CryptoHeader";
import Bag from "./Bag/Bag";
import headerStyles from "./Header.module.scss";
import axios from "axios";
import {ApiCryptoRow} from "../../types/api";

function Header() {
    const [cryptoHeaderData, setCryptoHeaderData] = useState<ApiCryptoRow[]>([]);
    const COIN_CAP_API_URL = import.meta.env.VITE_COIN_CAP_API;

    const prepareCryptoHeader = (cryptoRow: ApiCryptoRow): CryptoHeaderProps => {
        return {
            name: cryptoRow.name,
            symbol: cryptoRow.symbol,
            priceUsd: parseFloat(cryptoRow.priceUsd)
        }
    }

    useEffect(() => {
        axios.get(`${COIN_CAP_API_URL}/assets`, {
            params: {
                limit: 3
            }
        }).then(res => {
            setCryptoHeaderData(res.data.data);
        })
    }, []);

    return <header className={headerStyles.header}>
        <div className={headerStyles.header_left}>
            <h1 className={headerStyles.company_name}>Crypto</h1>
        </div>
        <div className={headerStyles.header_center}>
            {cryptoHeaderData.map((singleCryptoHeader) => {
                return <CryptoHeader {...prepareCryptoHeader(singleCryptoHeader)}/>
            })}
        </div>
        <div className={headerStyles.header_right}>
            <Bag/>
        </div>
    </header>
}

export default Header;