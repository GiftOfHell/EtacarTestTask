import React, {useContext} from "react";

import {AddToPortfolioModalContext, AddToPortfolioModalContextState} from "../../contexts/addToPortfolioModal.context";
import {CurrencySummary} from "../../types/portfolio";

import PlusIcon from "../../assets/images/plusIcon.png";
import addToPortfolioStyles from "./AddToPortfolio.module.scss";

function AddToPortfolio(AddToPortfolioProps: CurrencySummary) {
    const {
        setShouldShowAddToPortfolioModal,
        setCurrencyToAddToPortfolio
    } = useContext<AddToPortfolioModalContextState>(AddToPortfolioModalContext);

    const openAddToPortfolioModal = (): void => {
        setShouldShowAddToPortfolioModal(true);
        setCurrencyToAddToPortfolio({...AddToPortfolioProps});
    }

    return (
        <div className={addToPortfolioStyles.plus_icon_container} onClick={() => openAddToPortfolioModal()}>
            <img src={PlusIcon} className={addToPortfolioStyles.plus_icon_image} alt='plus icon'/>
        </div>
    );
}

export default AddToPortfolio;
