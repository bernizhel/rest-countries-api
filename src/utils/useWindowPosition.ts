import {useLayoutEffect, useState} from 'react';
import {useAppSelector} from "../app/hooks";
import {selectPage} from "../features/countries/countriesSlice";

export default function useWindowPosition(curPos: number) {
    const [scrollPosition, setPosition] = useState(curPos);
    const page = useAppSelector(selectPage);
    useLayoutEffect(() => {
        function updatePosition() {
            if (window.pageYOffset - scrollPosition > window.innerHeight) {
                setPosition(window.pageYOffset);
            } else if (window.pageYOffset < scrollPosition && page === 1) {
                setPosition(0);
            }
        }

        window.addEventListener('scroll', updatePosition);
        updatePosition();
        return () => window.removeEventListener('scroll', updatePosition);
    }, [scrollPosition, curPos, page]);
    return scrollPosition;
}