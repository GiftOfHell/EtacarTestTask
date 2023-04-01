import React from "react";
import {Route, Routes} from "react-router-dom";
import ClientRoutes from "./config/routes";

import CryptoInfo from "./pages/cryptoInfo/CryptoInfo";
import CryptoList from "./pages/cryptoList/CryptoList";
import Header from "./components/Header/Header";

import "./App.scss";

function App() {
    return <>
        <Header/>
        <Routes>
            <Route path={ClientRoutes.CryptoInfo} element={<CryptoInfo/>}/>
            <Route path="*" element={<CryptoList/>}/>
        </Routes>
    </>
}

export default App
