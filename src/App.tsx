import React from 'react';
import Header from "./components/Header";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import styled, {createGlobalStyle, ThemeProvider} from 'styled-components';
import {theme} from "./styles/theme";
import {useAppSelector} from "./app/hooks";
import {selectTheme} from "./features/theme/themeSlice";
import {fontOptions as fo} from "./styles/vars";
import Main from "./components/Main";
import Detailed from "./components/Detailed";

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: ${fo.FONT_FAMILY};
    font-weight: ${fo.REGULAR_WEIGHT};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const StyledApp = styled.div`
  color: ${props => props.theme.text};
  background-color: ${props => props.theme.background};
  min-height: 100vh;
`;

function App() {
    const themeMode = useAppSelector(selectTheme);
    return (
        <ThemeProvider theme={(themeMode === 'light' || themeMode === 'dark') ? theme[themeMode] : ''}>
            <GlobalStyles/>
            <BrowserRouter>
                <StyledApp>
                    <Header/>
                    <Switch>
                        <Route exact path='/'>
                            <Main />
                        </Route>
                        <Route path='/api'>
                            <p>Hello there</p>
                        </Route>
                        <Route path={'/:name'} component={Detailed} />
                    </Switch>
                </StyledApp>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;