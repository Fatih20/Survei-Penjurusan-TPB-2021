import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { PieChart, Pie, Tooltip, BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar } from "recharts";

// Import Data
import { useFacultiesData } from "../../context/FacultyDataContext";

import { dataPeminatProcessed, dataIndeksPeminatProcessed } from "../../dataProcessor/dataProcessor";

const Main = styled.div`
    align-items: center;
    display: flex;
    color: white;
    flex-direction: column;
    padding: 20px 0 0 0;
    width: 100%;

    & > * {
    }
    
    /* border: 1px solid white; */
`;

const ChartTitle = styled.h2`
    text-align: center;
`;

const Chart = styled.div`
`;

export default function Content({facultyShown, jurusanShown}){
    const facultiesData = useFacultiesData();

    if (facultyShown !== "None"){
        const dataIndeksPeminat = dataIndeksPeminatProcessed(facultiesData[facultyShown]["dataIndeksPeminat"], 1);
        if (jurusanShown === "Overview"){
            console.log("Bruh");
            console.log(dataPeminatProcessed(facultiesData[facultyShown]["dataPeminat"], 1))
            return (
                <Main>
                    <Chart>
                        <ChartTitle>Jumlah Peminat Pertama Tiap Jurusan</ChartTitle>
                        <PieChart width={500} height={500}>
                            <Pie data={dataPeminatProcessed(facultiesData[facultyShown]["dataPeminat"], 1)} dataKey="jumlahPeminat" nameKey="namaJurusan" cx="50%" cy="50%" outerRadius={200} fill="#8884d8" label isAnimationActive={false}/>
                            <Tooltip />
                        </PieChart>
                    </Chart>
                    <Chart>
                        <ChartTitle>Rerata Nilai Akhir Peminat Pertama Tiap Jurusan</ChartTitle>
                        <BarChart width={730} height={250} data={dataIndeksPeminat}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" label={false} />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            {Object.keys(dataIndeksPeminat[0]).map((data) => {
                                if (data !== "name"){
                                    console.log(data)
                                    return (
                                        <Bar dataKey={data} fill="#8884d8"/>
                                    )
                                }
                            })}
                        </BarChart>
                    </Chart>
                </Main>
            )
        } else {
            return (
                <>
                </>
            )
        }
    } else {
        return (
            <>
            </>
        )
    }
};