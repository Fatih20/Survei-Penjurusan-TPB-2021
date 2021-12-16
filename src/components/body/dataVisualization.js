import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { PieChart, Pie, Tooltip, BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar, Text, Cell, Label, LabelList, Sector } from "recharts";

// Import Data
import { useFacultiesData } from "../../context/FacultyDataContext";

// Import Component
import NilaiBarChart from "./charts/nilaiBarChart";
import PeminatPieChart from "./charts/peminatPieChart";
import { percentMaker, totalCounter } from "../../dataProcessor/dataProcessor";
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
`;

const Choice = styled(VanillaButton)`
    border-radius: 3px;
    background-color: #fafafa00;
    color: ${({chosen}) => chosen ? 'white' : '#666666'};
    font-size: 16px;
    padding: 5px;

    &:hover {
        ${({chosen}) => chosen ? null : 'color : rgba(255, 255, 255, 0.5) '}
    }
`;

const PieTotalOuterContainer = styled.div`
    align-items: center;
    bottom: 0;
    display: flex;
    justify-content: center;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
`;

const PieTotalContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    width : 250px;

    & > *:nth-child(2){
        font-size: 24px;
    }
`;

const PieContainer = styled.div`
    position: relative;
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
                <PieContainer>
                    <PeminatPieChart data={percentMaker(data)} colorPicker={colorPicker} arrayOfColors={colors} isPercent={isPercent} innerRadius={125}/>
                    {isPercent ? null : 
                        <PieTotalOuterContainer>
                            <PieTotalContainer>
                                <p>dari</p>
                                <p>{totalCounter(data)}</p>
                                <p>partisipan</p>
                            </PieTotalContainer>
                        </PieTotalOuterContainer>
                    }
                </PieContainer>
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