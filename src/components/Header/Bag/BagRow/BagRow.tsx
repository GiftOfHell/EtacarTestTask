import React, {useContext} from "react";

import bagStyles from "./BagRow.module.scss";
import {BagContext} from "../../../../contexts/bag.context";
import {BagCrypto} from "../../../../types/bag";

function BagRow(
    {
        id,
        name,
        symbol,
        priceUsd,
        amount
    }: BagCrypto) {
    const {amountOfCrypto, setAmountOfCrypto} = useContext(BagContext);

    const removeBagRow = (): void => {
        setAmountOfCrypto(amountOfCrypto.reduce((previousValue: BagCrypto[], currentValue) => {
            if (currentValue.id !== id) {
                previousValue.push(currentValue);
            }
            return previousValue;
        }, []));
    }

    return <div className={bagStyles.bag_crypto_row}>
        <div>
            <div className={bagStyles.bag_crypto_name}>{name} ({symbol})</div>
            <div className={bagStyles.bag_crypto_price}>${parseFloat(priceUsd.toFixed(2)) * amount}</div>
        </div>
        <div className={bagStyles.remove_button_container}>
            <button className={bagStyles.remove_crypto_button} onClick={() => removeBagRow()}>Remove</button>
        </div>
    </div>
}

export default BagRow;
