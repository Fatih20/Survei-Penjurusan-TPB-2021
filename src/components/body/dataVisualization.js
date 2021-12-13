import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { PieChart, Pie, Tooltip } from "recharts";

// Import Data
import { useFacultiesData } from "../../context/FacultyDataContext";

const Main = styled.div`
`;

export default function DataVisualization ({facultyShown, jurusanClicked}){

    

    return (
        <Main>
            <PieChart width={500} height={500}>
                <Pie dataKey="jumlah" nameKey="namaJurusan" outerRadius={200} fill="#8884d8"/>
                <Tooltip />
            </PieChart>
        </Main>
    )
}