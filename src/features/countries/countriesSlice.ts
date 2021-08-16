import {createAsyncThunk, createSlice, PayloadAction, SerializedError} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {Countries, DetailedCountries, INeighbor, keysOfCountry, keysOfDetailedCountry,} from "./countriesTypes";
import countriesAPI from "./countriesAPI";
import {AxiosResponse} from "axios";

export type Region = '' | 'europe' | 'africa' | 'americas' | 'asia' | 'oceania';

type Status = 'idle' | 'loading' | 'rejected';

export interface ICountriesState {
    status: Status;
    error: SerializedError | Error | undefined;
    detailed: boolean;
    exactName: string;
    neighbors: string[];
    neighborsStatus: Status;
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
    error: undefined,
    detailed: false,
    exactName: '',
    neighbors: [],
    neighborsStatus: 'idle',
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

export const fetchNeighbors = createAsyncThunk<string[],
    string[],
    { rejectValue: Error, state: RootState }>(
    'countries/fetchNeighbors',
    async (borderCodes) => {
        const borderNames: string[] = [];
        for (const code of borderCodes) {
            const url: string = `alpha/${code}?fields=name`;
            await countriesAPI.get(url)
                .then((res: AxiosResponse) => res.data as INeighbor)
                .then(array => array?.name && borderNames.push(array.name))
                .catch((e: Error) => {
                    throw Error(e.message);
                });
        }
        return borderNames;
    }
);

const countriesSlice = createSlice({
    name: 'countries',
    initialState,
    reducers: {
        setAllCountries: (state: ICountriesState) => {
            state.error = undefined;
            state.detailed = false;
            state.exactName = '';
            state.neighbors = [];
            state.neighborsStatus = 'idle';
            state.countries = [] as Countries;
            state.page = 1;
            state.filter = {
                name: '',
                region: '',
            };
            state.toggledInfo = false;
        },
        setDetailedCountry: (state: ICountriesState, action: PayloadAction<string>) => {
            state.error = undefined;
            state.detailed = true;
            state.countries = [] as DetailedCountries;
            state.exactName = action.payload;
            state.neighbors = [];
            state.neighborsStatus = 'idle';
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
            })
            .addCase(fetchNeighbors.pending, (state) => {
                state.neighborsStatus = 'loading';
            })
            .addCase(fetchNeighbors.fulfilled, (state, {payload}) => {
                if (state.detailed) {
                    state.neighbors = payload;
                } else {
                    state.neighbors = [];
                }
                state.neighborsStatus = 'idle';
            })
            .addCase(fetchNeighbors.rejected, (state, action) => {
                state.error = action.payload || action.error;
                state.neighborsStatus = 'rejected';
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
export const selectNeighbors = (state: RootState) => state.countries.neighbors;
export const selectNeighborsStatus = (state: RootState) => state.countries.neighborsStatus;
export const selectStatus = (state: RootState) => state.countries.status;
export const selectError = (state: RootState) => state.countries.error;
export const selectCountries = (state: RootState) => state.countries.countries;
export const selectPage = (state: RootState) => state.countries.page;
export const PAGE_LIMIT = (function detectMob() {
    return ((window.innerWidth <= 800) && (window.innerHeight <= 1200)) ? 12 : 24;
})();
export const selectAllCountriesLength = (state: RootState) => state.countries.allCountries.length;
export const selectCountriesLength = (state: RootState) => state.countries.countries.length;

export default countriesSlice.reducer;