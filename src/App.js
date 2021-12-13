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
    position: relative;
`;

function App() {
    return (
    <>
        <GlobalTransition/>
        <Main>
            <FacultiesDataProvider>
                <Header />
                <Body />
                <Footer />   
            </FacultiesDataProvider>
        </Main>
    </>
    )
    }

export default App;
