import SearchBar from "./SearchBar";
import SearchFilter from "./SearchFilter";
import Flex from "../../components/Flex";
import styled from "styled-components";
import {useAppDispatch} from "../../app/hooks";
import {setToggledInfo} from "./countriesSlice";

const StyledSearch = styled(Flex)`
  margin-bottom: 35px;
`;

const StyledButton = styled.button`
  background-color: ${props => props.theme.elementBackground};
  color: ${props => props.theme.text};
  padding: 15px;
  box-shadow: 0 5px 5px ${props => props.theme.border};
  border-radius: 5px;
  border: none;
  min-width: 100px;
  cursor: pointer;
  white-space: nowrap;
`;

const Search = () => {
    const dispatch = useAppDispatch();
    return (
        <StyledSearch type={'nav'} jc={'space-between'} w={'100%'}>
            <SearchBar/>
            <SearchFilter/>
            <StyledButton onClick={() => dispatch(setToggledInfo())}>Toggle Info</StyledButton>
        </StyledSearch>
    );
};

export default Search;