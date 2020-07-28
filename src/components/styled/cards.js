//https://uigradients.com/#PinotNoir

import styled from 'styled-components'

export const DefaultCard = styled.div`
    background-color: white;
    width: ${props => props.width ? props.width : ''};
    max-width: 100%;
    box-shadow: 0px 5px 20px rgba(69, 83, 240, 0.1);
    border-radius: 8px;
    padding: 25px;
    height: ${props => props.height ? props.height : ''};
`;

