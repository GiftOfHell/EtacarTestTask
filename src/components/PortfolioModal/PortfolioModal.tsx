import React, {useContext} from "react";

import PortfolioModalRow from "./PortfolioModalRow/PortfolioModalRow";

import {PortfolioModalContext, PortfolioModalContextState} from "../../contexts/portfolioModal.context";

import portfolioModalStyles from "./PortfolioModal.module.scss";

function PortfolioModal() {
    const {
        shouldShowPortfolioModal,
        setShouldShowPortfolioModal,
        currencyPortfolioRows
    } = useContext<PortfolioModalContextState>(PortfolioModalContext);

    const preparedModalClassName =
        `${portfolioModalStyles.modal} ${shouldShowPortfolioModal 
        ? portfolioModalStyles.show : portfolioModalStyles.do_not_show}`;

    return (
        <div className={preparedModalClassName}>
            <div className={portfolioModalStyles.modal_content}>
                <div className={portfolioModalStyles.portfolio_rows}>
                    {currencyPortfolioRows.length
                        ? currencyPortfolioRows.map((currencyPortfolioRow, index) => {
                            return <PortfolioModalRow key={index} {...currencyPortfolioRow} />
                        })
                        : <div className={portfolioModalStyles.empty_portfolio}>Portfolio is Empty</div>
                    }
                </div>
                <button className={portfolioModalStyles.cancel_button} onClick={() => setShouldShowPortfolioModal(false)}>Cancel</button>
            </div>
        </div>
    );
}

export default PortfolioModal;
