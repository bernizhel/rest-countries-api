import {FC, useEffect, useState} from 'react';
import API from './countriesAPI'
import Country, {ICountryBase} from './Country'
import Grid from "../../components/Grid";
import styled from "styled-components";
import {mediaSizes as ms} from "../../styles/vars";

const URL = 'all'

type Countries = ICountryBase[]

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

const TestAPI: FC = () => {
    const [countries, setCountries] = useState<Countries>([])
    useEffect(() => {
        API.get(URL)
            .then(res => res.data)
            .catch(e => console.log(e))
            .then((json: Countries) => setCountries(json));
    }, [])
    return (
        <StyledGrid type={'ul'} w={'100%'} tc={'repeat(4, 1fr)'} gap={'50px'} ji={'center'}>
            {countries.map(country => (
                <Country key={country.numericCode} {...country}/>
            ))}
        </StyledGrid>
    );
};

export default TestAPI;