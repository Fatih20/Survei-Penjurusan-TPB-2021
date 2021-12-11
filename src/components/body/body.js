import React, {useState} from "react";
import styled from "styled-components";

import Selection from "./selection";
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
            <Selection setFacultyShown={setFacultyShown} facultyShown={facultyShown}/>
            <Content facultyShown={facultyShown} />
        </Main>
    )
}