import React, {createContext, useState} from "react";

export interface PaginationContextState {
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    pageNumbers: number[];
    setPageNumbers: React.Dispatch<React.SetStateAction<number[]>>;
    totalPages: number;
    setTotalPages: React.Dispatch<React.SetStateAction<number>>;
    setPagination: () => void;
}

export const PaginationContext = createContext({} as PaginationContextState);

export const PaginationProvider = ({children}: { children: React.ReactNode }) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageNumbers, setPageNumbers] = useState<number[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);

    const boundaryPages = 3;

    const setPagination = (): void => {
        let pageIndices = Array.from({length: totalPages}, (_, i) => i + 1);

        if (currentPage <= totalPages - boundaryPages) {
            pageIndices.splice(currentPage + 1, totalPages - boundaryPages - (currentPage - 1), 0);
        }

        if (currentPage > boundaryPages) {
            pageIndices.splice(1, currentPage - boundaryPages, 0);
        }

        setPageNumbers(pageIndices);
    }

    const value = {
        currentPage,
        setCurrentPage,
        pageNumbers,
        setPageNumbers,
        totalPages,
        setTotalPages,
        setPagination
    };

    return <PaginationContext.Provider value={value}>{children}</PaginationContext.Provider>;
};
