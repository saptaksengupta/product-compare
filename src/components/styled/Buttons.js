import styled from 'styled-components';
import { styleConfig } from "./config";

export const Button = styled.button`
    cursor:pointer;
    border-radius: 24px;
    &:focus{
        outline: none;
    }
`;

export const DefaultButton = styled(Button)`
    background: ${ props => props.primary ? styleConfig.primaryColor : 'transparent' };
    color: ${ props => props.primary ? 'white' : styleConfig.primaryColor };
    border: ${ props => props.primary ? 'none' : '2px solid' };
    border-color: ${ props => props.primary ? 'none' : styleConfig.primaryColor };
    cursor:pointer;
    font-weight: 500;
`;