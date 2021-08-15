// todo: get the routing work properly

import {FC, useCallback} from 'react';
import Flex from "../../components/Flex";
import Loader from "../../components/Loader";
import Error from "../../Error/Error";
import {fetchNeighbor, selectCountries, selectError, selectStatus} from "./countriesSlice";
import {useAppSelector} from "../../app/hooks";
import {IDetailedCountry, INeighbor} from "./countriesTypes";
import {formatNumber} from "../../utils/utils";
import {Link} from "react-router-dom";

const DetailedCountry: FC = () => {
    const status = useAppSelector(selectStatus);
    const error = useAppSelector(selectError);
    const detailedCountry = useAppSelector(selectCountries)[0] as IDetailedCountry;
    // const borders = detailedCountry.borders;
    // const cb = useCallback(async () => {
    //     const temp: Array<string> = [];
    //     if (status !== 'idle') {
    //         return temp;
    //     }
    //     for (const code of borders) {
    //         const neighbor: INeighbor = await fetchNeighbor(code.toLowerCase());
    //         temp.push(neighbor.name);
    //     }
    //     return temp;
    // }, [status]);
    // let neighbors: string[] = [];
    // cb().then(temp => {
    //     neighbors = [...temp];
    // });
    return (<>{
        status !== 'idle'
            ? (status === 'loading'
                    ? <Loader/>
                    : <Error error={error} stack={error ? error.stack as string : ''}/>
            )
            :
            <>
                <Flex>
                    <img src={detailedCountry.flag} width={500} alt={`Flag of ${detailedCountry.name}`}/>
                    <p>
                        {detailedCountry.name}, {formatNumber(detailedCountry.population.toString())},
                        {detailedCountry.region}, {detailedCountry.capital},
                        {detailedCountry.nativeName}, {detailedCountry.subregion}
                    </p>
                    <p>Domain: {detailedCountry.topLevelDomain.join(', ')};</p>
                    <p>Currencies: {detailedCountry.currencies.map((c, i) => <span key={i}>{c.name}</span>)}</p>
                    <p>Languages: {detailedCountry.languages.map((l, i) => <span key={i}>{l.name}</span>)}</p>
                    <p>Borders: {detailedCountry.borders.map((name, i) => {
                        return <><Link to={'/' + name} key={i}>{name}</Link><br/></>
                    })}</p>
                </Flex>
            </>
    }</>);
};

export default DetailedCountry;