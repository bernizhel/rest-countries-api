import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import API from './countriesAPI';

interface CountriesState {
    loading: boolean;
}

const initialState: CountriesState = {
    loading: true,
}

const countriesSlice = createSlice({
    name: 'countries',
    initialState,
    reducers: {

    }
});

function responseParser() {

}


export const selectLoading = (state: RootState) => state.countries.loading;

export default countriesSlice.reducer;