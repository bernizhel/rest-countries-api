import SearchBar from "./SearchBar";
import SearchFilter from "./SearchFilter";
import Flex from "../../components/Flex";
import styled from "styled-components";
import SearchToggle from "./SearchToggle";
import {mediaSizes as ms} from "../../styles/vars";
import {memo} from "react";

const StyledSearch = styled(Flex)`
  margin-bottom: 35px;
  @media ${ms.MOBILE_TABLET} {
    flex-direction: column;
    gap: 25px;
    > div:last-child {
      justify-content: space-around;
    }
  }
`;

const Search = () => {
    return (
        <StyledSearch type={'nav'} gap={'10px'} jc={'space-between'} w={'100%'}>
            <SearchBar/>
            <Flex jc={'space-between'} w={'100%'}>
                <SearchFilter/>
                <SearchToggle/>
            </Flex>
        </StyledSearch>
    );
};

export default memo(Search);