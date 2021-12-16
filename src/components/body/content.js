import React from "react";
import styled from "styled-components";

// Import Data
import { useFacultiesData } from "../../context/FacultyDataContext";

import { dataPeminatProcessed, dataIndeksPeminatProcessed, dataPeminatJurusanProcessed, dataIndeksPeminatJurusanProcessed } from "../../dataProcessor/dataProcessor";

// Import Context
import { useJurusanShownContext } from "./body";

import DataVisualization from "./dataVisualization";

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

export default function Content({facultyShown}){
    const facultiesData = useFacultiesData();
    const jurusanShown = useJurusanShownContext();

    if (facultyShown !== "None" && jurusanShown !== "None"){
        if (jurusanShown === "Overview"){
            const dataIndeksPeminatPertama = dataIndeksPeminatProcessed(facultiesData[facultyShown]["dataIndeksPeminat"], 1);
            const dataPeminatPertama = dataPeminatProcessed(facultiesData[facultyShown]["dataPeminat"], 1);
            const dataIndeksPeminatTerakhir = dataIndeksPeminatProcessed(facultiesData[facultyShown]["dataIndeksPeminat"], 6);
            const dataPeminatTerakhir = dataPeminatProcessed(facultiesData[facultyShown]["dataPeminat"], 6);
            return (
                <Main>
                    <DataVisualization title="Jumlah Peminat Pilihan Pertama Tiap Fakultas" type="jumlahPeminat" data={dataPeminatPertama} />
                    <DataVisualization title="Rerata Nilai Akhir Peminat Pertama Tiap Jurusan" type="indeksPeminat" data={dataIndeksPeminatPertama}/>
                    <DataVisualization title="Jumlah Peminat Pilihan Terakhir Tiap Fakultas" type="jumlahPeminat" data={dataPeminatTerakhir} />
                    <DataVisualization title="Rerata Nilai Akhir Peminat Terakhir Tiap Jurusan" type="indeksPeminat" data={dataIndeksPeminatTerakhir}/>
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