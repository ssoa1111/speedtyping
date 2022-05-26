import React from 'react';
import styled from 'styled-components';

const Header = () => {
    return (
        <HeaderWrapper>
            <h1>TYPING GAME</h1>
        </HeaderWrapper>
    );
};

const HeaderWrapper = styled.header`
    width: 100%;
    height: 100px;
    background-color: #d4a373;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
`

export default Header;