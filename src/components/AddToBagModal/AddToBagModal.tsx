import React, {useContext, useState} from "react";
import modalStyles from "./AddToBagModal.module.scss";
import {BagModalContext} from "../../contexts/bagModal.context";
import {BagContext} from "../../contexts/bag.context";

function AddToBagModal() {
    const {
        shouldShowAddToBagModal,
        setShouldShowAddToBagModal,
        savedBagCrypto,
        setSavedBagCrypto
    } = useContext(BagModalContext);
    const {setLastBagRow} = useContext(BagContext);
    const [cryptoAmount, setCryptoAmount] = useState<string>("");
    const [shouldShowException, setShouldShowException] = useState<boolean>(false);

    const prepareModalStateClassName = (): string => {
        if (shouldShowAddToBagModal) {
            return `${modalStyles.modal} ${modalStyles.show}`;
        }
        return `${modalStyles.modal} ${modalStyles.do_not_show}`;
    }

    const prepareModalHeightClassName = (): string => {
        if (shouldShowException) {
            return `${modalStyles.modal_content} ${modalStyles.modal_with_exception}`;
        }
        return `${modalStyles.modal_content} ${modalStyles.modal_without_exception}`;
    }

    const prepareExceptionClassName = (): string => {
        if (shouldShowException) {
            return `${modalStyles.exception} ${modalStyles.show}`;
        }
        return `${modalStyles.exception} ${modalStyles.do_not_show}`;
    }

    const closeAddToBagModal = (): void => {
        setShouldShowException(false);
        setCryptoAmount("");
        setShouldShowAddToBagModal(false);
        setSavedBagCrypto({
            id: "",
            name: "",
            symbol: "",
            priceUsd: 0
        });
    }

    const getCryptoAmountFromInput = (amount: string): void => {
        setCryptoAmount(amount);
    }

    const addCryptoToBag = (): void => {
        if (isNaN(parseFloat(cryptoAmount)) || parseFloat(cryptoAmount) <= 0) {
            setShouldShowException(true);
            return;
        }
        setLastBagRow({
            id: savedBagCrypto.id,
            name: savedBagCrypto.name,
            symbol: savedBagCrypto.symbol,
            priceUsd: parseFloat((savedBagCrypto.priceUsd * parseFloat(cryptoAmount)).toFixed(2)),
            amount: parseFloat(cryptoAmount)
        });
        setSavedBagCrypto({
            id: "",
            name: "",
            symbol: "",
            priceUsd: 0
        });
        setCryptoAmount("");
        setShouldShowException(false);
        closeAddToBagModal();
    }
    return <div className={prepareModalStateClassName()}>
        <div
            className={prepareModalHeightClassName()}>
            <input type="text" className={modalStyles.input_amount_of_crypto}
                   placeholder="Enter amount of crypto"
                   onChange={(e) => getCryptoAmountFromInput(e.target.value)} value={cryptoAmount}></input>
            <div
                className={prepareExceptionClassName()}>
                Invalid input: Please enter a valid amount of cryptocurrency
            </div>
            <div>
                <button className={modalStyles.confirm_amount_button} onClick={() => addCryptoToBag()}>Confirm</button>
                <button className={modalStyles.cancel_amount_button} onClick={() => closeAddToBagModal()}>Cancel
                </button>
            </div>
        </div>
    </div>
}

export default AddToBagModal;