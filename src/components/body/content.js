import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { PieChart, Pie, Tooltip, BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar } from "recharts";

// Import Data
import { useFacultiesData } from "../../context/FacultyDataContext";

import { dataPeminatProcessed, dataIndeksPeminatProcessed, dataPeminatJurusanProcessed, dataIndeksPeminatJurusanProcessed } from "../../dataProcessor/dataProcessor";

// Import Context
import { useJurusanShownContext } from "./body";

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

export default function Content({facultyShown}){
    const facultiesData = useFacultiesData();
    const jurusanShown = useJurusanShownContext();

    if (facultyShown !== "None" && jurusanShown !== "None"){
        if (jurusanShown === "Overview"){
            const dataIndeksPeminat = dataIndeksPeminatProcessed(facultiesData[facultyShown]["dataIndeksPeminat"], 1);
            const dataPeminat = dataPeminatProcessed(facultiesData[facultyShown]["dataPeminat"], 1);
            return (
                <Main>
                    <DataVisualization title="Jumlah Peminat Pilihan Pertama Tiap Fakultas" type="jumlahPeminat" data={dataPeminat} />
                    <DataVisualization title="Rerata Nilai Akhir Peminat Pertama Tiap Jurusan" type="indeksPeminat" data={dataIndeksPeminat}/>
                </Main>
            )
        } else {
            const dataIndeksPeminatJurusan = dataIndeksPeminatJurusanProcessed(facultiesData[facultyShown]["dataIndeksPeminat"], jurusanShown);
            const dataPeminatJurusan = dataPeminatJurusanProcessed(facultiesData[facultyShown]["dataPeminat"], jurusanShown);
            return (
                <Main>
                    <DataVisualization title={`Jumlah Peminat ${jurusanShown} Berdasar Peringkat`} type="jumlahPeminatJurusan" data={dataPeminatJurusan} />
                    <DataVisualization title={`Nilai Akhir Peminat ${jurusanShown} Berdasar Peringkat`} type="indeksPeminatJurusan" data={dataIndeksPeminatJurusan}/>
                </Main>
            )
        }
    } else {
        return (
            <>
            </>
        )
    }
};