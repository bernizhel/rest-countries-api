import { lazy, Suspense, FC } from 'react';
import Loader from "./Loader";
import {useParams} from "react-router-dom";

const CountryExtended = lazy(() => import('../features/countries/CountryExtended'));

export interface RouterParams {
    name: string;
}

const Detailed: FC = () => {
    const {name} = useParams<RouterParams>()
    return (
        <Suspense fallback={<Loader />}>
            <CountryExtended name={name} />
        </Suspense>
    );
};

export default Detailed;