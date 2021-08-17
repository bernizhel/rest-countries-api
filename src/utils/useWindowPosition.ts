import {useLayoutEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {PAGE_LIMIT, selectCountriesLength, selectPage, setNextPage} from "../features/countries/countriesSlice";

export default function useWindowPosition() {
    const [scrollPosition, setPosition] = useState(0);
    const page = useAppSelector(selectPage);
    const countriesLength = useAppSelector(selectCountriesLength);
    const showedCountriesLength = page * PAGE_LIMIT;
    const dispatch = useAppDispatch();
    useLayoutEffect(() => {
        function updatePosition() {
            if (window.pageYOffset > document.body.offsetHeight - window.innerHeight * 1.5
                && countriesLength > showedCountriesLength) {
                setPosition(window.pageYOffset);
                dispatch(setNextPage());
            }
        }

        window.addEventListener('scroll', updatePosition);
        updatePosition();
        return () => window.removeEventListener('scroll', updatePosition);
    }, [countriesLength, showedCountriesLength, dispatch, page]);
    return scrollPosition;
}