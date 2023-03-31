import React, {useContext} from "react";

import cryptoStyles from "./AddCryptoToBag.module.scss";
import PlusIcon from "../../../assets/images/plusIcon.png";
import {BagModalContext} from "../../../contexts/bagModal.context";

type AddCryptoToBagProps = {
    id: string,
    price: number
}

function AddCryptoToBag({id, price}: AddCryptoToBagProps) {
    const {setShouldShowAddToBagModal, setCryptoCurrencyId, setCryptoCurrencyPrice} = useContext(BagModalContext);

    const openAddToBagModal = (): void => {
        setShouldShowAddToBagModal(true);
        setCryptoCurrencyId(id);
        setCryptoCurrencyPrice(price);
    }

    return <div className={cryptoStyles.plus_icon_container} onClick={openAddToBagModal}>
        <img src={PlusIcon} className={cryptoStyles.plus_icon_image} alt='plus icon'/>
    </div>


}

export default AddCryptoToBag;