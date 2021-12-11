import React, {useState} from "react";
import styled, {css} from "styled-components";

import { VanillaButton } from "../../GlobalComponent";

import { facultyData } from "../../data/facultyData";

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

export default function Selection ({facultyShown, setFacultyShown}){
    const [anyActive, setAnyActive] = useState(false);

    function facultyClicked (faculty){
        if (facultyShown === faculty){
            setFacultyShown("None");
            setAnyActive(false);
        } else {
            setFacultyShown(faculty);
            setAnyActive(true);
        }
    }

    function optionMaker (faculty){
        return (
            <OptionButton onClick={() => facultyClicked(faculty)} isActive={facultyShown == faculty ? true : false}> 
                {faculty}
            </OptionButton>
        )
    }
    return(
        <Main>
            {Object.keys(facultyData).map(optionMaker)}
        </Main>
    )
}