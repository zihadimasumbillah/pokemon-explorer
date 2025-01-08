import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import pokeball from "../assets/pokeball.svg";
import { memo } from "react";

const rotate = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const RotatingPokeball = styled.img`
    width: 100px;
    height: 100px;
    animation: ${rotate} 2s linear infinite;
`;

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: black;
`;

function Loading() {
    return (
        <LoadingContainer>
            <RotatingPokeball src={pokeball} alt="Loading..." />
        </LoadingContainer>
    );
}

export default memo(Loading);
