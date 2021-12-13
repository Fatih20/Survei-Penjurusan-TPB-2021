import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { PieChart, Pie, Tooltip } from "recharts";

const Main = styled.div`
`;

export default function DataVisualization ({data}){
    return (
        <Main>
            <PieChart width={500} height={500}>
                <Pie data={data} dataKey="jumlah" nameKey="namaJurusan" outerRadius={200} fill="#8884d8"/>
                <Tooltip />
            </PieChart>
        </Main>
    )
}