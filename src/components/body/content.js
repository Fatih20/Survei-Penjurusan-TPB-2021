import React, { useState, useEffect } from "react";
import styled, {css} from "styled-components";
import { PieChart, Pie, Tooltip } from "recharts";
import * as dataProcessor from "../../dataProcessor/dataProcessor.js"

// Import Component
import DataVisualization from "./dataVisualization.js";
import { VanillaButton } from "../../GlobalComponent";

// Import Data
const facultiesData = require("../../data/facultyData.json")

const Main = styled.div`
    color: white;
    margin: 20px 0 0 0;
`;

const SelectionContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
`;

const JurusanContainer = styled.div`
    display: flex;
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



export default function Content ({facultyShown}){
    const[jurusanClicked, setJurusanClicked] = useState("None");

    useEffect(() => {
        console.log(facultiesData);
    });

    function jurusanClick (buttonClicked) {
        if(buttonClicked === jurusanClicked) {
            setJurusanClicked("None");
        } else {
            setJurusanClicked(buttonClicked);
        }
    }

    if (facultyShown != "None"){
        return (
            <Main>
                <SelectionContainer>
                    <OptionButton onClick={() => jurusanClick("Overview")} isActive={jurusanClicked == "Overview" ? true : false}>Overview</OptionButton>
                    <JurusanContainer>
                        {/* {facultiesData["STEI"].jurusan.map()} */}
                    </JurusanContainer>
                </SelectionContainer>
                <h2>{`Insert ${facultyShown} data here`}</h2>
            </Main>
        )
    } else {
        return (
            <Main />
        )
    }
}