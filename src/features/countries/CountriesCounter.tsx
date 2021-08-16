import {useAppSelector} from "../../app/hooks";
import {
    PAGE_LIMIT,
    selectAllCountriesLength,
    selectCountriesLength,
    selectPage,
    selectToggledInfo
} from "./countriesSlice";
import styled from "styled-components";

const StyledCountriesCounter = styled.div`
  position: fixed;
  right: 10px;
  bottom: 10px;
  color: gray;
`;

const StyledNumber = styled.span`
  color: ${props => props.theme.text};
`;

const CountriesCounter = () => {
    const toggledInfo = useAppSelector(selectToggledInfo);
    const allCountriesLength = useAppSelector(selectAllCountriesLength);
    const countriesLength = useAppSelector(selectCountriesLength);
    const page = useAppSelector(selectPage);
    const showedCountriesLength = page * PAGE_LIMIT;
    return (
        <StyledCountriesCounter>
            {toggledInfo && (
                <>
                    <p>Matched <StyledNumber>{countriesLength}</StyledNumber>/<StyledNumber>{allCountriesLength}</StyledNumber></p>
                    <p>Showed <StyledNumber>{countriesLength < showedCountriesLength ? countriesLength
                        : showedCountriesLength}</StyledNumber>/<StyledNumber>{countriesLength}</StyledNumber>
                    </p>
                </>
            )}
        </StyledCountriesCounter>
    );
};

export default CountriesCounter;