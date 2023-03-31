import React, {useEffect, useState} from "react";
import {CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import {useSearchParams} from "react-router-dom";
import axios from "axios";
import {ApiCryptoChart} from "../../types/api";

function CryptoChart() {
    const [cryptoChartData, setCryptoChartData] = useState<ApiCryptoChart[]>();
    const COIN_CAP_API_URL = import.meta.env.VITE_COIN_CAP_API;
    const [searchParams] = useSearchParams();
    const MONTH_MILLISECONDS = 2592000000;

    useEffect(() => {
        const timeNow = Date.now();
        const timeMonthAgo = timeNow - MONTH_MILLISECONDS;
        axios.get(`${COIN_CAP_API_URL}/assets/${searchParams.get("id")}/history`, {
            params: {
                interval: "d1",
                end: timeNow,
                start: timeMonthAgo
            }
        }).then(res => {
            setCryptoChartData(res.data.data);
        })
    }, []);

    return <>
        {cryptoChartData &&
            <LineChart width={650} height={300}
                       data={cryptoChartData}
                       margin={{top: 5, right: 30, left: 20, bottom: 5,}}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis tickFormatter={(value) => value + 1} interval={1}/>
                <YAxis tickFormatter={(value) => `$${value}`}/>
                <Tooltip separator={": "}
                         labelFormatter={(value) => `Day ${value + 1}`}
                         formatter={(value, name) => [`$${parseFloat(value.toString()).toFixed(2)}`, "Price"]}/>
                <Line type="monotone" dataKey="priceUsd" stroke="#82ca9d" activeDot={{r: 8}}/>
            </LineChart>
        }
    </>
}

export default CryptoChart;