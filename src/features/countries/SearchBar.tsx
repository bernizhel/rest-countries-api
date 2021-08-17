import styled from "styled-components";
import Icon, {StyledIcon} from "../../components/Icon";
import {useAppDispatch} from "../../app/hooks";
import {setSearch} from "./countriesSlice";
import {mediaSizes as ms} from "../../styles/vars";
import {useRef} from "react";

const StyledBar = styled.div`
  background-color: ${props => props.theme.elementBackground};
  color: ${props => props.theme.text};
  padding: 11px 20px;
  box-shadow: 0 5px 5px ${props => props.theme.border};
  border-radius: 5px;
  outline: none;
  width: 100%;
  max-width: 350px;
  @media ${ms.MOBILE_TABLET} {
    align-self: center;
  }
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
  min-height: 24px;
  width: calc(100% - 10px - 16px);
`;

const SearchBar = () => {
    const input = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();
    return (
        <StyledBar onClick={() => input.current && input.current.focus()}>
            <StyledMG><Icon name={'search'} hasOutline={false}/></StyledMG>
            <StyledInput ref={input} type={'text'} autoComplete={'off'}
                         placeholder={'Search for a country...'}
                         onChange={() => dispatch(setSearch(input.current ? input.current.value : ''))}
            />
        </StyledBar>
    );
};

export default SearchBar;