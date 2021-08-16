// todo: get the routing work properly

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
import {useParams} from "react-router-dom";
import {IParams} from "../../utils/routerTypes";
import BackButton from "./BackButton";

const DetailedCountry: FC = () => {
    const {name} = useParams<IParams>()
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(setDetailedCountry(name));
        dispatch(fetchCountries());
    }, [name, dispatch]);
    const status = useAppSelector(selectStatus);
    const error = useAppSelector(selectError);
    const detailedCountry = useAppSelector(selectCountries)[0] as IDetailedCountry;
    useEffect(() => {
        if (detailedCountry !== undefined) {
            dispatch(fetchNeighbors(detailedCountry.borders));
        }
    }, [dispatch, detailedCountry])
    const neighbors = useAppSelector(selectNeighbors);
    const neighborsStatus = useAppSelector(selectNeighborsStatus);
    return (<>{
        status !== 'idle'
            ? (status === 'loading'
                    ? <Loader/>
                    : <Error error={error} stack={error ? error.stack as string : ''}/>
            ) : (detailedCountry !== undefined &&
            <>
              <Flex gap={'100px'} direction={'column'}>
                <BackButton />
                <img src={detailedCountry.flag} width={200} alt={`Flag of ${detailedCountry.name}`}/>
                <p>
                    {detailedCountry.name}, {formatNumber(detailedCountry.population.toString())},
                    {detailedCountry.region}, {detailedCountry.capital},
                    {detailedCountry.nativeName}, {detailedCountry.subregion}
                </p>
                <p>Domain: {detailedCountry.topLevelDomain.join(', ')};</p>
                <p>Currencies: {detailedCountry.currencies.map((c, i) => <span key={i}>{c.name}</span>)}</p>
                <p>Languages: {detailedCountry.languages.map((l, i) => <span key={i}>{l.name}</span>)}</p>
                <p>Borders: {neighborsStatus !== 'idle'
                    ? (neighborsStatus === 'loading' ? 'loading...' :
                        <Error error={error} stack={error ? error.stack as string : ''}/>)
                    : neighbors.map((neighborName, i) => <Neighbor key={i} name={neighborName}/>)
                }</p>
              </Flex>
            </>
            )
    }</>);
};

export default DetailedCountry;