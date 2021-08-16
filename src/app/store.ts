import {configureStore} from '@reduxjs/toolkit';
import themeReducer from '../features/theme/themeSlice'
import countriesReducer from "../features/countries/countriesSlice";

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        countries: countriesReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
