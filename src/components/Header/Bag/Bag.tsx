import React, {useContext, useState} from "react";

import bagStyles from "./Bag.module.scss";
import BagRow from "./BagRow/BagRow";
import {BagContext} from "../../../contexts/bag.context";
import {BagCrypto} from "../../../types/bag";

function Bag() {
    const [shouldShowCryptoInBag, setShouldShowCryptoInBag] = useState<boolean>(false);
    const {amountOfCrypto} = useContext(BagContext);
    const cryptoBagRows = amountOfCrypto.reduce((previousValue: BagCrypto[], currentValue) => {
        const existingRow = previousValue.find(item => item.id === currentValue.id);
        if (existingRow) {
            existingRow.amount += currentValue.amount;
        } else {
            previousValue.push(currentValue);
        }
        return previousValue;
    }, []);

    const openCryptoInBagModal = (): void => {
        setShouldShowCryptoInBag(true);
    }

    const closeCryptoInBagModal = (): void => {
        setShouldShowCryptoInBag(false);
    }

    return <div>
        <button className={bagStyles.button} onClick={openCryptoInBagModal}>
            134,32 USD +2,38 (1,80 %)
        </button>
        <div
            className={`${bagStyles.modal} ${shouldShowCryptoInBag ? bagStyles.show : bagStyles.do_not_show}`}>
            <div className={bagStyles.modal_content}>
                {cryptoBagRows.length > 0 ?
                    cryptoBagRows.map((cryptoBagRow) => {
                        return <BagRow key={cryptoBagRow.id} {...cryptoBagRow}/>
                    }) :
                    <div className={bagStyles.empty_bag}>Bag is Empty</div>
                }
                <button className={bagStyles.cancel_button} onClick={closeCryptoInBagModal}>Cancel</button>
            </div>
        </div>
    </div>
}

export default Bag;