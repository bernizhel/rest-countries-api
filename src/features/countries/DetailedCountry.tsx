import {FC, useEffect} from 'react';
import Flex from "../../components/Flex";
import Loader from "../../components/Loader";
import Error from "../../components/Error/Error";
import {
    fetchCountries,
    fetchNeighbors,
    selectCountries,
    selectError,
    selectNeighbors,
    selectNeighborsStatus,
    selectStatus,
    setDetailedCountry
} from "./countriesSlice";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {IDetailedCountry} from "./countriesTypes";
import {formatNumber} from "../../utils/utils";
import Neighbor from "./Neighbor";
import BackButton from "./BackButton";
import {useParams} from "react-router-dom";
import {IParams} from "../../utils/routerTypes";
import styled from "styled-components";
import {fontOptions as fo, mediaSizes as ms} from "../../styles/vars";

const StyledContainer = styled(Flex)`
  padding: 35px 50px;

  * {
    font-size: ${fo.DETAIL_ITEMS_FONT_SIZE};
  }

  @media ${ms.MOBILE} {
    padding: 35px 20px;
  }
`;

const StyledDetails = styled(Flex)`
  @media ${ms.MOBILE_TABLET} {
    flex-direction: column;
  }

  > div:first-child * {
    overflow: hidden;
  }
`;

const StyledImage = styled.img`
  max-width: 90%;
  @media ${ms.MOBILE} {
    max-width: 100%;
  }
`;

const StyledInfo = styled(Flex)`
  padding: 25px;

  h2 {
    font-size: 1.75rem;
    font-weight: ${fo.BOLD_WEIGHT};
    margin-bottom: 25px;
  }

  p {
    margin-bottom: 6px;
  }

  span {
    font-weight: ${fo.LIGHT_WEIGHT};
  }

  div div:first-child {
    flex-basis: 55%;
  }

  div div:last-child {
    flex-basis: 45%;
  }

  & > div:last-child {
    margin-top: 50px;
  }
  
  @media ${ms.MOBILE} {
    padding: 35px 0;
    > div:nth-child(2) {
      flex-direction: column;
    }
    > div:last-child span {
      display: block;
    }
  }
`;

const DetailedCountry: FC = () => {
    const {name} = useParams<IParams>()
    const dispatch = useAppDispatch();
    const status = useAppSelector(selectStatus);
    const error = useAppSelector(selectError);
    useEffect(() => {
        if (status === 'idle') {
            dispatch(setDetailedCountry(name));
            dispatch(fetchCountries());
        }
    }, [name]);
    const detailedCountry = useAppSelector(selectCountries)[0] as IDetailedCountry;
    useEffect(() => {
        if (detailedCountry !== undefined) {
            dispatch(fetchNeighbors(detailedCountry.borders));
        }
    }, [detailedCountry])
    const neighbors = useAppSelector(selectNeighbors);
    const neighborsStatus = useAppSelector(selectNeighborsStatus);
    return (<>{
        status !== 'idle'
            ? (status === 'loading'
                    ? <Loader/>
                    : <Error error={error} stack={error ? error.stack as string : ''}/>
            ) : (detailedCountry !== undefined &&
            <StyledContainer type={'section'} ai={'center'} jc={'center'} w={'100%'} minh={'calc(100vh - 100px)'}>
              <StyledDetails maxw={'1080px'} w={'100%'} h={'100%'} maxh={'100%'}>
                <Flex h={'100%'} jc={'center'} direction={'column'} minw={'50%'}>
                  <BackButton/>
                  <StyledImage src={detailedCountry.flag} alt={`Flag of ${detailedCountry.name}`}/>
                </Flex>
                <StyledInfo direction={'column'} h={'100%'} minw={'50%'} jc={'center'}>
                  <h2>{detailedCountry.name}</h2>
                  <Flex gap={'25px'} w={'100%'}>
                    <div>
                      <p>Native Name: <span>{detailedCountry.nativeName}</span></p>
                      <p>Population: <span>{formatNumber(detailedCountry.population.toString())}</span></p>
                      <p>Region: <span>{detailedCountry.region}</span></p>
                      <p>Sub Region: <span>{detailedCountry.subregion || '[no info]'}</span></p>
                      <p>Capital: <span>{detailedCountry.capital || '[no info]'}</span></p>
                    </div>
                    <div>
                      <p>Domain: <span>{detailedCountry.topLevelDomain.join(', ')}</span></p>
                      <p>Currencies: <span>{detailedCountry.currencies.map(c => c.name).join(', ')}</span></p>
                      <p>Languages: <span>{detailedCountry.languages.map(l => l.name).join(', ')}</span></p>
                    </div>
                  </Flex>
                  <div>Borders: <span>{neighborsStatus !== 'idle'
                      ? (neighborsStatus === 'loading' ? 'loading...' :
                          <Error error={error} stack={error ? error.stack as string : ''}/>)
                      : (neighbors[0] !== undefined ? neighbors.map((neighborName, i) => {
                          return <Neighbor key={i} name={neighborName}/>
                      }) : 'no land borders')
                  }</span></div>
                </StyledInfo>
              </StyledDetails>
            </StyledContainer>
            )
    }</>);
};

export default DetailedCountry;