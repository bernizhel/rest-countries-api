import {FC, memo} from 'react';
import ThemeSwitcher from '../features/theme/ThemeSwitcher'
import Flex from './Flex'
import styled from "styled-components";
import {mediaSizes as ms} from "../styles/vars";
import {Link} from 'react-router-dom';
import {useAppDispatch} from "../app/hooks";
import {fetchCountries, setAllCountries, setNullFilter} from "../features/countries/countriesSlice";

const StyledHeader = styled(Flex)`
  background-color: ${props => props.theme.elementBackground};
  padding: 0 50px;
  box-shadow: 0 5px 5px ${props => props.theme.border};
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
    const dispatch = useAppDispatch();
    return (
        <StyledHeader type={'header'} ai={'center'} jc={'center'} minh={'60px'} w={'100%'}>
            <Flex jc={'space-between'} ai={'center'} maxw={'1080px'} w={'100%'}>
                <StyledHeading><Link to='/' onClick={() => {
                    dispatch(setNullFilter());
                    dispatch(setAllCountries());
                    dispatch(fetchCountries());
                }}>Where in the world?</Link></StyledHeading>
                <ThemeSwitcher/>
            </Flex>
        </StyledHeader>
    );
};

export default memo(Header);