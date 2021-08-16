import StyledButton from "./StyledButton";
import Icon, {StyledIcon} from "../../components/Icon";
import styled from "styled-components";
import {selectAllCountriesLength} from "./countriesSlice";
import {useAppSelector} from "../../app/hooks";
import {useHistory} from "react-router-dom";

const StyledArrow = styled(StyledIcon)`

`;

const StyledBackButton = styled(StyledButton)`
  padding: 15px;
  min-width: 200px;
`;

const BackButton = () => {
    const history = useHistory();
    const allCountriesLength = useAppSelector(selectAllCountriesLength);
    return (
        <StyledBackButton onClick={() => {
            if (allCountriesLength === 0) {
                history.push('/');
            } else {
                history.goBack();
            }
        }}>
            <StyledArrow><Icon name={'arrow-back'}/></StyledArrow>Back
        </StyledBackButton>
    );
};

export default BackButton;