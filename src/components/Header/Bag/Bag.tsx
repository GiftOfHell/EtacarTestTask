import React, {useContext, useEffect, useState} from "react";
import axios from "axios";

import BagModal from "./BagModal/BagModal";

import {BagCrypto} from "../../../types/bag";
import {ApiCryptoRow} from "../../../types/api";
import {BagContext} from "../../../contexts/bag.context";
import {BagModalContext} from "../../../contexts/bagModal.context";

import bagStyles from "./Bag.module.scss";

function Bag() {
    const {lastBagRow, cryptoBagRows, setCryptoBagRows} = useContext(BagContext);
    const {setShouldShowCryptoInBag} = useContext(BagModalContext);
    const [currentBagCryptoData, setCurrentBagCryptoData] = useState<ApiCryptoRow[]>([]);
    const [currentTotalPrice, setCurrentTotalPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    const COIN_CAP_API_URL = import.meta.env.VITE_COIN_CAP_API;

    useEffect(() => {
        axios.get(`${COIN_CAP_API_URL}/assets`, {
            params: {
                ids: cryptoBagRows ? cryptoBagRows.map(row => row.id).join(',') : []
            }
        }).then(res => {
            setCurrentBagCryptoData(res.data.data);
        })
    }, []);

    useEffect(() => {
        if (cryptoBagRows.length) {
            localStorage.setItem("cryptoBagRows", JSON.stringify(cryptoBagRows));
        }
    }, [cryptoBagRows]);

    useEffect(() => {
        const storedBagData = localStorage.getItem("cryptoBagRows");
        const bagData: BagCrypto[] = storedBagData ? JSON.parse(storedBagData) : [];
        const existingRow = bagData.find(row => row.id === lastBagRow.id);
        if (existingRow) {
            const updatedBagData = bagData.map((row) => {
                if (row.id === lastBagRow.id) {
                    return {
                        ...row,
                        priceUsd: row.priceUsd + lastBagRow.priceUsd,
                        amount: row.amount + lastBagRow.amount
                    };
                }
                return row;
            });
            setCryptoBagRows(updatedBagData);
        } else {
            if (lastBagRow.id !== "") {
                setCryptoBagRows([...bagData, lastBagRow]);
            } else {
                setCryptoBagRows([...bagData]);
            }
        }
    }, [lastBagRow]);

    useEffect(() => {
        setTotalPrice(cryptoBagRows.reduce((acc, curr) => {
            return acc + curr.priceUsd;
        }, 0));
    }, [cryptoBagRows])

    useEffect(() => {
        setCurrentTotalPrice(currentBagCryptoData.reduce((acc, curr) => {
            const cryptoBagRow = cryptoBagRows && cryptoBagRows.find(row => row.id === curr.id);
            const currentBagCryptoAmount = cryptoBagRow ? cryptoBagRow.amount : 0;
            return acc + parseFloat((parseFloat(curr.priceUsd) * currentBagCryptoAmount).toFixed(2));
        }, 0));
    }, [cryptoBagRows, currentBagCryptoData])

    const openCryptoInBagModal = (): void => {
        setShouldShowCryptoInBag(true);
    }
    const prepareBagText = (): string => {
        const difference = currentTotalPrice - totalPrice;
        const differenceSign = difference > 0 ? "+" : "";
        const differenceUsd = difference.toFixed(2);
        const differencePercentage = (difference / totalPrice * 100).toFixed(2);
        return `${totalPrice} USD ${differenceSign}${differenceUsd} (${differenceSign}${differencePercentage}%)`;
    }

    return <div>
        <button className={bagStyles.bag_button} onClick={() => openCryptoInBagModal()}>
            {lastBagRow.id !== ""
                ? `${lastBagRow.name} (${lastBagRow.symbol}) $${lastBagRow.priceUsd}`
                : <>
                    {cryptoBagRows.length
                        ? <div>{prepareBagText()}</div>
                        : <div>Bag is Empty</div>
                    }
                </>
            }
        </button>
        <BagModal/>
    </div>
}

export default Bag;
