import {createAsyncThunk, createSlice, PayloadAction, SerializedError} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {
    Countries,
    DetailedCountries,
    keysOfCountry,
    keysOfDetailedCountry
} from "./countriesTypes";
import countriesAPI from "./countriesAPI";
import {AxiosResponse} from "axios";

type Region = '' | 'europe' | 'africa' | 'americas' | 'asia' | 'oceania';
type Status = 'idle' | 'loading' | 'rejected';

interface CountriesState {
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
}

const initialState: CountriesState = {
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
}

export const fetchCountries = createAsyncThunk<Countries | DetailedCountries,
    undefined,
    { rejectValue: Error }>(
    'countries/fetchCountries',
    async (_, thunkAPI) => {
        const state: CountriesState = thunkAPI.getState() as CountriesState;
        const builtURL: string = URLBuilder(state);
        const data = await countriesAPI.get(builtURL)
            .then((res: AxiosResponse) => res.data)
            .catch((e: Error) => thunkAPI.rejectWithValue(e));
        return state.detailed ? data as DetailedCountries : data as Countries;
    }
);

export const fetchNeighbor = async (code: string) => {
    const url: string = `alpha/${code}?fields=name`;
    return await countriesAPI.get(url)
        .then((res: AxiosResponse) => res.data)
        .catch((e: Error) => {
            console.log(e)
        });
}

const countriesSlice = createSlice({
    name: 'countries',
    initialState,
    reducers: {
        setAllCountries: (state: CountriesState) => {
            state.detailed = false;
            state.countries = [] as Countries;
            state.page = 1;
            state.filter = {
                name: '',
                region: '',
            };
        },
        setDetailedCountry: (state: CountriesState, action: PayloadAction<string>) => {
            state.detailed = true;
            state.countries = [] as DetailedCountries;
            state.exactName = action.payload;
        },
        setNextPage: (state: CountriesState) => {
            state.page += 1;
        },
        setRegion: (state: CountriesState, action: PayloadAction<Region>) => {
            state.filter.region = action.payload;
            state.countries = filterCountries(state);

        },
        setSearch: (state: CountriesState, action: PayloadAction<string>) => {
            state.filter.name = action.payload;
            state.countries = filterCountries(state);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCountries.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(
                fetchCountries.fulfilled,
                (state, {payload}) => {
                    state.countries = payload;
                    state.status = 'idle';
                }
            )
            .addCase(fetchCountries.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload || action.error;
            });
    },
});

function URLBuilder(state: CountriesState): string {
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

function filterCountries(state: CountriesState) {
    if (state.filter.region) {
        state.countries = state.allCountries
            .filter(country => country.region === state.filter.region)
    }
    if (state.filter.name) {
        state.countries = state.countries
            .filter(country => country.name.includes(state.filter.name));
    }
    return state.countries;
}

export const {
    setAllCountries,
    setDetailedCountry,
    setSearch,
    setRegion,
    setNextPage,
} = countriesSlice.actions;

export const selectStatus = (state: RootState) => state.countries.status;
export const selectError = (state: RootState) => state.countries.error;
export const selectCountries = (state: RootState) => state.countries.countries;
export const selectPage = (state: RootState) => state.countries.page;
export const PAGE_LIMIT = 24;
export const selectAllCountriesLength = (state: RootState) => state.countries.allCountries.length;

export default countriesSlice.reducer;