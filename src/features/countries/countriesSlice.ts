import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";

interface CountriesState {
    loading: boolean;
}

const initialState: CountriesState = {
    loading: true,
}

const countriesSlice = createSlice({
    name: 'countries',
    initialState,
    reducers: {},
});


export const selectLoading = (state: RootState) => state.countries.loading;

export default countriesSlice.reducer;