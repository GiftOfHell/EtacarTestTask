import React, {createContext, useState} from "react";

import {CurrencySummary} from "../types/portfolio";

export interface AddToPortfolioModalContextState {
    shouldShowAddToPortfolioModal: boolean;
    setShouldShowAddToPortfolioModal: React.Dispatch<React.SetStateAction<boolean>>;
    currencyToAddToPortfolio: CurrencySummary;
    setCurrencyToAddToPortfolio: React.Dispatch<React.SetStateAction<CurrencySummary>>;
}

export const initialAddToPortfolioModalState = {
    id: "",
    name: "",
    symbol: "",
    priceUsd: 0
}

export const AddToPortfolioModalContext = createContext({} as AddToPortfolioModalContextState);

export const AddToPortfolioModalProvider = ({children}: { children: React.ReactNode }) => {
    const [shouldShowAddToPortfolioModal, setShouldShowAddToPortfolioModal] = useState<boolean>(false);
    const [currencyToAddToPortfolio, setCurrencyToAddToPortfolio] = useState<CurrencySummary>(initialAddToPortfolioModalState);

    const value = {
        shouldShowAddToPortfolioModal,
        setShouldShowAddToPortfolioModal,
        currencyToAddToPortfolio,
        setCurrencyToAddToPortfolio
    };

    return <AddToPortfolioModalContext.Provider value={value}>{children}</AddToPortfolioModalContext.Provider>;
};
