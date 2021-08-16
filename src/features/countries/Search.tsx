import SearchBar from "./SearchBar";
import SearchFilter from "./SearchFilter";
import Flex from "../../components/Flex";
import styled from "styled-components";
import SearchToggle from "./SearchToggle";

const StyledSearch = styled(Flex)`
  margin-bottom: 35px;
`;

const Search = () => {
    return (
        <StyledSearch type={'nav'} jc={'space-between'} w={'100%'}>
            <SearchBar/>
            <SearchFilter/>
            <SearchToggle/>
        </StyledSearch>
    );
};

export default Search;