import React, {createContext, useState} from "react";

import {SavedBagCrypto} from "../types/bag";

type BagModalContextState = {
    shouldShowAddToBagModal: boolean;
    setShouldShowAddToBagModal: React.Dispatch<React.SetStateAction<boolean>>;
    savedBagCrypto: SavedBagCrypto;
    setSavedBagCrypto: React.Dispatch<React.SetStateAction<SavedBagCrypto>>;
    shouldShowCryptoInBag: boolean;
    setShouldShowCryptoInBag: React.Dispatch<React.SetStateAction<boolean>>;
};

export const initialBagModalState = {
    id: "",
    name: "",
    symbol: "",
    priceUsd: 0
}

export const BagModalContext = createContext({} as BagModalContextState);

export const BagModalProvider = ({children}: { children: React.ReactNode }) => {
    const [shouldShowAddToBagModal, setShouldShowAddToBagModal] = useState(false);
    const [savedBagCrypto, setSavedBagCrypto] = useState<SavedBagCrypto>(initialBagModalState);
    const [shouldShowCryptoInBag, setShouldShowCryptoInBag] = useState(false);
    const value = {
        shouldShowAddToBagModal,
        setShouldShowAddToBagModal,
        savedBagCrypto,
        setSavedBagCrypto,
        shouldShowCryptoInBag,
        setShouldShowCryptoInBag
    };
    return (
        <BagModalContext.Provider value={value}>{children}</BagModalContext.Provider>
    );
};
