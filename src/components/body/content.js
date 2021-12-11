import React from "react";
import styled from "styled-components";

// Import Data
import { facultyData } from "../../data/facultyData";

const Main = styled.div`
    color: white;
    margin: 20px 0 0 0;
`;

export default function Content ({facultyShown}){
    if (facultyShown != "None"){
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