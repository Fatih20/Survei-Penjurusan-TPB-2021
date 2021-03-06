import React from "react";
import styled, {css} from "styled-components";

// Import Component
import { VanillaButton } from "../../GlobalComponent";

// Import Data
import { useFacultiesData } from "../../context/FacultyDataContext";
import { useJurusanShownContext } from "./body.js";

const Main = styled.div`
    align-items: center;
    color: white;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const JurusanContainer = styled.div`
    display: flex;
    gap: 10px;
`;

const ButtonActive = css`
    background-color: #7a0000;
    color: white;
`;

const ButtonNotActive = css`
    &:hover {
        background-color: white;
    }
`;

const OptionButton = styled(VanillaButton)`
    ${({isActive}) => isActive ? ButtonActive : ButtonNotActive}
    border-radius: 3px;
    box-shadow: 0 3px 7px rgba(212, 212, 212, 0.4);
    font-size: 20px;
    padding: 7px;
`;

const JurusanButton = styled(OptionButton)`
`;

export default function JurusanSelection ({facultyShown, onJurusanClick}){
    const facultiesData = useFacultiesData();
    const jurusanShown = useJurusanShownContext();

    function jurusanButtonCreator(namaJurusan){
        return <JurusanButton key={namaJurusan} onClick={() => onJurusanClick(namaJurusan)} isActive={jurusanShown === namaJurusan ? true : false}>{namaJurusan}</JurusanButton>
    }

    if (facultyShown !== "None"){
        return (
            <Main>
                <OptionButton onClick={() => onJurusanClick("Overview")} isActive={jurusanShown === "Overview" ? true : false}>Overview</OptionButton>
                <JurusanContainer>
                    {facultiesData[facultyShown]["dataJurusan"].map(jurusanButtonCreator)}
                </JurusanContainer>
            </Main>
        )
    } else {
        return (
            <Main />
        )
    }
}