import React, {useContext} from "react";

import {BagCrypto} from "../../../../types/bag";
import {BagContext, initialBagState} from "../../../../contexts/bag.context";

import bagStyles from "./BagRow.module.scss";

function BagRow(
    {
        id,
        name,
        symbol,
        priceUsd,
        amount
    }: BagCrypto) {
    const {lastBagRow, setLastBagRow, cryptoBagRows, setCryptoBagRows} = useContext(BagContext);

    const removeBagRow = (): void => {
        const notRemovedBagRows = cryptoBagRows.filter((row) => row.id !== id);
        localStorage.setItem("cryptoBagRows", JSON.stringify(notRemovedBagRows));
        if (id === lastBagRow.id) {
            setLastBagRow(initialBagState);
        }
        setCryptoBagRows(notRemovedBagRows);
    }

    return <div className={bagStyles.bag_crypto_row}>
        <div>
            <div className={bagStyles.bag_crypto_name}>{name} ({symbol})</div>
            <div className={bagStyles.bag_crypto_price}>${priceUsd}</div>
        </div>
        <div className={bagStyles.remove_button_container}>
            <button className={bagStyles.remove_crypto_button} onClick={() => removeBagRow()}>Remove</button>
        </div>
    </div>
}

export default BagRow;
