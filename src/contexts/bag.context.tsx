import React, {createContext, useState} from "react";
import {SavedBagCrypto} from "./bagModal.context";

type BagContextState = {
    amountOfCrypto: BagCrypto[];
    setAmountOfCrypto: React.Dispatch<React.SetStateAction<BagCrypto[]>>;
};

export interface BagCrypto extends SavedBagCrypto {
    amount: number
}

export const BagContext = createContext({} as BagContextState);

export const BagProvider = ({children}: { children: React.ReactNode }) => {
    const [amountOfCrypto, setAmountOfCrypto] = useState<BagCrypto[]>([]);
    const value = {
        amountOfCrypto,
        setAmountOfCrypto
    };
    return (
        <BagContext.Provider value={value}>{children}</BagContext.Provider>
    );
};
