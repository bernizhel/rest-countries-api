import React, {FC} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectTheme, toggle} from "./themeSlice";
import {mediaSizes as ms} from '../../styles/vars'
import styled from "styled-components";

const StyledIcon = styled.div`
  vertical-align: sub;
  margin-right: 5px;
  display: inline-block;
`

interface IconProps {
    theme: string;
    children?: React.ReactNode | React.ReactChild;
}

const Icon: FC<IconProps> = (props) => {
    return (
        <StyledIcon>
            <ion-icon name={props.theme === 'light' ? 'moon-outline' : 'moon'} />
        </StyledIcon>
    )
}

const StyledText = styled.div`
  cursor: pointer;
  @media ${ms.MOBILE} {
    font-size: 0.875rem;
  }
`

const ThemeSwitcher: FC = () => {
    const dispatch = useAppDispatch()
    const theme = useAppSelector(selectTheme)
    return (
        <StyledText onClick={() => dispatch(toggle())}>
            <Icon theme={theme}/> Dark Mode
        </StyledText>
    );
};

export default ThemeSwitcher;