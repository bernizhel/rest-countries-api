import React, {FC} from 'react';
import ThemeSwitcher from '../features/theme/ThemeSwitcher'
import Flex from './Flex'
import styled from "styled-components";
import {mediaSizes as ms} from "../styles/vars";
import {Link} from 'react-router-dom';

const StyledHeader = styled(Flex)`
  background-color: ${props => props.theme.elementBackground};
  padding: 0 50px;
  border-bottom: 3px solid ${props => props.theme.border};
  @media ${ms.MOBILE} {
    padding: 0 15px;
  }
`;

const StyledHeading = styled.h1`
  font-size: 1.375rem;
  cursor: pointer;
  a {
    color: ${props => props.theme.text};
    text-decoration: none;
  }
  @media ${ms.MOBILE} {
    font-size: 1.125rem;
  }
`

const Header: FC = () => {
    return (
        <StyledHeader type={'header'} align={'center'} justify={'center'} minh={'60px'} w={'100%'}>
            <Flex justify={'space-between'} align={'center'} maxw={'1440px'} w={'100%'}>
                <StyledHeading><Link to='/'>Where in the world?</Link></StyledHeading>
                <ThemeSwitcher/>
            </Flex>
        </StyledHeader>
    );
};

export default Header;