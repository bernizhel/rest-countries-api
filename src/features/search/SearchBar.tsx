import React, {MutableRefObject, useRef} from 'react';
import styled from "styled-components";
import Icon, {StyledIcon} from "../../components/Icon";

const StyledBar = styled.div`
  background-color: ${props => props.theme.elementBackground};
  color: ${props => props.theme.text};
  padding: 11px 20px;
  border: 2px solid ${props => props.theme.border};
  border-radius: 5px;
  outline: none;
  width: 100%;
  max-width: 350px;
`;

const StyledMG = styled(StyledIcon)`
  display: inline-block;
  vertical-align: sub;
  margin-right: 10px;
`;

const StyledInput = styled.input`
  appearance: none;
  background-color: ${props => props.theme.elementBackground};
  color: ${props => props.theme.text};
  border: none;
  outline: none;
  display: inline-block;
  width: calc(100% - 10px - 16px);
`;

const SearchBar = () => {
    const inputRef = useRef() as MutableRefObject<HTMLInputElement>
    return (
        <StyledBar onClick={() => inputRef.current.focus()}>
            <StyledMG><Icon name={'search'}/></StyledMG>
            <StyledInput ref={inputRef} type={'text'}
                         placeholder={'Search for a country...'}/>
        </StyledBar>
    );
};

export default SearchBar;