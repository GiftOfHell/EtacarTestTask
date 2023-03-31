import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";

import App from "./App";
import {AddToBagModalProvider} from "./contexts/showAddToBagModal.context";
import {PaginationProvider} from "./contexts/pagination.context";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
        <AddToBagModalProvider>
            <PaginationProvider>
                <App/>
            </PaginationProvider>
        </AddToBagModalProvider>
    </BrowserRouter>
)
