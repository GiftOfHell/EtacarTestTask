import React, {createContext, useState} from "react";

export interface ToastContextState {
    shouldShowToast: boolean;
    setShouldShowToast: React.Dispatch<React.SetStateAction<boolean>>;
    errorMessage: string;
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

export const ToastContext = createContext({} as ToastContextState);

export const ToastProvider = ({children}: { children: React.ReactNode }) => {
    const [shouldShowToast, setShouldShowToast] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const value = {
        shouldShowToast,
        setShouldShowToast,
        errorMessage,
        setErrorMessage
    };

    return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
};
