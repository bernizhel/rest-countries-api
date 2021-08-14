import {render} from '@testing-library/react';
import {Provider} from "react-redux";
import {store} from "../app/store";
import App from "../App";
import {Countries, DetailedCountries} from "../features/countries/countriesTypes";
import {fetchCountries, setAllCountries} from "../features/countries/countriesSlice";

interface ICountriesState {
    loading: boolean;
    detailed: boolean;
    countries: Countries | DetailedCountries;
}

describe('Countries Tests', () => {
    let queryByTestId: Function, countriesState: ICountriesState;
    beforeEach(() => {
        const rendered = render(
            <Provider store={store}>
                <App/>
            </Provider>
        );
        queryByTestId = rendered.queryByTestId;
        countriesState = store.getState().countries;
    });

    it('+++ stores initial values', () => {
        const loader = queryByTestId('loader');
        expect(loader).toBeTruthy();
        expect(countriesState.loading).toBeTruthy();
        expect(countriesState.detailed).toBeFalsy();
        expect(countriesState.countries).toEqual([]);
    });


    it('+++ fetches all the countries after some amount of time', done => {
        const loader = queryByTestId('loader');
        expect(loader).toBeNull();
        expect(countriesState.loading).toBeFalsy();
        expect(countriesState.detailed).toBeFalsy();
        function cb() {
            expect(countriesState.countries).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        name: expect.any(String),
                        population: expect.any(Number),
                        capital: expect.any(String),
                        region: expect.any(String),
                    })
                ])
            );
            done();
        }
        store.dispatch(setAllCountries())
        store.dispatch(fetchCountries()).then(() => cb());
    })
})