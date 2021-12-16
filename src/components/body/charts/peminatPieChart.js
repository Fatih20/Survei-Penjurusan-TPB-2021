import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { PieChart, Pie, Tooltip, Legend, Bar, Text, Cell, Label, LabelList, Sector } from "recharts";

// Import DataProcessor
import { percentMaker, totalCounter } from "../../../dataProcessor/dataProcessor";

export default function PeminatPieChart ({data, arrayOfColors, colorPicker}){
    const [activeIndex, setActiveIndex] = useState(null)
    const total = useRef(totalCounter(data))

    const dataMaximum = Math.max.apply(null, data.map((entry) => entry.besar))
    const dataMinimum = Math.min.apply(null, data.map((entry) => entry.besar))

    const colors = ["#c6262e", "#f37329", "#f9c440", "#68b723", "#28bca3", "#3689e6", "#a56de2", "#de3e80", "#715344"]

    function onPieEnter ({payload}){
        const index = data.map((entry) => entry["nama"]).indexOf(payload["nama"]);
        setActiveIndex(index);
    }

    function customizedPieLabel (props){
        // console.log(props);
        const {cx, cy, index, name, fill, value, viewBox: {endAngle, startAngle, innerRadius, outerRadius}} = props;
        const midAngle = (endAngle + startAngle)/2
        const midRadius = (outerRadius+innerRadius)/2
        const x = cx + midRadius*Math.cos(-Math.PI*midAngle/180)
        const y = cy + midRadius*Math.sin(-Math.PI*midAngle/180)

        let color;
        if (index === activeIndex){
            color = "black";
        } else {
            color = fill;
        }

        return (
            <g>
                <text x={x} y={y} fill={color} textAnchor="middle" dominantBaseline="central">
                    {index === activeIndex ? null : `${value}%`}
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
                <text fill={index === activeIndex? "white" : fill} textAnchor="middle" dominantBaseline="central" dy={`${midAngle > 180 ? "+" : '-'}15px`}>
                    <textPath xlinkHref={`#curve ${index}`} startOffset={"50%"}>
                        {name}
                    </textPath>
                </text>

            </g>
        )
        
    }

    function pieContent (props){
        const{viewBox : {cx, cy}} = props;
        console.log(props);
        if (activeIndex !== null){
            return (
                <g transform={`translate(${cx}, ${cy})`}>
                    <text fill="white" textAnchor="middle" dominantBaseline="central">
                        {data[activeIndex]["nama"]}
                    </text>
                    <text fill="white" textAnchor="middle" dominantBaseline="central">
                      {`${data[activeIndex]["besar"]}/${total.current}`}  
                    </text>
                </g>
            )
        } else {
            return (
                <></>
            )
        }
    }



    return (
        <PieChart width={750} height={750}>
            <Pie 
                data={percentMaker(data)} 
                dataKey="persen" 
                nameKey="nama" 
                cx="50%" 
                cy="50%" 
                outerRadius={300} 
                innerRadius={150} 
                label={false} 
                isAnimationActive={false} 
                stroke="false"
                onMouseEnter={onPieEnter}
                onMouseLeave={() => {
                    setActiveIndex(null);
                    console.log("Leaving");
                }}
                activeIndex={activeIndex}
                activeShape={({cx,
                    cy,
                    midAngle,
                    innerRadius,
                    outerRadius,
                    startAngle,
                    endAngle,
                    fill,
                    payload,
                    percent,
                    value}) => {
                    const index = data.map((entry) => entry["nama"]).indexOf(payload["nama"]);
                    // console.log(index);
                    return (
                        <g>
                            {/* <Cell key={index} fill={colors[index]}/> */}
                            <Sector
                                cx={cx}
                                cy={cy}
                                innerRadius={innerRadius}
                                outerRadius={outerRadius}
                                startAngle={startAngle}
                                endAngle={endAngle}
                                fill="white"
                            />
                        </g>
                    )
                }}
                >
                <LabelList dataKey="besar" position="inside" fill="white" content={customizedPieLabel}/>
                <LabelList dataKey="besar" position="inside" content={customizedPieNameLabel}/>
                {/* <LabelList dataKey="jumlahPeminat" position="inside" fill="black"/> */}
                <Label position="inside" content={pieContent}/>
            {data.map((entry, index) => {
                return (
                    <Cell key={index} fill={colorPicker(index, arrayOfColors)}/>
                )
            })}
            </Pie>
        </PieChart> 
    )
}