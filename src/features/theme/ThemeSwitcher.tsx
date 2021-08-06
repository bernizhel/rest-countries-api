import React, {FC} from 'react';
import {useAppDispatch} from "../../app/hooks";
import {toggle} from "./themeSlice";
import {mediaSizes as ms} from '../../styles/vars'
import styled from "styled-components";
import Icon, {StyledIcon} from "../../components/Icon";

const StyledSwitcher = styled.div`
  cursor: pointer;
  @media ${ms.MOBILE} {
    font-size: 0.875rem;
  }
`;

const StyledMoon = styled(StyledIcon)`
  display: inline-block;
  vertical-align: -2px;
`;


const ThemeSwitcher: FC = () => {
    const dispatch = useAppDispatch()
    return (
        <StyledSwitcher onClick={() => dispatch(toggle())}>
            <StyledMoon><Icon name={'moon'} /></StyledMoon> Dark Mode
        </StyledSwitcher>
    );
};

export default ThemeSwitcher;