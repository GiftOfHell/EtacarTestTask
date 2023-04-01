import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";

import {BagModalProvider} from "./contexts/bagModal.context";
import {PaginationProvider} from "./contexts/pagination.context";
import {BagProvider} from "./contexts/bag.context";

import App from "./App";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
        <BagModalProvider>
            <PaginationProvider>
                <BagProvider>
                    <App/>
                </BagProvider>
            </PaginationProvider>
        </BagModalProvider>
    </BrowserRouter>
)
