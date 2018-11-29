import styled from 'styled-components'

export const StyledMessageBox = styled.div`
    outline: none;
    position: fixed;
    box-sizing: border-box;
    left: 0;
    bottom: 0;
    padding:8px 24px;
    background-color: rgb(50, 50, 50);
    color: rgb(241, 241, 241);
    min-height: 48px;
    min-width: 288px;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
    border-radius: 2px;
    margin: 12px;
    font-size: 14px;
    font-family: "Museo","Helvetica Neue","Helvetica","Arial",sans-serif;
    font-weight: 500;
    line-height: 48px;
    cursor: default;
    -webkit-transform: translateY(100px);
    transform: translateY(100px);
    -webkit-transition: -webkit-transform 0.3s, opacity 0.3s;
    transition: transform 0.3s, opacity 0.3s;
    opacity: 0;
    -webkit-font-smoothing: antialiased;
    
    &.visible {
        -webkit-transform: translateY(0);
        transform: translateY(0);
        opacity: 1;
    }
`;