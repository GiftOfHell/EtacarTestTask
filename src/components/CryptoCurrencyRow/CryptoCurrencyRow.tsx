import React from "react";

import cryptoStyles from "./CryptoCurrencyRow.module.scss";
import AddCryptoToBag from "./AddCryptoToBag/AddCryptoToBag";

function CryptoCurrencyRow() {

    return <tr className={cryptoStyles.crypto_currency_row}>
        <th>1</th>
        <th className={cryptoStyles.currency_name}>
            <div>Bitcoin</div>
            <div>BTC</div>
        </th>
        <th>27284.90</th>
        <th>527.43b</th>
        <th>6.25b</th>
        <th>0.50%</th>
        <th>
            <AddCryptoToBag/>
        </th>
    </tr>

}

export default CryptoCurrencyRow;