import React, {useContext} from "react";

import {BagModalContext} from "../../contexts/bagModal.context";
import {AddCryptoToBagProps} from "./AddCryptoToBagProps";

import PlusIcon from "../../assets/images/plusIcon.png";
import cryptoStyles from "./AddCryptoToBag.module.scss";

function AddCryptoToBag(addToBagProps: AddCryptoToBagProps) {
    const {setShouldShowAddToBagModal, setSavedBagCrypto} = useContext(BagModalContext);

    const openAddToBagModal = (): void => {
        setShouldShowAddToBagModal(true);
        setSavedBagCrypto({...addToBagProps});
    }

    return <div className={cryptoStyles.plus_icon_container} onClick={(e) => {
        e.stopPropagation();
        openAddToBagModal();
    }}>
        <img src={PlusIcon} className={cryptoStyles.plus_icon_image} alt='plus icon'/>
    </div>
}

export default AddCryptoToBag;
