import React, {useState} from "react";
import styled from "styled-components";

// Import Component
import FacultySelection from "./facultySelection";
import Content from "./content";

const Main = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30px 10px 0 10px;
    max-width: 1080px;
`;

export default function Body (){
    const [facultyShown, setFacultyShown] = useState("None"); 

    return(
        <Main>
            <FacultySelection setFacultyShown={setFacultyShown} facultyShown={facultyShown}/>
            <Content facultyShown={facultyShown} />
        </Main>
    )
}