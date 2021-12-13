import React from "react";
import styled, {css} from "styled-components";

// Import Component
import { VanillaButton } from "../../GlobalComponent";

// Import Data
import { useFacultiesData } from "../../context/FacultyDataContext";

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

const Main = styled.div`
    border-bottom: solid 2px white;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
    padding-bottom: 10px;
`;

export default function FacultySelection ({facultyShown, onFacultyClick}){
    const facultiesData = useFacultiesData();

    function optionMaker (faculty){
        return (
            <OptionButton key={faculty} onClick={() => onFacultyClick(faculty)} isActive={facultyShown === faculty ? true : false}> 
                {faculty}
            </OptionButton>
        )
    }
    return(
        <Main>
            {Object.keys(facultiesData).map(optionMaker)}
        </Main>
    )
}