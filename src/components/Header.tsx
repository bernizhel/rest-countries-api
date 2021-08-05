import React, {FC} from 'react';
import ThemeSwitcher from '../features/theme/ThemeSwitcher'
import Flex from './Flex'
import styled from "styled-components";
import {fontOptions as fo, mediaSizes as ms} from "../styles/vars";

const StyledHeader = styled(props => <Flex as='header' {...props}>{props.children}</Flex>)`
  background-color: ${props => props.theme.elementBackground};
  max-width: 1440px;
  min-height: 75px;
  padding: 0 50px;
  border-bottom: 3px solid ${props => props.theme.border};
  @media ${ms.MOBILE} {
    padding: 0 15px;
  }
`;

const StyledHeading = styled.h1`
  font-size: 1.5rem;
  font-weight: ${fo.BOLD_WEIGHT};
  @media ${ms.MOBILE} {
    font-size: 1.125rem;
  }
`

const Header: FC = () => {
    return (
        <Flex w={'100vw'}>
            <StyledHeader align='center' justify='space-between'>
                <StyledHeading>Where in the world?</StyledHeading>
                <ThemeSwitcher/>
            </StyledHeader>
        </Flex>
    );
};

export default Header;