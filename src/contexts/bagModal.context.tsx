import React, {createContext, useState} from "react";

type BagModalContextState = {
    shouldShowAddToBagModal: boolean;
    setShouldShowAddToBagModal: React.Dispatch<React.SetStateAction<boolean>>;
    cryptoCurrencyPrice: number;
    setCryptoCurrencyPrice: React.Dispatch<React.SetStateAction<number>>;
    cryptoCurrencyId: string;
    setCryptoCurrencyId: React.Dispatch<React.SetStateAction<string>>;
};

export const BagModalContext = createContext({} as BagModalContextState);

export const BagModalProvider = ({children}: { children: React.ReactNode }) => {
    const [shouldShowAddToBagModal, setShouldShowAddToBagModal] = useState<boolean>(false);
    const [cryptoCurrencyId, setCryptoCurrencyId] = useState<string>("");
    const [cryptoCurrencyPrice, setCryptoCurrencyPrice] = useState<number>(0);
    const value = {
        shouldShowAddToBagModal,
        setShouldShowAddToBagModal,
        cryptoCurrencyId,
        setCryptoCurrencyId,
        cryptoCurrencyPrice,
        setCryptoCurrencyPrice
    };
    return (
        <BagModalContext.Provider value={value}>{children}</BagModalContext.Provider>
    );
};
