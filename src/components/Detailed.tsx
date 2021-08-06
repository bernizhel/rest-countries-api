import React, {FC} from 'react';
import Loader from "./Loader";
import {useParams} from "react-router-dom";

const CountryExtended = React.lazy(() => import('../features/countries/CountryExtended'));

export interface RouterParams {
    name: string;
}

const Detailed: FC = () => {
    const {name} = useParams<RouterParams>()
    return (
        <React.Suspense fallback={<Loader />}>
            <CountryExtended name={name} />
        </React.Suspense>
    );
};

export default Detailed;