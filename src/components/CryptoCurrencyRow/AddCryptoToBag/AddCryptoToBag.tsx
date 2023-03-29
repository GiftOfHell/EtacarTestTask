import React, {useContext} from "react";

import cryptoStyles from "./AddCryptoToBag.module.scss";
import PlusIcon from "../../../assets/images/plusIcon.png";
import {AddToBagModalContext} from "../../../contexts/showAddToBagModal.context";

function AddCryptoToBag() {
    const {setShouldShowAddToBagModal} = useContext(AddToBagModalContext);

    function openAddToBagModal() {
        setShouldShowAddToBagModal(true);
    }

    return <div className={cryptoStyles.plus_icon_container} onClick={openAddToBagModal}>
        <img src={PlusIcon} className={cryptoStyles.plus_icon_image} alt='plus icon'/>
    </div>


}

export default AddCryptoToBag;