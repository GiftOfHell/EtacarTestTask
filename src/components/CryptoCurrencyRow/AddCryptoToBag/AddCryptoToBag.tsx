import React, {useContext} from "react";

import cryptoStyles from "./AddCryptoToBag.module.scss";
import PlusIcon from "../../../assets/images/plusIcon.png";
import {BagModalContext} from "../../../contexts/bagModal.context";

type AddCryptoToBagProps = {
    id: string,
    name: string,
    symbol: string,
    priceUsd: number
}

function AddCryptoToBag({id, name, symbol, priceUsd}: AddCryptoToBagProps) {
    const {setShouldShowAddToBagModal, setSavedBagCrypto} = useContext(BagModalContext);

    const openAddToBagModal = (): void => {
        setShouldShowAddToBagModal(true);
        setSavedBagCrypto({
            id,
            name,
            symbol,
            priceUsd
        });
    }

    return <div className={cryptoStyles.plus_icon_container} onClick={openAddToBagModal}>
        <img src={PlusIcon} className={cryptoStyles.plus_icon_image} alt='plus icon'/>
    </div>


}

export default AddCryptoToBag;