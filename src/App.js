import React from "react";
import styled from "styled-components";

// Import Component
import Header from "./components/header";
import Body from "./components/body/body";
import Footer from "./components/footer";

// Import Global Styles
import { GlobalTransition } from "./GlobalComponent";
import FacultiesDataProvider from "./context/FacultyDataContext";

const Main = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column; 
    min-height: 100vh;
`;

const Buffer = styled.div`
    flex-grow: 1;
`;

function App() {
    return (
    <>
        <GlobalTransition/>
        <Main>
            <FacultiesDataProvider>
                <Header />
                <Body />
                <Buffer />
                <Footer />   
            </FacultiesDataProvider>
        </Main>
    </>
    )
    }

export default App;
