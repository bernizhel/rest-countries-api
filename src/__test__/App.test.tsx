import {fireEvent, render} from '@testing-library/react';
import {Provider} from 'react-redux';
import {store} from '../app/store';
import App from '../App';

describe('Theme Tests', () => {
    let getByText: Function;

    beforeEach(() => {
        const rendered = render(
            <Provider store={store}>
                <App/>
            </Provider>
        );
        getByText = rendered.getByText;
    });

    it('+++ renders the header', () => {
        expect(getByText(/where in the world?/i)).toBeInTheDocument();
        expect(getByText(/dark mode/i)).toBeInTheDocument();
    });

    it('+++ switches the theme', () => {
        const switcher = getByText(/dark mode/i)
        for (let i = 0; i < 2; i++) {
            let storageTheme = localStorage.getItem('theme') ?? 'light';
            let nextTheme = storageTheme === 'light' ? 'dark' : 'light';
            expect(store.getState().theme.mode).toBe(storageTheme);
            fireEvent.click(switcher);
            storageTheme = localStorage.getItem('theme') ?? 'light';
            expect(storageTheme).toBe(nextTheme);
            expect(store.getState().theme.mode).toBe(storageTheme);
        }
    })
});
