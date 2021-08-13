import { lazy, Suspense, FC } from 'react';
import styled from "styled-components";
import Flex from "./Flex";
import Search from '../features/search/Search';
import Loader from "./Loader";

const TestAPI = lazy(() => import('../features/countries/Test'));

const StyledMain = styled(Flex)`
  padding: 35px 50px;
`;

const Main: FC = () => {
    return (
        <StyledMain type={'main'} jc={'center'} w={'100%'}>
            <Flex direction={'column'} maxw={'1080px'} w={'100%'}>
                <Search />
                <Suspense fallback={<Loader />}>
                    <TestAPI />
                </Suspense>
            </Flex>
        </StyledMain>
    );
};

export default Main;