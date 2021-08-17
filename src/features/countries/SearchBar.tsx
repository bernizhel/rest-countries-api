import styled from "styled-components";
import Icon, {StyledIcon} from "../../components/Icon";
import {useForm, SubmitHandler} from 'react-hook-form';
import {useAppDispatch} from "../../app/hooks";
import {setSearch} from "./countriesSlice";
import {mediaSizes as ms} from "../../styles/vars";

const StyledBar = styled.form`
  background-color: ${props => props.theme.elementBackground};
  color: ${props => props.theme.text};
  padding: 11px 20px;
  box-shadow: 0 5px 5px ${props => props.theme.border};
  border-radius: 5px;
  outline: none;
  width: 100%;
  max-width: 350px;
  @media ${ms.MOBILE_TABLET} {
    align-self: center;
  }
`;

const StyledMG = styled(StyledIcon)`
  display: inline-block;
  vertical-align: sub;
  margin-right: 10px;
`;

const StyledInput = styled.input`
  appearance: none;
  background-color: ${props => props.theme.elementBackground};
  color: ${props => props.theme.text};
  border: none;
  outline: none;
  display: inline-block;
  min-height: 24px;
  width: calc(100% - 10px - 16px);
`;

type TextInput = {
    search: string;
}

// todo: make it work on change (not on submit)
const SearchBar = () => {
    const {register, handleSubmit, setFocus} = useForm<TextInput>();
    const dispatch = useAppDispatch();
    const onSubmit: SubmitHandler<TextInput> = data => dispatch(setSearch(data.search.toLowerCase()));
    return (
        <StyledBar onSubmit={handleSubmit(onSubmit)} onClick={() => setFocus('search')}>
            <StyledMG><Icon name={'search'} hasOutline={false}/></StyledMG>
            <StyledInput {...register('search')} type={'text'} autoComplete={'off'}
                         placeholder={'Search for a country...'}
            />
        </StyledBar>
    );
};

export default SearchBar;