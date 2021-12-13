import React, {useState, useEffect} from "react";
import styled from "styled-components";

// Import Component
import FacultySelection from "./facultySelection";
import JurusanSelection from "./jurusanSelection";

const Main = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
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
        </Main>
    )
}