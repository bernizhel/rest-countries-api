import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";

interface ThemeState {
    mode: string;
}

const initialState: ThemeState = {
    mode: localStorage.getItem('theme') ?? 'light',
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggle: (state) => {
            if (state.mode === 'light') {
                state.mode = 'dark';
            } else if (state.mode === 'dark') {
                state.mode = 'light';
            } else {
                state.mode = 'light';
            }
            localStorage.setItem('theme', state.mode)
        },
    },
});

export const {toggle} = themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme.mode;

export default themeSlice.reducer;