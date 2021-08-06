import React, {FC, useEffect, useState} from 'react';
import {ICountryBase, StyledImage} from "./Country";
import {RouterParams} from "../../components/Detailed";
import API from "./countriesAPI";
import Flex from "../../components/Flex";

export interface ICountryExtended extends ICountryBase {
    nativeName: string;
    subregion: string;
    topLevelDomain: string[];
    currencies: object[];
    languages: object[];
    borders: string[];
}

type ICountryExtendedWrapper = ICountryExtended[]

interface INeed {
    name: string;
}

const CountryExtended: FC<RouterParams> = ({name}) => {
    const [country, setCountry] = useState<ICountryExtended>({} as ICountryExtended)
    useEffect(() => {
        API.get(`/name/${name}?fullText=true`)
            .then(res => res.data)
            .catch(e => console.log(e))
            .then((json: ICountryExtendedWrapper) => setCountry(json[0]));
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
            <p>Domains: {country.topLevelDomain.map(i => i).join(', ')};</p>
            <p>Currencies: {country.currencies.map<INeed>(c => ({...c} as INeed)).map((c: INeed) => c.name)};</p>
            <p>Languages: {country.languages.map<INeed>(l => ({...l} as INeed)).map((l: INeed) => l.name)};</p>
            <p>Borders: {country.borders.map(i => i).join(', ')}</p>
        </Flex>
    );
};

export default CountryExtended;