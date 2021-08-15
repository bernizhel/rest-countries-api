import {createAsyncThunk, createSlice, PayloadAction, SerializedError} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {Countries, DetailedCountries, INeighbor, keysOfCountry, keysOfDetailedCountry} from "./countriesTypes";
import countriesAPI from "./countriesAPI";
import {AxiosResponse} from "axios";

export type Region = '' | 'europe' | 'africa' | 'americas' | 'asia' | 'oceania';

type Status = 'idle' | 'loading' | 'rejected';

export interface ICountriesState {
    status: Status;
    error: SerializedError | null;
    detailed: boolean;
    exactName: string;
    page: number;
    allCountries: Countries;
    countries: Countries | DetailedCountries;
    filter: {
        name: string;
        region: Region;
    }
    toggledInfo: boolean;
}

const initialState: ICountriesState = {
    status: 'idle',
    error: null,
    detailed: false,
    exactName: '',
    page: 1,
    allCountries: [] as Countries,
    countries: [] as Countries,
    filter: {
        name: '',
        region: '',
    },
    toggledInfo: false,
}

export const fetchCountries = createAsyncThunk<DetailedCountries | Countries,
    undefined,
    { rejectValue: Error, state: RootState }>(
    'countries/fetchCountries',
    async (_, thunkAPI) => {
        const countriesState = thunkAPI.getState().countries as ICountriesState;
        const builtURL: string = URLBuilder(countriesState);
        let data = await countriesAPI.get(builtURL)
            .then((res: AxiosResponse) => res.data)
            .catch((e: Error) => thunkAPI.rejectWithValue(e));
        return countriesState.detailed ? data as DetailedCountries : data as Countries;
    }
);

export const fetchNeighbor = async (code: string) => {
    const url: string = `alpha/${code}?fields=name`;
    return await countriesAPI.get(url)
        .then((res: AxiosResponse) => res.data as INeighbor)
        .catch((e: Error) => {
            throw Error(e.message);
        });
}

const countriesSlice = createSlice({
    name: 'countries',
    initialState,
    reducers: {
        setAllCountries: (state: ICountriesState) => {
            state.detailed = false;
            state.exactName = '';
            state.countries = [] as Countries;
            state.page = 1;
            state.filter = {
                name: '',
                region: '',
            };
            state.toggledInfo = false;
        },
        setDetailedCountry: (state: ICountriesState, action: PayloadAction<string>) => {
            state.detailed = true;
            state.countries = [] as DetailedCountries;
            state.exactName = action.payload;
            state.page = 1;
            state.filter = {
                name: '',
                region: '',
            };
            state.toggledInfo = false;
        },
        setNextPage: (state: ICountriesState) => {
            state.page += 1;
        },
        setRegion: (state: ICountriesState, action: PayloadAction<Region>) => {
            state.page = 1;
            state.filter.region = action.payload;
            state.countries = filterCountries(state);

        },
        setSearch: (state: ICountriesState, action: PayloadAction<string>) => {
            state.page = 1;
            state.filter.name = action.payload;
            state.countries = filterCountries(state);
        },
        setToggledInfo: (state: ICountriesState) => {
            state.toggledInfo = !state.toggledInfo;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCountries.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(
                fetchCountries.fulfilled,
                (state, {payload}) => {
                    if (state.detailed) {
                        state.countries = payload as DetailedCountries;
                    } else {
                        state.allCountries = payload;
                        state.countries = [...state.allCountries] as Countries;
                    }
                    state.status = 'idle';
                }
            )
            .addCase(fetchCountries.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload || action.error;
            });
    },
});

function URLBuilder(state: ICountriesState): string {
    let url = '';
    if (!state.detailed) {
        url += 'all';
        url += `?fields=${keysOfCountry.join(';')}`;
    } else {
        url += `name/${state.exactName}?fullText=true`;
        url += `&fields=${keysOfDetailedCountry.join(';')}`;
    }
    return url;
}

function filterCountries(state: ICountriesState): Countries {
    if (state.filter.name === '') {
        state.countries = [...state.allCountries];
    } else {
        state.countries = state.allCountries
            .filter(country => country.name.toLowerCase().includes(state.filter.name)) as Countries;
    }
    if (state.filter.region) {
        state.countries = state.countries
            .filter(country => country.region.toLowerCase() === state.filter.region) as Countries;
    }
    return state.countries;
}

export const {
    setAllCountries,
    setDetailedCountry,
    setSearch,
    setRegion,
    setNextPage,
    setToggledInfo,
} = countriesSlice.actions;

export const selectToggledInfo = (state: RootState) => state.countries.toggledInfo;
export const selectStatus = (state: RootState) => state.countries.status;
export const selectError = (state: RootState) => state.countries.error;
export const selectCountries = (state: RootState) => state.countries.countries;
export const selectPage = (state: RootState) => state.countries.page;
export const PAGE_LIMIT = 24;
export const selectAllCountriesLength = (state: RootState) => state.countries.allCountries.length;
export const selectCountriesLength = (state: RootState) => state.countries.countries.length;

export default countriesSlice.reducer;