import StyledButton from "./StyledButton";
import Icon, {StyledIcon} from "../../components/Icon";
import styled from "styled-components";
import {selectAllCountriesLength, setPreviousCountry} from "./countriesSlice";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useHistory} from "react-router-dom";
import {fontOptions as fo} from "../../styles/vars";
import {FC, memo} from "react";

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

const BackButton: FC = () => {
    const history = useHistory();
    const allCountriesLength = useAppSelector(selectAllCountriesLength);
    const dispatch = useAppDispatch();
    return (
        <StyledBackButton onClick={() => {
            if (allCountriesLength === 0) {
                history.push('/');
            } else {
                dispatch(setPreviousCountry());
                history.goBack();
            }
        }}>
            <StyledArrow><Icon name={'arrow-back'} hasOutline={false}/></StyledArrow>Back
        </StyledBackButton>
    );
};

export default memo(BackButton);