import React, {FC} from 'react';
import {Link} from "react-router-dom";
import styled from "styled-components";
import {fontOptions as fo} from "../../styles/vars";

export interface ICountryBase {
    flag: string;
    name: string;
    population: number;
    region: string;
    capital: string;
    numericCode: string;
}

const StyledCountry = styled.li`
  a {
    text-decoration: none;
    color: ${props => props.theme.text};
  }
  list-style: none;
  width: 200px;
  height: 300px;
  border-radius: 5px;
  background-color: ${props => props.theme.elementBackground};
  box-shadow: 0 10px 10px ${props => props.theme.border};
`;

const StyledInfo = styled.div`
  padding: 15px;
`;

const StyledInfoHeading = styled.h3`
  margin: 0 0 15px 0;
`;

const StyledInfoItem = styled.p`
  font-size: ${fo.HOMEPAGE_ITEMS_FONT_SIZE};
  margin: 7px 0;
`;

const StyledInfoValue = styled.span`
  font-weight: ${fo.LIGHT_WEIGHT};
`;

export const StyledImage = styled.img`
  width: 100%;
  height: 125px;
`;

const Country: FC<ICountryBase> = ({...country}) => {
    return (
        <StyledCountry>
            <Link to={'/' + country.name.toLowerCase()}>
                <StyledImage src={country.flag}/>
                <StyledInfo>
                    <StyledInfoHeading>{country.name}</StyledInfoHeading>
                    <StyledInfoItem>Population: <StyledInfoValue>{country.population}</StyledInfoValue></StyledInfoItem>
                    <StyledInfoItem>Region: <StyledInfoValue>{country.region}</StyledInfoValue></StyledInfoItem>
                    <StyledInfoItem>Capital: <StyledInfoValue>{country.capital}</StyledInfoValue></StyledInfoItem>
                </StyledInfo>
            </Link>
        </StyledCountry>
    );
};

export default Country;