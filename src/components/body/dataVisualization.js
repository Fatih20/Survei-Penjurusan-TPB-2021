import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { PieChart, Pie, Tooltip, BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar, Text, Cell, Label, LabelList, Sector } from "recharts";

// Import Data
import { useFacultiesData } from "../../context/FacultyDataContext";

const Main = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
`;

const ChartTitle = styled.h2`
    text-align: center;
`;

function jurusanTick ({x, y, stroke, payload}){
    return (
        <Text x={0} y={0} textAnchor="middle" scaleToFit={true}>
            {payload}
        </Text>
    )
}

export default function DataVisualization ({type, data, title}){
    const [activeIndex, setActiveIndex] = useState(null)

    const dataMaximum = Math.max.apply(null, data.map((entry) => entry.besar))
    const dataMinimum = Math.min.apply(null, data.map((entry) => entry.besar))
    const upperNilai = dataMaximum+(0.5 - (dataMaximum % 0.5))
    const lowerNilai = (dataMinimum-(dataMinimum % 0.5))-0.25

    function jumlahTickNilai () { 
        return (1+(upperNilai-lowerNilai)/0.25)
    }

    const colors = ["#c6262e", "#f37329", "#f9c440", "#68b723", "#28bca3", "#3689e6", "#a56de2", "#de3e80", "#715344"]

    function onPieEnter ({payload}){
        const index = data.map((entry) => entry["nama"]).indexOf(payload["nama"]);
        setActiveIndex(index);
    }

    function renderActiveShape (props){
        console.log(props);
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
                    {value}
                </text>
            </g>
        )
    }

    function customizedPieNameLabel (props){
        // console.log(props);
        const {cx, cy, index, name, fill, value, viewBox: {endAngle, startAngle, innerRadius, outerRadius}} = props;
        const midAngle = (startAngle+endAngle)/2
        
        let curveStartX;
        let curveStartY;
        let curveEndX;
        let curveEndY;

        if (midAngle > 180){
            [curveStartX, curveStartY, curveEndX, curveEndY] = [cx + outerRadius*Math.cos(-Math.PI*startAngle/180), cy + outerRadius*Math.sin(-Math.PI*startAngle/180), cx + outerRadius*Math.cos(-Math.PI*endAngle/180), cy + outerRadius*Math.sin(-Math.PI*endAngle/180)]
        } else {
            [curveStartX, curveStartY, curveEndX, curveEndY] = [cx + outerRadius*Math.cos(-Math.PI*endAngle/180), cy + outerRadius*Math.sin(-Math.PI*endAngle/180), cx + outerRadius*Math.cos(-Math.PI*startAngle/180), cy + outerRadius*Math.sin(-Math.PI*startAngle/180)]
        }

        return (
            <g>
                <defs>
                    <path id={`curve ${index}`} d={`M${curveStartX} ${curveStartY}
                            A ${outerRadius} ${outerRadius} 0, 0, ${midAngle > 180 ? "0":"1"}, ${curveEndX}, ${curveEndY}`} />
                </defs>
                <text fill={fill} textAnchor="middle" dominantBaseline="central" dy={`${midAngle > 180 ? "+" : '-'}15px`}>
                    <textPath xlinkHref={`#curve ${index}`} startOffset={"50%"}>
                        {name}
                    </textPath>
                </text>

            </g>
        )
        
    }
    
    
    if (type === "pie"){
        return (
            <Main>
                <ChartTitle>{title}</ChartTitle>
                <PieChart width={750} height={750}>
                    <Pie 
                        data={data} 
                        dataKey="besar" 
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
                            console.log(colors[index]);
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
                    {data.map((entry, index) => {
                        return (
                            <Cell key={index} fill={colors[index]}/>
                        )
                    })}
                    </Pie>
                    <Tooltip />
                </PieChart>   
            </Main>
        )
    } else if (type === "bar") {
        return (
            <Main>
                <ChartTitle>{title}</ChartTitle>
                <BarChart 
                    data={data} 
                    width={720} 
                    height={500} 
                    layout="vertical"
                    margin={{
                        left: 0,
                        bottom : 20,
                    }}
                    barCategoryGap="20%"
                    >
                    <Label value="Nilai Akhir" position={"top"} fill="white"/>
                    <CartesianGrid vertical={true} strokeDasharray={"5"} stroke="white" strokeOpacity={0.25}/>
                    <XAxis label={false} tick={true} type="number" stroke="white" tickCount={jumlahTickNilai()} domain={[lowerNilai, upperNilai]}>
                        <Label value="Nilai Akhir" position={"bottom"} fill="white"/>
                    </XAxis>
                    <YAxis strokeOpacity={1} type="category" dataKey="nama" tick={false} stroke="white">
                    </YAxis>
                    <Bar dataKey="besar" fill="#fafafa">
                        <LabelList dataKey="nama" position="insideLeft" fill="white"/>
                        <LabelList dataKey="besar" position="right" fill="white"/>
                        {data.map((entry, index) => {
                            return(
                                <Cell fill={colors[index]} />
                            )
                        })}
                    </Bar>
                    

                </BarChart>
            </Main>
        )
    }

}