import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {Tooltip, BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar, Text, Cell, Label, LabelList } from "recharts";


// Import Context
import { useJurusanShownContext, useSetJurusanShownContext } from "../body";

export default function NilaiBarChart ({data, arrayOfColors, colorPicker, hoveredColor, changeColorOnHover}){
    const[activeIndex, setActiveIndex] = useState(null);

    const jurusanShown = useJurusanShownContext();
    const setJurusanShown = useSetJurusanShownContext();

    const dataMaximum = Math.max.apply(null, data.map((entry) => entry.besar))
    const dataMinimum = Math.min.apply(null, data.map((entry) => entry.besar))
    const upperNilai = dataMaximum+(0.5 - (dataMaximum % 0.5))
    const lowerNilai = (dataMinimum-(dataMinimum % 0.5))-0.25

    function jumlahTickNilai () { 
        return (1+(upperNilai-lowerNilai)/0.25)
    }

    const colors = ["#c6262e", "#f37329", "#f9c440", "#68b723", "#28bca3", "#3689e6", "#a56de2", "#de3e80", "#715344"];

    function handleClick({nama}){
        if (jurusanShown === "Overview"){
            setJurusanShown(nama);
        } 
    }

    function setHoveredIndex ({nama}){
        data.forEach((entry, index) => {
            if (entry["nama"] === nama){
                setActiveIndex(index);
            }
        })
    }

    return (
        <BarChart 
            data={data} 
            width={720} 
            height={500} 
            layout="vertical"
            margin={{bottom : 20, left: 0}}
            barCategoryGap="20%"
            >
            <Label value="Nilai Akhir" position={"top"} fill="white"/>
            <CartesianGrid vertical={true} strokeDasharray={"5"} stroke="white" strokeOpacity={0.25}/>
            <XAxis label={false} tick={true} type="number" stroke="white" tickCount={jumlahTickNilai()} domain={[lowerNilai, upperNilai]}>
                <Label value="Nilai Akhir" position={"bottom"} fill="white"/>
            </XAxis>
            <YAxis strokeOpacity={1} type="category" dataKey="nama" tick={false} stroke="white" label={false}/>
            <Bar dataKey="besar" fill="#fafafa" onClick={handleClick} onMouseEnter={setHoveredIndex} onMouseLeave={() => setActiveIndex(null)}>
                <LabelList dataKey="nama" position="insideLeft" fill="white"/>
                <LabelList dataKey="besar" position="right" fill="white"/>
                {data.map((entry, index) => {
                    let color = colorPicker(index, arrayOfColors)
                    if (changeColorOnHover){
                        color = (index === activeIndex) ? hoveredColor(color) : color;
                    }
                    return(
                        <Cell key={`${color} ${index}`} fill={color} />
                    )
                })}
            </Bar>
        </BarChart>
    )
}

