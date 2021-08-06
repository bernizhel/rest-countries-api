import React, {FC} from 'react';
import styled from "styled-components";
import Flex from "./Flex";
import Search from '../features/search/Search';
import Loader from "./Loader";

const TestAPI = React.lazy(() => import('../features/countries/Test'));

const StyledMain = styled(Flex)`
  padding: 35px 50px;
`;

const Main: FC = () => {
    return (
        <StyledMain type={'main'} justify={'center'} w={'100%'}>
            <Flex direction={'column'} maxw={'1440px'} w={'100%'}>
                <Search />
                <React.Suspense fallback={<Loader />}>
                    <TestAPI />
                </React.Suspense>
            </Flex>
        </StyledMain>
    );
};

export default Main;