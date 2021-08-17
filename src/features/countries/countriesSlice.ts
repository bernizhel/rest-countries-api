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
    detailedList: string[];
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
    detailedList: [],
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
            state.detailedList = [];
            state.neighbors = [];
            state.countries = [] as DetailedCountries;
            state.neighborsStatus = 'idle';
            state.countries = [] as Countries;
            state.page = 1;
            state.toggledInfo = false;
        },
        setDetailedCountry: (state: ICountriesState) => {
            state.error = undefined;
            state.detailed = true;
            state.neighbors = [];
            state.neighborsStatus = 'idle';
            state.toggledInfo = false;
        },
        setNextCountry: (state: ICountriesState, action: PayloadAction<string>) => {
            state.detailed = true;
            state.countries = [] as DetailedCountries;
            state.detailedList.push(action.payload);
        },
        setPreviousCountry: (state: ICountriesState) => {
            state.detailedList.pop();
            if (!state.detailedList) {
                state.detailed = false;
            }
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
        setPreviousFilter: (state: ICountriesState) => {
            state.countries = filterCountries(state);
        },
        setNullFilter: (state: ICountriesState) => {
            state.filter = {
                name: '',
                region: '',
            };
        },
        setToggledInfo: (state: ICountriesState) => {
            state.toggledInfo = !state.toggledInfo;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCountries.pending, (state) => {
                state.status = 'loading';
                if (state.detailed) {
                    state.neighborsStatus = 'loading';
                }
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
        let name: string;
        if (state.detailedList) {
            name = state.detailedList[state.detailedList.length - 1];
        } else {
            throw Error('No name for details show.')
        }
        url += `name/${name}?fullText=true`;
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
    setNextCountry,
    setPreviousCountry,
    setPreviousFilter,
    setNullFilter,
} = countriesSlice.actions;

export const selectToggledInfo = (state: RootState) => state.countries.toggledInfo;
export const selectNeighbors = (state: RootState) => state.countries.neighbors;
export const selectNeighborsStatus = (state: RootState) => state.countries.neighborsStatus;
export const selectStatus = (state: RootState) => state.countries.status;
export const selectError = (state: RootState) => state.countries.error;
export const selectCountries = (state: RootState) => state.countries.countries;
export const selectDetailedList = (state: RootState) => state.countries.detailedList;
export const selectAllCountries = (state: RootState) => state.countries.allCountries;
export const selectPage = (state: RootState) => state.countries.page;
export const selectDetailed = (state: RootState) => state.countries.detailed;
export const selectFilterName = (state: RootState) => state.countries.filter.name;
const MOBILE_LIMIT = 12;
const DESKTOP_LIMIT = 32;
export const PAGE_LIMIT = (function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor);
    return check ? MOBILE_LIMIT : DESKTOP_LIMIT;
})();
export const selectAllCountriesLength = (state: RootState) => state.countries.allCountries.length;
export const selectCountriesLength = (state: RootState) => state.countries.countries.length;

export default countriesSlice.reducer;