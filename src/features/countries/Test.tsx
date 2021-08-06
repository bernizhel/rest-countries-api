import React, {FC, useEffect, useState} from 'react';
import API from './countriesAPI'
import Country, {ICountryBase} from './Country'

const URL = 'all'

type Countries = ICountryBase[]

const TestAPI: FC = () => {
    const [countries, setCountries] = useState<Countries>([])
    useEffect(() => {
        API.get(URL)
            .then(res => res.data)
            .catch(e => console.log(e))
            .then((json: Countries) => setCountries(json));
    }, [])
    return (
        <ul>
            {countries.map(country => (
                <Country key={country.numericCode} {...country}/>
            ))}
        </ul>
    );
};

export default TestAPI;