import React from 'react';
import styled from "styled-components";

const StyledSelect = styled.select`
  appearance: none;
  background-color: ${props => props.theme.elementBackground};
  color: ${props => props.theme.text};
  padding: 15px;
  border: 2px solid ${props => props.theme.border};
  border-radius: 5px;
  outline: none;
  width: 150px;
`;

const SearchFilter = () => {
    return (
        <StyledSelect defaultValue={'default'}>
            <option value='default'>Filter by Region</option>
            <option value='africa'>Africa</option>
            <option value='america'>America</option>
            <option value='asia'>Asia</option>
            <option value='europe'>Europe</option>
            <option value='oceania'>Oceania</option>
        </StyledSelect>
    );
};

export default SearchFilter;