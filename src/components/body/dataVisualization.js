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

    const colors = ["#c6262e", "#f37329", "#f9c440", "#68b723", "#28bca3", "#3689e6", "#a56de2", "#de3e80", "#715344"];

    function colorPicker (index, arrayOfColor){
        return arrayOfColor[index % arrayOfColor.length]
    }

    function typeOfChart () {
        if (type === "bar") {
            return (<BarChartSpecialized data={data} colorPicker={colorPicker} arrayOfColors={colors}/>)
        } else {
            return (<PieChartSpecialized data={data} colorPicker={colorPicker} arrayOfColors={colors} />)
        }
    }

    return (
        <Main>
            <ChartTitle>{title}</ChartTitle>
            {typeOfChart()}
        </Main>

    )

}