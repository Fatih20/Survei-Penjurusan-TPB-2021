import React, {useState, useEffect} from "react";
import styled from "styled-components";

// Import Component
import Header from "./components/header";
import Body from "./components/body/body";
import Footer from "./components/footer";

// Import Global Styles
import { GlobalTransition } from "./GlobalComponent";

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
            <Header />
            <Body />
            <Footer /> 
        </Main>
    </>
    )
    }

export default App;
