import React, {useState} from "react";

import bagStyles from "./Bag.module.scss";

function Bag() {
    const [shouldShowCryptoInBag, setShouldShowCryptoInBag] = useState<boolean>(false);

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
            className={`${bagStyles.modal} ${shouldShowCryptoInBag ? bagStyles.show : bagStyles.doNotShow}`}>
            <div className={bagStyles.modal_content}>
                <div className={bagStyles.bag_crypto_row}>
                    <div className={bagStyles.bag_crypto}>Bitcoin(BTC) 134,32 USD</div>
                    <button className={bagStyles.remove_crypto_button}>Remove</button>
                </div>
                <button className={bagStyles.cancel_button} onClick={closeCryptoInBagModal}>Cancel</button>
            </div>
        </div>
    </div>
}

export default Bag;