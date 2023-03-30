import React from "react";
import {CartesianGrid, Line, LineChart, XAxis, YAxis} from "recharts";

function CryptoChart() {

    const data = [
        {name: 'Page A', uv: 4000},
        {name: 'Page B', uv: 3000},
        {name: 'Page C', uv: 2000},
        {name: 'Page D', uv: 2780},
        {name: 'Page E', uv: 1890},
        {name: 'Page F', uv: 2390},
        {name: 'Page G', uv: 3490},
    ];
    
    return <LineChart width={500} height={300} data={data} margin={{top: 5, right: 30, left: 20, bottom: 5,}}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="name"/>
        <YAxis/>
        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
        <Line type="monotone" dataKey="uv" stroke="#82ca9d"/>
    </LineChart>
}

export default CryptoChart;