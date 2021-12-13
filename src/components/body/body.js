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
    const[jurusanClicked, setJurusanClicked] = useState("None");

    function facultyClick (faculty){
        if (facultyShown === faculty){
            setFacultyShown("None");
        } else {
            setFacultyShown(faculty);
            setJurusanClicked("None");
        }
    }

    function jurusanClick (buttonClicked) {
        if(buttonClicked === jurusanClicked) {
            setJurusanClicked("None");
        } else {
            setJurusanClicked(buttonClicked);
        }
    }

    return(
        <Main>
            <FacultySelection facultyShown={facultyShown} onFacultyClick={facultyClick}/>
            <JurusanSelection facultyShown={facultyShown} onJurusanClick={jurusanClick} jurusanClicked={jurusanClicked} />
        </Main>
    )
}