import React, {createContext, useState} from "react";

import {BagCrypto} from "../types/bag";

type BagContextState = {
    lastBagRow: BagCrypto;
    setLastBagRow: React.Dispatch<React.SetStateAction<BagCrypto>>;
    cryptoBagRows: BagCrypto[];
    setCryptoBagRows: React.Dispatch<React.SetStateAction<BagCrypto[]>>;
};

export const initialBagState = {
    id: "",
    name: "",
    symbol: "",
    priceUsd: 0,
    amount: 0
}

export const BagContext = createContext({} as BagContextState);

export const BagProvider = ({children}: { children: React.ReactNode }) => {
    const [lastBagRow, setLastBagRow] = useState<BagCrypto>(initialBagState);
    const [cryptoBagRows, setCryptoBagRows] = useState<BagCrypto[]>([]);
    const value = {
        lastBagRow,
        setLastBagRow,
        cryptoBagRows,
        setCryptoBagRows
    };
    return (
        <BagContext.Provider value={value}>{children}</BagContext.Provider>
    );
};
