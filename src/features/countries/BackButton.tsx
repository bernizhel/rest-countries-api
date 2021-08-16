import StyledButton from "./StyledButton";
import Icon, {StyledIcon} from "../../components/Icon";
import styled from "styled-components";
import {selectAllCountriesLength} from "./countriesSlice";
import {useAppSelector} from "../../app/hooks";
import {useHistory} from "react-router-dom";
import {fontOptions as fo} from "../../styles/vars";

const StyledArrow = styled(StyledIcon)`
  display: inline-block;
  vertical-align: -40%;
  margin-right: 8px;
`;

const StyledBackButton = styled(StyledButton)`
  padding: 8px 40px 8px 30px;
  margin-bottom: 35px;
  max-width: 150px;
  min-height: 45px;
  border: 2px solid ${props => props.theme.border};
  font-weight: ${fo.LIGHT_WEIGHT};
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
            <StyledArrow><Icon name={'arrow-back'} hasOutline={false}/></StyledArrow>Back
        </StyledBackButton>
    );
};

export default BackButton;