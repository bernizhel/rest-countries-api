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
    selectCountries, selectError,
    selectPage,
    selectStatus,
    setAllCountries,
} from "../features/countries/countriesSlice";
import Loader from "./Loader";
import {IBaseCountry} from "../features/countries/countriesTypes";
import {useErrorHandler} from 'react-error-boundary';
import Error from '../Error/Error'


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

interface IMainProps {
    onScroll: (e: React.UIEvent<HTMLElement>) => void;
}

const Main: FC<IMainProps> = () => {
    const handleError = useErrorHandler();
    const dispatch = useAppDispatch();
    const status = useAppSelector(selectStatus);
    const countries = useAppSelector(selectCountries);
    const page = useAppSelector(selectPage);
    const error = useAppSelector(selectError);
    useEffect(() => {
        dispatch(setAllCountries());
        dispatch(fetchCountries());
    }, [dispatch, handleError]);
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
                        {countries.slice(0, page * PAGE_LIMIT).map((country: IBaseCountry, i: number) => (
                            <Country key={i} country={country}/>
                        ))}
                    </StyledGrid>
                }
            </Flex>
        </StyledMain>
    );
};

export default Main;