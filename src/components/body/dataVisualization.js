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
    z-index: -1;
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
    const [sortMethod, setSortMethod] = useState("alfabetikal");

    useEffect(() => {
        if (type === "indeksPeminat"){
            setSortMethod("alfabetikal")
        } else if (type === "indeksPeminatJurusan"){
            console.log("Bruh")
            setSortMethod("rangking menurun")
        }
    }, [type])

    const colors = ["#EF4444", "#F97316", "#F59E0B", "#EAB308", "#84CC16", "#22C55E", "#10B981", "#14B8A6", "#06B6D4", ""];

    function colorPicker (index, arrayOfColor){
        return arrayOfColor[index % arrayOfColor.length]
    }

    function shadeColor(color, percent) {

        var R = parseInt(color.substring(1,3),16);
        var G = parseInt(color.substring(3,5),16);
        var B = parseInt(color.substring(5,7),16);
    
        R = parseInt(R * (100 + percent) / 100);
        G = parseInt(G * (100 + percent) / 100);
        B = parseInt(B * (100 + percent) / 100);
    
        R = (R<255)?R:255;  
        G = (G<255)?G:255;  
        B = (B<255)?B:255;  
    
        var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
        var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
        var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));
    
        return "#"+RR+GG+BB;
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
        } else if (sortMethod === "rangking menaik"){
            return data.sort((a, b) => {
                return parseInt(b["nama"])-parseInt(a["nama"])
            })
        } else if (sortMethod === "rangking menurun"){
            return data.sort((a, b) => {
                return parseInt(a["nama"])-parseInt(b["nama"])
                
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
                <>
                    <NilaiBarChart data={sortedData()} colorPicker={colorPicker} arrayOfColors={colors} hoveredColor={(color) => shadeColor(color, 20)} changeColorOnHover={true}/>
                    <ChartChoiceContainer>
                        <Choice chosen={sortMethod === "menaik" ? true : false} onClick={()=> setSortMethod("menaik")}>Menaik</Choice>
                        <Choice chosen={sortMethod === "menurun" ? true : false} onClick={()=> setSortMethod("menurun")}>Menurun</Choice>
                        <Choice chosen={sortMethod === "alfabetikal" ? true : false} onClick={()=> setSortMethod("alfabetikal")}>Alfabetikal</Choice>
                    </ChartChoiceContainer>
                </>
                
            )
        } else if (type === "jumlahPeminat") {
            return (
                <>
                <PieContainer>
                    <PeminatPieChart data={percentMaker(data)} colorPicker={colorPicker} arrayOfColors={colors} isPercent={isPercent} innerRadius={125} hoveredColor={(color) => shadeColor(color, 20)} changeColorOnHover={true}/>
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
                </>

            )
        } else if (type === "jumlahPeminatJurusan") {
            // setSortMethod("ranking menurun");
            return (
                <>
                <PieContainer>
                    <PeminatPieChart data={percentMaker(data)} colorPicker={colorPicker} arrayOfColors={colors} isPercent={isPercent} innerRadius={125} hoveredColor={(color) => shadeColor(color, 20)} changeColorOnHover={false}/>
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
                </>

            )
        } else if (type === "indeksPeminatJurusan") {
            // setSortMethod("ranking menurun");
            return (
                <>
                    <NilaiBarChart data={sortedData()} colorPicker={colorPicker} arrayOfColors={colors} hoveredColor={(color) => shadeColor(color, 20)} changeColorOnHover={false}/>
                    <ChartChoiceContainer>
                        <Choice chosen={sortMethod === "menaik" ? true : false} onClick={()=> setSortMethod("menaik")}>Menaik</Choice>
                        <Choice chosen={sortMethod === "menurun" ? true : false} onClick={()=> setSortMethod("menurun")}>Menurun</Choice>
                        <Choice chosen={sortMethod === "rangking menaik" ? true : false} onClick={()=> setSortMethod("rangking menaik")}>Rangking Menaik</Choice>
                        <Choice chosen={sortMethod === "rangking menurun" ? true : false} onClick={()=> setSortMethod("rangking menurun")}>Rangking Menurun</Choice>
                    </ChartChoiceContainer>
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