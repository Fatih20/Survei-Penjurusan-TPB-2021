import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { PieChart, Pie, Tooltip, BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar, Text, Cell, Label, LabelList, Sector } from "recharts";

// Import Data
import { useFacultiesData } from "../../context/FacultyDataContext";

// Import Component
import BarChartSpecialized from "./charts/barChartSpecialized";
import PieChartSpecialized from "./charts/pieChartSpecialized";

const Main = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
`;

const ChartTitle = styled.h2`
    text-align: center;
`;

export default function DataVisualization ({type, data, title}){

    function typeOfChart () {
        if (type === "bar") {
            return (<BarChartSpecialized data={data} />)
        } else {
            return (<PieChartSpecialized data={data} />)
        }
    }
    
    return (
        <Main>
            <ChartTitle>{title}</ChartTitle>
            {typeOfChart()}
        </Main>

    )

}