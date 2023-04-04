import React, {useContext, useState} from "react";

import {
    AddToPortfolioModalContext,
    AddToPortfolioModalContextState,
    initialAddToPortfolioModalState
} from "../../contexts/addToPortfolioModal.context";
import {PortfolioModalContext, PortfolioModalContextState} from "../../contexts/portfolioModal.context";

import addToPortfolioModalStyles from "./AddToPortfolioModal.module.scss";

function AddToPortfolioModal() {
    const {
        shouldShowAddToPortfolioModal,
        setShouldShowAddToPortfolioModal,
        currencyToAddToPortfolio,
        setCurrencyToAddToPortfolio
    } = useContext<AddToPortfolioModalContextState>(AddToPortfolioModalContext);
    const {setLastAddedCurrencyToPortfolio, currencyPortfolioRows} = useContext<PortfolioModalContextState>(PortfolioModalContext);
    const [currencyAmount, setCurrencyAmount] = useState<string>("");
    const [shouldShowInvalidInputException, setShouldShowInvalidInputException] = useState<boolean>(false);
    const [shouldShowMaxAmountException, setShouldShowMaxAmountException] = useState<boolean>(false);

    const preparedModalStateClassName =
        `${addToPortfolioModalStyles.modal} ${shouldShowAddToPortfolioModal 
        ? addToPortfolioModalStyles.show : addToPortfolioModalStyles.do_not_show}`;

    const preparedInvalidInputExceptionClassName =
        `${addToPortfolioModalStyles.exception} ${shouldShowInvalidInputException 
        ? addToPortfolioModalStyles.show : addToPortfolioModalStyles.do_not_show}`;

    const preparedMaxAmountExceptionClassName =
        `${addToPortfolioModalStyles.exception} ${shouldShowMaxAmountException
        ? addToPortfolioModalStyles.show : addToPortfolioModalStyles.do_not_show}`;

    const closeAddToPortfolioModal = (): void => {
        setShouldShowInvalidInputException(false);
        setShouldShowMaxAmountException(false);
        setCurrencyAmount("");
        setShouldShowAddToPortfolioModal(false);
        setCurrencyToAddToPortfolio(initialAddToPortfolioModalState);
    }

    const addCurrencyToPortfolio = (): void => {
        const floatRegex = /^[+-]?\d+(\.\d+)?$/;
        const MIN_CRYPTO_AMOUNT = 0.00001;
        const MAX_CRYPTO_AMOUNT = 1000000;

        if (floatRegex.test(currencyAmount) && parseFloat(currencyAmount) >= MIN_CRYPTO_AMOUNT) {
            const RowWithTotalAmount = currencyPortfolioRows.find(el => el.id === currencyToAddToPortfolio.id);

            if (parseFloat(currencyAmount) + (RowWithTotalAmount ? RowWithTotalAmount.amount : 0) <= MAX_CRYPTO_AMOUNT) {
                setLastAddedCurrencyToPortfolio({
                    id: currencyToAddToPortfolio.id,
                    name: currencyToAddToPortfolio.name,
                    symbol: currencyToAddToPortfolio.symbol,
                    priceUsd: currencyToAddToPortfolio.priceUsd * parseFloat(currencyAmount),
                    amount: parseFloat(currencyAmount)
                });
                closeAddToPortfolioModal();
            } else {
                setShouldShowMaxAmountException(true);
            }
        } else {
            setShouldShowInvalidInputException(true);
        }
    }

    return (
        <div className={preparedModalStateClassName}>
            <div className={addToPortfolioModalStyles.modal_content}>
                <input
                    type="text"
                    className={addToPortfolioModalStyles.input_amount_of_currency}
                    placeholder="Enter amount of currency"
                    onChange={(event) => setCurrencyAmount(event.target.value)}
                    value={currencyAmount}
                >
                </input>
                <div className={preparedInvalidInputExceptionClassName}>
                    Invalid input: Please enter a valid amount of currencycurrency
                </div>
                <div className={preparedMaxAmountExceptionClassName}>
                    You can't have more than 1e6 currency
                </div>
                <div>
                    <button
                        className={addToPortfolioModalStyles.confirm_amount_button}
                        onClick={() => addCurrencyToPortfolio()}
                    >
                        Confirm
                    </button>
                    <button
                        className={addToPortfolioModalStyles.cancel_amount_button}
                        onClick={() => closeAddToPortfolioModal()}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddToPortfolioModal;
