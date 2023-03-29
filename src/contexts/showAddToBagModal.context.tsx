import React, {createContext, useState} from "react";

type AddToBagModalContextState = {
    shouldShowAddToBagModal: boolean;
    setShouldShowAddToBagModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AddToBagModalContext = createContext({} as AddToBagModalContextState);

export const AddToBagModalProvider = ({children}: { children: React.ReactNode }) => {
    const [shouldShowAddToBagModal, setShouldShowAddToBagModal] = useState(false);
    const value = {
        shouldShowAddToBagModal,
        setShouldShowAddToBagModal,
    };
    return (
        <AddToBagModalContext.Provider value={value}>{children}</AddToBagModalContext.Provider>
    );
};
