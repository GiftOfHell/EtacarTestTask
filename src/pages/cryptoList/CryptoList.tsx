import React, {useContext} from "react";

import CryptoCurrencyRow from "../../components/CryptoCurrencyRow/CryptoCurrencyRow";
import cryptoListStyles from "./CryptoList.module.scss";
import {AddToBagModalContext} from "../../contexts/showAddToBagModal.context";

function CryptoList() {
    const {shouldShowAddToBagModal, setShouldShowAddToBagModal} = useContext(AddToBagModalContext);

    function closeAddToBagModal() {
        setShouldShowAddToBagModal(false);
    }

    return <div className={cryptoListStyles.crypto_currency_list}>
        <div className={cryptoListStyles.crypto_table}>
            <table>
                <thead>
                <tr>
                    <th>Rank</th>
                    <th className={cryptoListStyles.currency_name}>Name</th>
                    <th>Price</th>
                    <th>Market Cap</th>
                    <th>Volume (24Hr)</th>
                    <th>Change (24Hr)</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <CryptoCurrencyRow/>
                <CryptoCurrencyRow/>
                <CryptoCurrencyRow/>
                <CryptoCurrencyRow/>
                <CryptoCurrencyRow/>
                <CryptoCurrencyRow/>
                <CryptoCurrencyRow/>
                <CryptoCurrencyRow/>
                <CryptoCurrencyRow/>
                <CryptoCurrencyRow/>
                </tbody>
            </table>
        </div>
        <div className={cryptoListStyles.pagination}>
            <a href="#">&laquo;</a>
            <a className={cryptoListStyles.active} href="#">1</a>
            <a href="#">2</a>
            <a href="#">3</a>
            <a href="#">...</a>
            <a href="#">10</a>
            <a href="#">&raquo;</a>
        </div>
        <div
            className={`${cryptoListStyles.modal} ${shouldShowAddToBagModal ? cryptoListStyles.show : cryptoListStyles.doNotShow}`}>
            <div className={cryptoListStyles.modal_content}>
                <input type="text" className={cryptoListStyles.input_amount_of_crypto}
                       placeholder="Enter amount of crypto"></input>
                <div>
                    <button className={cryptoListStyles.confirm_amount_button}>Confirm</button>
                    <button className={cryptoListStyles.cancel_amount_button} onClick={closeAddToBagModal}>Cancel
                    </button>
                </div>
            </div>
        </div>
    </div>
}

export default CryptoList;