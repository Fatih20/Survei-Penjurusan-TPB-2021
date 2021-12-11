import React, {useState, useEffect} from "react";
import styled from "styled-components";

import Header from "./components/header";
import Body from "./components/body/body";
import Footer from "./components/footer";

import { GlobalTransition } from "./GlobalComponent";

const Main = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    min-height: 100vh; 
    position: relative;
`;

function App() {
    const [firstRefreshed, setFirstRefreshed] = useState(false);

    useEffect(()=>{
        setFirstRefreshed(true);
    })
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
