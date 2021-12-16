import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { PieChart, Pie, Tooltip, Legend, Bar, Text, Cell, Label, LabelList, Sector, ResponsiveContainer } from "recharts";

// Import DataProcessor
import { percentMaker, totalCounter } from "../../../dataProcessor/dataProcessor";

// Import Context
import { useJurusanShownContext, useSetJurusanShownContext } from "../body";

const Main = styled.div`
    position: relative;
`;

export default function PeminatPieChart ({data, arrayOfColors, colorPicker, isPercent, innerRadius, hoveredColor, changeColorOnHover}){
    const[activeIndex, setActiveIndex] = useState(null);
    const total = useRef(totalCounter(data));
    const jurusanShown = useJurusanShownContext();
    const setJurusanShown = useSetJurusanShownContext();

    const dataMaximum = Math.max.apply(null, data.map((entry) => entry.besar))
    const dataMinimum = Math.min.apply(null, data.map((entry) => entry.besar))

    const colors = ["#c6262e", "#f37329", "#f9c440", "#68b723", "#28bca3", "#3689e6", "#a56de2", "#de3e80", "#715344"]

    function customizedPieLabel (props){
        // console.log(props);
        const {cx, cy, index, name, fill, value, viewBox: {endAngle, startAngle, outerRadius}} = props;
        const midAngle = (endAngle + startAngle)/2;
        const midRadius = (outerRadius+innerRadius)/2
        const x = cx + midRadius*Math.cos(-Math.PI*midAngle/180)
        const y = cy + midRadius*Math.sin(-Math.PI*midAngle/180)

        return (
            <g>
                <text x={x} y={y} fill={fill} textAnchor="middle" dominantBaseline="central">
                    {isPercent ? `${value}%` : value}
                </text>
            </g>
        )
    }

    function customizedPieNameLabel (props){
        // console.log(props);
        const {cx, cy, index, name, fill, value, viewBox: {endAngle, startAngle, innerRadius, outerRadius}} = props;
        const midAngle = (startAngle+endAngle)/2
        const halfASegment = 360/(2*data.length)
        const newStartAngle = midAngle-halfASegment
        const newEndAngle = midAngle+halfASegment
        
        let curveStartX;
        let curveStartY;
        let curveEndX;
        let curveEndY;

        if (midAngle > 180){
            [curveStartX, curveStartY, curveEndX, curveEndY] = [cx + outerRadius*Math.cos(-Math.PI*newStartAngle/180), cy + outerRadius*Math.sin(-Math.PI*newStartAngle/180), cx + outerRadius*Math.cos(-Math.PI*newEndAngle/180), cy + outerRadius*Math.sin(-Math.PI*newEndAngle/180)]
        } else {
            [curveStartX, curveStartY, curveEndX, curveEndY] = [cx + outerRadius*Math.cos(-Math.PI*newEndAngle/180), cy + outerRadius*Math.sin(-Math.PI*newEndAngle/180), cx + outerRadius*Math.cos(-Math.PI*newStartAngle/180), cy + outerRadius*Math.sin(-Math.PI*newStartAngle/180)]
        }

        return (
            <g>
                <defs>
                    <path id={`curve ${index}`} d={`M${curveStartX} ${curveStartY}
                            A ${outerRadius} ${outerRadius} 0, 0, ${midAngle > 180 ? "0":"1"}, ${curveEndX}, ${curveEndY}`} />
                </defs>
                <text fill={fill} textAnchor="middle" dominantBaseline="central" dy={`${midAngle > 180 ? "+" : '-'}15px`}>
                    <textPath xlinkHref={`#curve ${index}`} startOffset={"50%"}>
                        {value}
                    </textPath>
                </text>

            </g>
        )
        
    }

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
        <PieChart width={700} height={700}>
        <Pie 
            data={data} 
            dataKey='persen'
            nameKey="nama" 
            cx="50%" 
            cy="50%" 
            outerRadius={300} 
            innerRadius={isPercent ? 0 : innerRadius} 
            label={false} 
            isAnimationActive={false} 
            stroke="#1a1a1a"
            strokeWidth={2}
            onClick={handleClick}
            onMouseEnter={setHoveredIndex} 
            onMouseLeave={() => setActiveIndex(null)}
            >
                <LabelList dataKey={isPercent ? 'persen': 'besar'} position="inside" fill="white" content={customizedPieLabel}/>
                <LabelList dataKey="nama" position="inside" content={customizedPieNameLabel}/>
                {data.map((entry, index) => {
                    let color = colorPicker(index, arrayOfColors)
                    if (changeColorOnHover){
                        color = (index === activeIndex) ? hoveredColor(color) : color;
                    }
                    return(
                        <Cell key={`${color} ${index}`} fill={color} />
                    )
                })}
            </Pie>
        </PieChart>
         
    )
}