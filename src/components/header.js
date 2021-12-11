import React from "react";
import styled from "styled-components";

const Main = styled.div`
    align-items: center;
    background-color: black;
    display: flex;
    height: 90px;
    justify-content: center;
    width: 100%;
    vertical-align: middle;
`;

const Title = styled.h1`
    color: white;
    font-size: 36px;
`;

export default function Header (){
    return (
        <Main>
            <Title>Survei Penjurusan TPB 2021</Title>
        </Main>
    )
}
