import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import ClientRoutes from "../../config/routes";
import axios from "axios";

import CryptoHeader from "./CryptoHeader/CryptoHeader";
import Bag from "./Bag/Bag";

import {CryptoHeaderProps} from "./CryptoHeader/CryptoHeaderProps";
import {ApiCryptoRow} from "../../types/api";

import headerStyles from "./Header.module.scss";


function Header() {
    const [cryptoHeaderData, setCryptoHeaderData] = useState<ApiCryptoRow[]>([]);

    const COIN_CAP_API_URL = import.meta.env.VITE_COIN_CAP_API;

    const prepareCryptoHeader = (cryptoRow: ApiCryptoRow): CryptoHeaderProps => {
        return {
            id: cryptoRow.id,
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
            <Link className={headerStyles.company_name} to={ClientRoutes.CryptoList}>Crypto</Link>
        </div>
        <div className={headerStyles.header_center}>
            {cryptoHeaderData.map((singleCryptoHeader) => {
                return <CryptoHeader key={singleCryptoHeader.id} {...prepareCryptoHeader(singleCryptoHeader)}/>
            })}
        </div>
        <div className={headerStyles.header_right}>
            <Bag/>
        </div>
    </header>
}

export default Header;
