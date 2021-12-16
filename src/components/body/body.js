import React, {useState, useContext} from "react";
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

const JurusanShownContext = React.createContext();
const SetJurusanShownContext = React.createContext();

export function useJurusanShownContext (){
    return useContext(JurusanShownContext);
}

export function useSetJurusanShownContext (){
    return useContext(SetJurusanShownContext);
}

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
            <JurusanShownContext.Provider value={jurusanShown}>
                <SetJurusanShownContext.Provider value={setJurusanShown}>
                    <FacultySelection facultyShown={facultyShown} onFacultyClick={facultyClick}/>
                    <JurusanSelection facultyShown={facultyShown} onJurusanClick={jurusanClick}/>
                    <Content facultyShown={facultyShown}/>
                </SetJurusanShownContext.Provider>
            </JurusanShownContext.Provider>
        </Main>
    )
}