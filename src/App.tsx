import {Route, Routes} from "react-router-dom";

import "./App.scss";
import CryptoInfo from "./pages/cryptoInfo/CryptoInfo";
import CryptoList from "./pages/cryptoList/CryptoList";
import ClientRoutes from "./config/routes";
import Header from "./components/Header/Header";
import React from "react";

function App() {
    return <>
        <Header/>
        <Routes>
            <Route path={ClientRoutes.CryptoInfo} element={<CryptoInfo/>}/>
            <Route path={ClientRoutes.CryptoList} element={<CryptoList/>}/>
        </Routes>
    </>
}

export default App
