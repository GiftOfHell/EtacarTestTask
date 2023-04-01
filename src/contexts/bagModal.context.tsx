import React, {createContext, useState} from "react";

type BagModalContextState = {
    shouldShowAddToBagModal: boolean;
    setShouldShowAddToBagModal: React.Dispatch<React.SetStateAction<boolean>>;
    savedBagCrypto: SavedBagCrypto;
    setSavedBagCrypto: React.Dispatch<React.SetStateAction<SavedBagCrypto>>;
};

export interface SavedBagCrypto {
    id: string,
    name: string,
    symbol: string,
    priceUsd: number
}

export const BagModalContext = createContext({} as BagModalContextState);

export const BagModalProvider = ({children}: { children: React.ReactNode }) => {
    const [shouldShowAddToBagModal, setShouldShowAddToBagModal] = useState<boolean>(false);
    const [savedBagCrypto, setSavedBagCrypto] = useState<SavedBagCrypto>({
        id: "",
        name: "",
        symbol: "",
        priceUsd: 0
    });
    const value = {
        shouldShowAddToBagModal,
        setShouldShowAddToBagModal,
        savedBagCrypto,
        setSavedBagCrypto
    };
    return (
        <BagModalContext.Provider value={value}>{children}</BagModalContext.Provider>
    );
};
