import React, {useContext, useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import axios from "axios";

import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {CurrencyChartPoint} from "../../types/api";
import {formatNumber} from "../../utils/formatters";
import {ToastContext, ToastContextState} from "../../contexts/toast.context";

function CurrencyChart() {
    const {setErrorMessage, setShouldShowToast} = useContext<ToastContextState>(ToastContext);
    const [currencyChartData, setCurrencyChartData] = useState<CurrencyChartPoint[]>();
    const [searchParams] = useSearchParams();

    useEffect((): void => {
        const timeNow = Date.now();
        const MONTH_MILLISECONDS = 2_592_000_000;
        const timeMonthAgo = timeNow - MONTH_MILLISECONDS;
        const COIN_CAP_API_URL = import.meta.env.VITE_COIN_CAP_API;

        axios.get(`${COIN_CAP_API_URL}/assets/${searchParams.get("id")}/history`, {
            params: {
                interval: "d1",
                end: timeNow,
                start: timeMonthAgo
            }
        }).then(res => {
            setCurrencyChartData(res.data.data);
        }).catch(err => {
            setErrorMessage(err);
            setShouldShowToast(true);
        })
    }, []);

    return (
        <>
            {currencyChartData &&
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={currencyChartData}
                        margin={{top: 5, right: 30, left: 20, bottom: 5,}}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis tickFormatter={(value) => value + 1} interval={1} />
                        <YAxis tickFormatter={(value) => `$${value}`} />
                        <Tooltip
                            separator={": "}
                            labelFormatter={(value) => `Day ${value + 1}`}
                            formatter={(value: string) => [`$${formatNumber(parseFloat(value))}`, "Price"]}
                        />
                        <Line type="monotone" dataKey="priceUsd" stroke="#82ca9d" activeDot={{r: 8}} />
                    </LineChart>
                </ResponsiveContainer>
            }
        </>
    );
}

export default CurrencyChart;
