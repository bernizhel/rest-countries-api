import {FC, useEffect} from 'react';
import styled from "styled-components";
import Flex from "./Flex";
import Search from '../features/countries/Search';
import Grid from "./Grid";
import {mediaSizes as ms} from "../styles/vars";
import Country from "../features/countries/Country";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {
    fetchCountries,
    PAGE_LIMIT,
    selectCountries,
    selectCountriesLength,
    selectError,
    selectPage,
    selectStatus,
    setAllCountries,
    setNextPage,
} from "../features/countries/countriesSlice";
import Loader from "./Loader";
import {IBaseCountry} from "../features/countries/countriesTypes";
import Error from './Error/Error'
import useWindowPosition from "../utils/useWindowPosition";
import CountriesCounter from "../features/countries/CountriesCounter";


const StyledMain = styled(Flex)`
  padding: 35px 50px;
`;

const StyledGrid = styled(Grid)`
  @media ${ms.DESKTOP_SMALL} {
    grid-template-columns: repeat(3, 1fr);
  }
  @media ${ms.TABLET} {
    grid-template-columns: repeat(2, 1fr);
  }
  @media ${ms.MOBILE} {
    grid-template-columns: 1fr;
  }
`;

const Main: FC = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(setAllCountries());
        dispatch(fetchCountries());
    }, [dispatch]);
    const status = useAppSelector(selectStatus);
    const error = useAppSelector(selectError);
    const countries = useAppSelector(selectCountries);

    const page = useAppSelector(selectPage);
    const countriesLength = useAppSelector(selectCountriesLength);
    const showedCountriesLength = page * PAGE_LIMIT;
    const scrollPosition = useWindowPosition();
    useEffect(() => {
        if ((scrollPosition >= document.body.offsetHeight - (window.innerHeight * 2))
            && countriesLength > showedCountriesLength) {
            dispatch(setNextPage());
        }
    }, [dispatch, scrollPosition, countriesLength, showedCountriesLength])
    return (
        <StyledMain type={'main'} jc={'center'} w={'100%'}>
            <Flex direction={'column'} maxw={'1080px'} w={'100%'}>
                <Search/>
                {status !== 'idle'
                    ? (status === 'loading'
                            ? <Loader/>
                            : <Error error={error} stack={error ? error.stack as string : ''}/>
                    )
                    : <StyledGrid type={'ul'} w={'100%'} tc={'repeat(4, 1fr)'} gap={'50px'} ji={'center'}>
                        <CountriesCounter />
                        {countries.slice(0, showedCountriesLength).map((country: IBaseCountry, i: number) => (
                            <Country key={i} country={country}/>
                        ))}
                    </StyledGrid>
                }
            </Flex>
        </StyledMain>
    );
};

export default Main;