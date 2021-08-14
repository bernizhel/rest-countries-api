import { FC, useEffect, useState } from 'react';
import {StyledImage} from "./Country";
import {RouterParams} from "../../components/Detailed";
import API from "./countriesAPI";
import Flex from "../../components/Flex";
import {DetailedCountries, IDetailedCountry} from "./countriesTypes";



const CountryExtended: FC<RouterParams> = ({name}) => {
    const [country] = useState<IDetailedCountry>({} as IDetailedCountry)
    useEffect(() => {
        API.get(`/name/${name}?fullText=true`)
            .then(res => res.data)
            .catch(e => console.log(e))
            .then((json: DetailedCountries) => console.log(json));
    }, [name])
    return (
        <Flex>
            <StyledImage src={country.flag}/>
            <p>
                {country.name}, {country.population},
                {country.region}, {country.capital},
                {country.nativeName}, {country.subregion}
            </p>
            <p>Domains: {country.topLevelDomains.join(', ')};</p>
            <p>Currencies: {country.currencies.map((c, i) => <span key={i}>c.name</span>)}</p>
            <p>Currencies: {country.languages.map((l, i) => <span key={i}>l.name</span>)}</p>
            <p>Borders: {country.borders.join(', ')}</p>
        </Flex>
    );
};

export default CountryExtended;