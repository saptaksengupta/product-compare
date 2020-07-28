import styled from 'styled-components';
import { styleConfig } from "./config";

export const StyledInput = styled.input`
    border: none;
    background: transparent;
    width: 100%;
    height: 100%;
    font-size: 1.2em;
    &:focus {
        outline: none;
    }
`;


export const StyledIputContainer = styled.div`
    border-radius: 24px;
    border: 1px solid;
    border-color: ${styleConfig.secondaryColor};
    height: 40px;
    width: 320px;
    padding: 0 1em;
`;