import React from "react";
import cryptoInfoStyles from "./CryptoInfo.module.scss";
import {CartesianGrid, Line, LineChart, XAxis, YAxis} from 'recharts';

function CryptoInfo() {

    const data = [
        {name: 'Page A', uv: 4000},
        {name: 'Page B', uv: 3000},
        {name: 'Page C', uv: 2000},
        {name: 'Page D', uv: 2780},
        {name: 'Page E', uv: 1890},
        {name: 'Page F', uv: 2390},
        {name: 'Page G', uv: 3490},
    ];

    return <div className={cryptoInfoStyles.crypto_info}>
        <div className={cryptoInfoStyles.wrapper}>
            <p className={cryptoInfoStyles.crypto_name}>Bitcoin (BTC)</p>
            <div>
                <p>Supply: 19.33m</p>
                <p>Max Supply: 21m</p>
            </div>
            <div>
                <p>Price: 28374.84$</p>
                <p>Market Cap: 548.52b</p>
            </div>
            <p>Volume (24Hr): 8.26b</p>
            <p>Vwap (24Hr): 27911.82</p>
            <p>Change (24Hr): 5.22%</p>
            <div className={cryptoInfoStyles.graph}>
                <LineChart width={500} height={300} data={data} margin={{top: 5, right: 30, left: 20, bottom: 5,}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d"/>
                </LineChart>
            </div>
            <div className={cryptoInfoStyles.explorer_button_container}>
                <button className={cryptoInfoStyles.explorer_button}>
                    More Details
                </button>
            </div>
        </div>
    </div>
}

export default CryptoInfo;