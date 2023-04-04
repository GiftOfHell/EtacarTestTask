import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";

import {ToastProvider} from "./contexts/toast.context";
import {PortfolioModalProvider} from "./contexts/portfolioModal.context";
import {PaginationProvider} from "./contexts/pagination.context";
import {AddToPortfolioModalProvider} from "./contexts/addToPortfolioModal.context";

import App from "./App";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
        <ToastProvider>
            <PaginationProvider>
                <PortfolioModalProvider>
                    <AddToPortfolioModalProvider>
                            <App />
                    </AddToPortfolioModalProvider>
                </PortfolioModalProvider>
            </PaginationProvider>
        </ToastProvider>
    </BrowserRouter>
);
