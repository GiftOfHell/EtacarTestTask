import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";

import App from "./App";
import {AddToBagModalProvider} from "./contexts/showAddToBagModal.context";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
        <AddToBagModalProvider>
            <App/>
        </AddToBagModalProvider>
    </BrowserRouter>
)
