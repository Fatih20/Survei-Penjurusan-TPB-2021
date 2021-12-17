import React, {useEffect, useRef} from "react";
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
    const sortMethodOfJurusan = useRef(
        {
            "Overview Peminat Pertama" : "menurun",
            "Overview Peminat Terakhir" : "menurun",
        }
    );

    useEffect(() => {
        Object.keys(facultiesData).forEach((jurusan) => {
            sortMethodOfJurusan.current[jurusan] = "rangking menurun"
        })
    }, [])

    function saveSortMethod (jurusan, sortMethod){
        sortMethodOfJurusan.current[jurusan] = sortMethod;
    }



    if (facultyShown !== "None" && jurusanShown !== "None"){
        if (jurusanShown === "Overview"){
            const dataIndeksPeminatPertama = dataIndeksPeminatProcessed(facultiesData[facultyShown]["dataIndeksPeminat"], 1);
            const dataPeminatPertama = dataPeminatProcessed(facultiesData[facultyShown]["dataPeminat"], 1);
            const dataIndeksPeminatTerakhir = dataIndeksPeminatProcessed(facultiesData[facultyShown]["dataIndeksPeminat"], facultiesData[facultyShown]["dataJurusan"].length);
            const dataPeminatTerakhir = dataPeminatProcessed(facultiesData[facultyShown]["dataPeminat"], facultiesData[facultyShown]["dataJurusan"].length);
            return (
                <Main>
                    <DataVisualization key={`${jurusanShown} jumlahPeminat Pertama`} title="Jumlah Peminat Pilihan Pertama Tiap Fakultas" type="jumlahPeminat" data={dataPeminatPertama} />
                    <DataVisualization key={`${jurusanShown} indeksPeminat Pertama`} title="Rerata Nilai Akhir Peminat Pertama Tiap Jurusan" type="indeksPeminat" data={dataIndeksPeminatPertama} saveSortMethod={(sortMethod) => saveSortMethod("Overview Peminat Pertama", sortMethod)} initialSortMethod={sortMethodOfJurusan.current["Overview Peminat Pertama"]}/>
                    <DataVisualization key={`${jurusanShown} jumlahPeminat Terakhir`} title="Jumlah Peminat Pilihan Terakhir Tiap Fakultas" type="jumlahPeminat" data={dataPeminatTerakhir} />
                    <DataVisualization key={`${jurusanShown} indeksPeminat Terakhir`} title="Rerata Nilai Akhir Peminat Terakhir Tiap Jurusan" type="indeksPeminat" data={dataIndeksPeminatTerakhir} saveSortMethod={(sortMethod) => saveSortMethod("Overview Peminat Terakhir", sortMethod)} initialSortMethod={sortMethodOfJurusan.current["Overview Peminat Terakhir"]}/>
                </Main>
            )
        } else {
            const dataIndeksPeminatJurusan = dataIndeksPeminatJurusanProcessed(facultiesData[facultyShown]["dataIndeksPeminat"], jurusanShown);
            const dataPeminatJurusan = dataPeminatJurusanProcessed(facultiesData[facultyShown]["dataPeminat"], jurusanShown);
            return (
                <Main>
                    <DataVisualization key={`${jurusanShown} jumlahPeminatJurusan`} title={`Jumlah Peminat ${jurusanShown} Berdasar Peringkat`} type="jumlahPeminatJurusan" data={dataPeminatJurusan} />
                    <DataVisualization key={`${jurusanShown} indeksPeminatJurusan`} title={`Nilai Akhir Peminat ${jurusanShown} Berdasar Peringkat`} type="indeksPeminatJurusan" data={dataIndeksPeminatJurusan} saveSortMethod={(sortMethod) => saveSortMethod(jurusanShown, sortMethod)} initialSortMethod={sortMethodOfJurusan.current[jurusanShown]}/>
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