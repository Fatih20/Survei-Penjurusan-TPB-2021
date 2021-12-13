import React from "react";
import styled, {css} from "styled-components";

// Import Data
import { footerData } from "../data/footerData";

const Main = styled.div`
    display: flex;
    justify-content: center;
    padding: 15px 0;
    width: 100%;

    & * {
        box-sizing: border-box;
    }
`;

const Content = styled.div`
    display: flex;
    gap: 30px;
    justify-content: center;
    max-width: 1080px;
    width: 100%;

    /* border: solid 1px white; */
`;

const BoxWrapper = styled.div`
    align-items: center;
    color: white;
    display: flex;
    flex-direction: column;
    gap: 7px;
    text-align: center;
    width: 20%;

    /* border: solid 1px white; */
`;

const TextBox = styled.div`
    background-color: #fafafa;
    border-radius: 7px;
    color: black;
    display: flex;
    flex-direction: column;
    gap: 5px;
    justify-content: center;
    padding: 10px;
    width: 100%;
    height: 100%;
`;

const Title = styled.p`
    font-size: 18px;
`;

const Text = css`
    color: black;
    font-size: 14px;
    gap: 5px;
    text-decoration: none;
`;

const LinkText = styled.a`
    ${Text}
    &:hover {
        cursor: pointer;
        text-decoration: underline solid black;
    }
`;

const PlainText = styled.p`
    ${Text}
`;

export default function Footer (){

    function TextCreator({text, textType, link}){
        if (textType === "plain"){
            return (
                <PlainText key={text}>{text}</PlainText>
            )
        } else if (textType === "link"){
            return (
                <LinkText key={text} href={link}>{text}</LinkText>
            )
        }
    }

    function TextBoxCreator ({title, boxContent}){
        return (
            <BoxWrapper key={title}>
                <Title>{title}</Title>
                <TextBox key={title}>
                    {boxContent.map(TextCreator)}
                </TextBox>
            </BoxWrapper>
        )
    }

    return (
        <Main>
            <Content>
                {footerData.map(TextBoxCreator)}
            </Content>
        </Main>
    )
}