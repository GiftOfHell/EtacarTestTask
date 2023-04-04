import React from "react";
import {Route, Routes} from "react-router-dom";
import ApiRoutes from "./config/routes";

import CurrencyStatistics from "./pages/CurrencyStatistics/CurrencyStatistics";
import CurrencyTable from "./pages/CurrencyTable/CurrencyTable";
import Header from "./components/Header/Header";
import Toast from "./components/Toast/Toast";

import "./App.scss";

function App() {

    return (
        <>
            <Header />
            <Toast />
            <Routes>
                <Route path={ApiRoutes.CurrencyStatistics} element={<CurrencyStatistics />} />
                <Route path="*" element={<CurrencyTable />} />
            </Routes>
        </>
    );
}

export default App;
