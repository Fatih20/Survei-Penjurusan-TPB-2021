import React from "react";
import styled from "styled-components";
import { PieChart, Pie } from "recharts";

// Import Data
import { facultyData } from "../../data/facultyData";

const Main = styled.div`
    color: white;
    margin: 20px 0 0 0;
`;

export default function Content ({facultyShown}){
    async function retrieveData (){
        const dataOfFacultyShown = await import(`../../data/${facultyData[facultyShown].data.peminatPertama}`);
        return dataOfFacultyShown
    }

    const dataMPSTEI = {"Informatika":13,"Sistem Teknologi Informasi":9,"Teknik Elektro":15,"Teknik Tenaga Listrik":17,"Teknik Telekomunikasi":24,"Teknik Biomedis":22}

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

    if (facultyShown === "STEI"){
        console.log(dataMPProcessing(dataMPSTEI));
        return (
            <PieChart width={730} height={250}>
                <Pie data={dataMPProcessing(dataMPSTEI)} dataKey="jumlah" nameKey="namaJurusan" outerRadius={50} fill="#8884d8"/>
            </PieChart>
        )
    } else if (facultyShown != "None"){
        // const dataMP = await retrieveData();
        // console.log(dataMP["1"]);

        if (facultyShown === "STEI"){
            console.log(dataMPProcessing(dataMPSTEI)) 
        }

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