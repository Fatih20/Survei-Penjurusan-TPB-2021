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

    /* border: solid 1px white;  */
`;

const ChartTitle = styled.h2`
    text-align: center;
`;

const ChartChoiceContainer = styled.div`
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
    const [sortMethod, setSortMethod] = useState("alfabetikal")

    const colors = ["#EF4444", "#F97316", "#F59E0B", "#EAB308", "#84CC16", "#22C55E", "#10B981", "#14B8A6", "#06B6D4", ""];

    function colorPicker (index, arrayOfColor){
        return arrayOfColor[index % arrayOfColor.length]
    }

    function sortedData (){
        if (sortMethod === "menaik"){
            return data.sort((a, b) => a["besar"] - b["besar"])
        } else if (sortMethod === "menurun"){
            return data.sort((a, b) => b["besar"] - a["besar"])
        } else if (sortMethod === "alfabetikal"){
            return data.sort((a, b) => {
                const nameA = a["nama"].toUpperCase();
                const nameB = b["nama"].toUpperCase();
                if (nameA > nameB){
                    return 1;
                } else if (nameA < nameB){
                    return -1;
                } else {
                    return 0;
                }
            })
        } else if (sortMethod === "ranking menaik"){
            return data.sort((a, b) => {
                return parseInt(a["nama"])-parseInt(b["nama"])
            })
        } else if (sortMethod === "ranking menurun"){
            return data.sort((a, b) => {
                return parseInt(b["nama"])-parseInt(a["nama"])
            })
        }
    }

    function handlePercentChoiceClick(choosePercent) {
        if (isPercent !== choosePercent){
            setIsPercent((prevIsPercent) => !prevIsPercent)
        }
    }

    function typeOfChart () {
        if (type === "indeksPeminat") {
            return (
                <Main>
                    <NilaiBarChart data={sortedData()} colorPicker={colorPicker} arrayOfColors={colors}/>
                    <ChartChoiceContainer>
                        <Choice chosen={sortMethod === "menaik" ? true : false} onClick={()=> setSortMethod("menaik")}>Menaik</Choice>
                        <Choice chosen={sortMethod === "menurun" ? true : false} onClick={()=> setSortMethod("menurun")}>Menurun</Choice>
                        <Choice chosen={sortMethod === "alfabetikal" ? true : false} onClick={()=> setSortMethod("alfabetikal")}>Alfabetikal</Choice>
                    </ChartChoiceContainer>
                </Main>
                
            )
        } else if (type === "jumlahPeminat") {
            return (
            <Main>
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
                <ChartChoiceContainer>
                    <Choice chosen={isPercent} onClick={() => handlePercentChoiceClick(true)}>Persen</Choice>
                    <Choice chosen={!isPercent} onClick={() => handlePercentChoiceClick(false)}>Absolut</Choice>
                </ChartChoiceContainer>
            </Main>

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