import React from 'react';
import StyledButton from "./StyledButton";
import {setToggledInfo} from "./countriesSlice";
import {useAppDispatch} from "../../app/hooks";
import styled from "styled-components";

const StyledToggle = styled(StyledButton)`
  min-width: 100px;
  padding: 15px;
`;

const SearchToggle = () => {
    const dispatch = useAppDispatch();
    return <StyledToggle onClick={() => dispatch(setToggledInfo())}>Toggle Info</StyledToggle>;
};

export default SearchToggle;