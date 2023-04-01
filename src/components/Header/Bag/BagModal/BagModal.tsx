import React, {useContext} from "react";

import BagRow from "./BagRow/BagRow";

import {BagContext} from "../../../../contexts/bag.context";
import {BagModalContext} from "../../../../contexts/bagModal.context";

import bagStyles from "./BagModal.module.scss";

function BagModal() {
    const {cryptoBagRows} = useContext(BagContext);
    const {shouldShowCryptoInBag, setShouldShowCryptoInBag} = useContext(BagModalContext);

    const closeCryptoInBagModal = (): void => {
        setShouldShowCryptoInBag(false);
    }

    const prepareModalClassName = (): string => {
        if (shouldShowCryptoInBag) {
            return `${bagStyles.modal} ${bagStyles.show}`;
        }
        return `${bagStyles.modal} ${bagStyles.do_not_show}`;
    }

    return <div className={prepareModalClassName()}>
        <div className={bagStyles.modal_content}>
            {cryptoBagRows.length
                ? cryptoBagRows.map((cryptoBagRow, index) => {
                    return <BagRow key={index} {...cryptoBagRow}/>
                })
                : <div className={bagStyles.empty_bag}>Bag is Empty</div>
            }
            <button className={bagStyles.cancel_button} onClick={() => closeCryptoInBagModal()}>Cancel</button>
        </div>
    </div>
}

export default BagModal;
