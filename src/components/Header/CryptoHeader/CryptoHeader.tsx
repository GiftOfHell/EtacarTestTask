import React from "react";
import cryptoHeaderStyles from "./CryptoHeader.module.scss";

function CryptoHeader() {

    return <div className={cryptoHeaderStyles.crypto_header}>
        Bitcoin(BTC) 27284.90
    </div>
}

export default CryptoHeader;