// todo: make select tag look good

import styled from "styled-components";
import {Region, setRegion} from "./countriesSlice";
import {useAppDispatch} from "../../app/hooks";

const StyledContainer = styled.div`
  position: relative;
`;

const StyledSelect = styled.select`
  background-color: ${props => props.theme.elementBackground};
  color: ${props => props.theme.text};
  padding: 15px;
  box-shadow: 0 5px 5px ${props => props.theme.border};
  border-radius: 5px;
  border: none;
  width: 150px;
  appearance: none;
`;

const BORDER_SIZE_EM = 0.35;

const StyledBlock = styled.div`
  display: block;
  pointer-events: none;
  width: 1.5em;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 999;
  background: ${props => props.theme.border};
  
  ::before, ::after {
    content: '';
    display: block;
    position: absolute;
    width: 0;
    height: 0;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  ::before {
    border-left: ${BORDER_SIZE_EM}em solid transparent;
    border-right: ${BORDER_SIZE_EM}em solid transparent;
    border-bottom: ${BORDER_SIZE_EM}em solid ${props => props.theme.text};
    top: 40%;
  }

  ::after {
    border-left: ${BORDER_SIZE_EM}em solid transparent;
    border-right: ${BORDER_SIZE_EM}em solid transparent;
    border-top: ${BORDER_SIZE_EM}em solid ${props => props.theme.text};
    top: 60%;
  }
`;

const SearchFilter = () => {
    const dispatch = useAppDispatch();
    return (
        <StyledContainer>
            <StyledSelect defaultValue={'default'} onChange={event => dispatch(setRegion(event.target.value as Region))}>
                <option hidden disabled value='default'>Filter by Region</option>
                <option value=''>Worldwide</option>
                <option value='africa'>Africa</option>
                <option value='americas'>Americas</option>
                <option value='asia'>Asia</option>
                <option value='europe'>Europe</option>
                <option value='oceania'>Oceania</option>
            </StyledSelect>
            <StyledBlock/>
        </StyledContainer>
    );
};

export default SearchFilter;