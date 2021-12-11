import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { PieChart, Pie, Tooltip } from "recharts";

// Import Data
import { facultyData } from "../../data/facultyData";

const Main = styled.div`
    color: white;
    margin: 20px 0 0 0;
`;

export default function Content ({facultyShown}){
    const[data, setData] = useState([]);

    async function retrieveData (){
        const dataOfFacultyShown = await import(`../../data/${facultyData[facultyShown].data.peminatPertama}`);
        return dataOfFacultyShown
    }

    function dataMPProcessing(rawData){
        let processedData = [];
        Object.keys(rawData).map((jurusan) => {
            processedData.push({
                namaJurusan : jurusan,
                jumlah : rawData[jurusan],
            })
        })

        return processedData;
    }

    useEffect(() => {
        if (facultyShown != "None"){
            retrieveData().then(dataPeminat => {
                setData(dataMPProcessing(dataPeminat["1"]));
            })
        }
    }, [facultyShown])

    if (facultyShown === "STEI"){
        // console.log(dataMPProcessing(dataMPSTEI));
        return (
            <PieChart width={500} height={500}>
                <Pie data={data} dataKey="jumlah" nameKey="namaJurusan" outerRadius={200} fill="#8884d8"/>
                <Tooltip />
            </PieChart>
        )
    } else if (facultyShown != "None"){
        // const dataMP = await retrieveData();
        // console.log(dataMP["1"]);

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