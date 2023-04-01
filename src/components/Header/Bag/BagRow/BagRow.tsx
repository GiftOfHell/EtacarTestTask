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
    const {lastBagRow, setLastBagRow, cryptoBagRows, setCryptoBagRows} = useContext(BagContext);

    const removeBagRow = (): void => {
        const notRemovedBagRows = cryptoBagRows.filter((row) => row.id !== id);
        localStorage.setItem("cryptoBagRows", JSON.stringify(notRemovedBagRows));
        if (id === lastBagRow.id) {
            setLastBagRow({
                id: "",
                name: "",
                symbol: "",
                priceUsd: 0,
                amount: 0
            });
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
