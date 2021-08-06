import React, {FC} from 'react';
import {Link} from "react-router-dom";
import styled from "styled-components";

export interface ICountryBase {
    flag: string;
    name: string;
    population: number;
    region: string;
    capital: string;
    numericCode: string;
}

const StyledText = styled.li`
  a {
    text-decoration: none;
    color: ${props => props.theme.text};
  }
`;

export const StyledImage = styled.img`
  width: 100px;
`;

const Country: FC<ICountryBase> = ({...country}) => {
    return (
        <StyledText>
            <Link to={'/' + country.name.toLowerCase()}>
                <StyledImage src={country.flag} />
                {country.name}, {country.population}, {country.region}, {country.capital}
            </Link>
        </StyledText>
    );
};

export default Country;