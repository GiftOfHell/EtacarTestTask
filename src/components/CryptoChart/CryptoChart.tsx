import React, {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import axios from "axios";

import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {ApiCryptoChart} from "../../types/api";

function CryptoChart() {
    const [cryptoChartData, setCryptoChartData] = useState<ApiCryptoChart[]>();
    const [searchParams] = useSearchParams();

    const COIN_CAP_API_URL = import.meta.env.VITE_COIN_CAP_API;
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
    }, [cryptoChartData]);

    return <>
        {cryptoChartData &&
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={cryptoChartData}
                    margin={{top: 5, right: 30, left: 20, bottom: 5,}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis tickFormatter={(value) => value + 1} interval={1}/>
                    <YAxis tickFormatter={(value) => `$${value}`}/>
                    <Tooltip separator={": "}
                             labelFormatter={(value) => `Day ${value + 1}`}
                             formatter={(value) => [`$${parseFloat(value.toString()).toFixed(2)}`, "Price"]}/>
                    <Line type="monotone" dataKey="priceUsd" stroke="#82ca9d" activeDot={{r: 8}}/>
                </LineChart>
            </ResponsiveContainer>
        }
    </>
}

export default CryptoChart;
