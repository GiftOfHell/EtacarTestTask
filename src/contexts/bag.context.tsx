import React, {createContext, useState} from "react";
import {BagCrypto} from "../types/bag";

type BagContextState = {
    amountOfCrypto: BagCrypto[];
    setAmountOfCrypto: React.Dispatch<React.SetStateAction<BagCrypto[]>>;
};

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
