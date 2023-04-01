import React, {createContext, useState} from "react";

import {DOTS, MAX_AMOUNT_PAGES} from "../constants/pagination.constants";

type PaginationContextState = {
    currentPageNumber: number;
    setCurrentPageNumber: React.Dispatch<React.SetStateAction<number>>;
    pages: number[];
    setPagination: () => void;
};

export const PaginationContext = createContext({} as PaginationContextState);

export const PaginationProvider = ({children}: { children: React.ReactNode }) => {
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [pages, setPages] = useState<number[]>([]);

    const setPagination = (): void => {
        if (currentPageNumber <= 3) {
            const leftPages = [];
            for (let i = 1; i <= 3; i++) {
                leftPages.push(i);
            }
            setPages([...leftPages, DOTS, MAX_AMOUNT_PAGES]);
        } else {
            if (currentPageNumber >= MAX_AMOUNT_PAGES - 2) {
                const rightPages = [];
                for (let i = MAX_AMOUNT_PAGES - 2; i <= MAX_AMOUNT_PAGES; i++) {
                    rightPages.push(i);
                }
                setPages([1, DOTS, ...rightPages]);
            } else {
                const middlePages = [];
                for (let i = currentPageNumber - 1; i <= currentPageNumber + 1; i++) {
                    middlePages.push(i);
                }
                setPages([1, DOTS, ...middlePages, DOTS, MAX_AMOUNT_PAGES]);
            }
        }
    }
    const value = {
        currentPageNumber,
        setCurrentPageNumber,
        pages,
        setPagination
    };
    return (
        <PaginationContext.Provider value={value}>{children}</PaginationContext.Provider>
    );
};
