import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { PieChart, Pie, Tooltip } from "recharts";
import * as dataProcessor from "../../dataProcessor/dataProcessor.js"

// Import Data
import { facultiesData } from "../../data/facultyData";

const Main = styled.div`
    color: white;
    margin: 20px 0 0 0;
`;

export default function Content ({facultyShown}){
    const[data, setData] = useState([]);

    async function retrieveData (){
        const dataOfFacultyShown = await import(`../../data/${facultiesData[facultyShown].data.peminat}`);
        return dataOfFacultyShown
    }

    useEffect(() => {
        if (facultyShown !== "None" && facultyShown === "STEI"){
            retrieveData().then(dataPeminat => {
                setData(dataProcessor.peminat(dataPeminat, "1"));
            })
        }
    }, [facultyShown])

    if (facultyShown === "STEI"){
        return (
            <PieChart width={500} height={500}>
                <Pie data={data} dataKey="jumlah" nameKey="namaJurusan" outerRadius={200} fill="#8884d8"/>
                <Tooltip />
            </PieChart>
        )
    } else if (facultyShown != "None"){
        return (
            <Main>
                <h2>{`Insert ${facultyShown} data here`}</h2>
            </Main>
        )
    } else {
        return (
            <Main />
        )
    }
}