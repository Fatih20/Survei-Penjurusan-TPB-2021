import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { PieChart, Pie, Tooltip, BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar, Text, Cell, Label, LabelList, Sector } from "recharts";

// Import Data
import { useFacultiesData } from "../../context/FacultyDataContext";

// Import Component
import NilaiBarChart from "./charts/nilaiBarChart";
import PeminatPieChart from "./charts/peminatPieChart";
import { percentMaker } from "../../dataProcessor/dataProcessor";
import { VanillaButton } from "../../GlobalComponent";

const Main = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
`;

const ChartTitle = styled.h2`
    text-align: center;
`;

const PercentChoiceContainer = styled.div`
    align-items: center;
    display: flex;
    gap: 10px;
`;

const Choice = styled(VanillaButton)`
    border-radius: 3px;
    background-color: #fafafa00;
    color: ${({chosen}) => chosen ? 'white' : '#666666'};
    font-size: 16px;
    padding: 5px;
`;

export default function DataVisualization ({type, data, title}){
    const [isPercent, setIsPercent] = useState(true)

    const colors = ["#EF4444", "#F97316", "#F59E0B", "#EAB308", "#84CC16", "#22C55E", "#10B981", "#14B8A6", "#06B6D4", ""];

    function colorPicker (index, arrayOfColor){
        return arrayOfColor[index % arrayOfColor.length]
    }

    function handlePercentChoiceClick(choosePercent) {
        if (isPercent !== choosePercent){
            setIsPercent((prevIsPercent) => !prevIsPercent)
        }
    }

    function typeOfChart () {
        if (type === "bar") {
            return (<NilaiBarChart data={data} colorPicker={colorPicker} arrayOfColors={colors}/>)
        } else {
            return (
            <>
                <PeminatPieChart data={percentMaker(data)} colorPicker={colorPicker} arrayOfColors={colors} isPercent={isPercent}/>
                <PercentChoiceContainer>
                    <Choice chosen={isPercent} onClick={() => handlePercentChoiceClick(true)}>Persen</Choice>
                    <Choice chosen={!isPercent} onClick={() => handlePercentChoiceClick(false)}>Absolut</Choice>
                </PercentChoiceContainer>
            </>

            )
        }
    }

    return (
        <Main>
            <ChartTitle>{title}</ChartTitle>
            {typeOfChart()}
        </Main>

    )

}