import React from "react";
import CryptoHeader from "./CryptoHeader/CryptoHeader";
import Bag from "./Bag/Bag";
import headerStyles from "./Header.module.scss";

function Header() {

    return <header className={headerStyles.header}>
        <div className={headerStyles.header_left}>
            <h1>Crypto</h1>
        </div>
        <div className={headerStyles.header_center}>
            <CryptoHeader/>
            <CryptoHeader/>
            <CryptoHeader/>
        </div>
        <div className={headerStyles.header_right}>
            <Bag/>
        </div>
    </header>
}

export default Header;