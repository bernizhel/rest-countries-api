import { FC, useEffect, useState } from 'react';
import {ICountryBase, StyledImage} from "./Country";
import {RouterParams} from "../../components/Detailed";
import API from "./countriesAPI";
import Flex from "../../components/Flex";

export interface ICountryExtended extends ICountryBase {
    nativeName: string;
    subregion: string;
    topLevelDomains: string[];
    currencies: object[];
    languages: object[];
    borders: string[];
}

type ICountryExtendedWrapper = ICountryExtended[]

const CountryExtended: FC<RouterParams> = ({name}) => {
    const [country, setCountry] = useState<ICountryExtended>({} as ICountryExtended)
    useEffect(() => {
        API.get(`/name/${name}?fullText=true`)
            .then(res => res.data)
            .catch(e => console.log(e))
            .then((json: ICountryExtendedWrapper) => console.log(json));
    }, [name])
    // todo: fix the bug with extended pages
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