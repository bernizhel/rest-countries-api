import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";

interface ThemeState {
    mode: 'light' | 'dark'
}

const initialState: ThemeState = {
    mode: 'light',
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggle: (state) => {
            if (state.mode === 'light') {
                state.mode = 'dark';
            } else {
                state.mode = 'light';
            }
        },
    },
    extraReducers: (builder) => {
        builder.addDefaultCase((state, action) => {
            console.warn(state, action)
        });
    }
});

export const {toggle} = themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme.mode;

export default themeSlice.reducer;