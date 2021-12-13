import React, {useState, useEffect} from "react";
import styled from "styled-components";

// Import Component
import FacultySelection from "./facultySelection";
import JurusanSelection from "./jurusanSelection";
import Content from "./content";

const Main = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 30px 10px 0 10px;
    max-width: 1080px;
`;

export default function Body (){
    const [facultyShown, setFacultyShown] = useState("None");
    const[jurusanShown, setJurusanShown] = useState("None");

    function facultyClick (faculty){
        if (facultyShown === faculty){
            setFacultyShown("None");
        } else {
            setFacultyShown(faculty);
            setJurusanShown("None");
        }
    }

    function jurusanClick (buttonClicked) {
        if(buttonClicked === jurusanShown) {
            setJurusanShown("None");
        } else {
            setJurusanShown(buttonClicked);
        }
    }

    return(
        <Main>
            <FacultySelection facultyShown={facultyShown} onFacultyClick={facultyClick}/>
            <JurusanSelection facultyShown={facultyShown} onJurusanClick={jurusanClick} jurusanShown={jurusanShown} />
            <Content facultyShown={facultyShown} jurusanShown={jurusanShown}/>
        </Main>
    )
}