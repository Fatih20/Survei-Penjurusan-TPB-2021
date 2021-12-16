import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { PieChart, Pie, Tooltip, BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar } from "recharts";

// Import Data
import { useFacultiesData } from "../../context/FacultyDataContext";

import { dataPeminatProcessed, dataIndeksPeminatProcessed } from "../../dataProcessor/dataProcessor";

import DataVisualization from "./dataVisualization";
import BarChartSpecialized from "./charts/nilaiBarChart";
import PieChartSpecialized from "./charts/peminatPieChart";

const Main = styled.div`
    align-items: center;
    display: flex;
    color: white;
    flex-direction: column;
    gap: 10px;
    padding: 20px 0 0 0;
    width: 100%;

    & > * {
    }
    
    /* border: 1px solid white; */
`;

const Chart = styled.div`
`;

export default function Content({facultyShown, jurusanShown}){
    const facultiesData = useFacultiesData();

    if (facultyShown !== "None"){
        const dataIndeksPeminat = dataIndeksPeminatProcessed(facultiesData[facultyShown]["dataIndeksPeminat"], 1);
        const dataPeminat = dataPeminatProcessed(facultiesData[facultyShown]["dataPeminat"], 1)
        if (jurusanShown === "Overview"){
            // console.log("Bruh");
            // console.log(dataPeminatProcessed(facultiesData[facultyShown]["dataPeminat"], 1))
            return (
                <Main>
                    <DataVisualization title="Jumlah Peminat Pilihan Pertama Tiap Fakultas" type="pie" data={dataPeminat} />
                    <DataVisualization title="Rerata Nilai Akhir Peminat Pertama Tiap Jurusan" type="bar" data={dataIndeksPeminat} />
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