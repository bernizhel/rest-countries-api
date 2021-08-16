import Header from "./components/Header";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import styled, {createGlobalStyle, ThemeProvider} from 'styled-components';
import {theme} from "./styles/theme";
import {useAppSelector} from "./app/hooks";
import {selectTheme} from "./features/theme/themeSlice";
import {fontOptions as fo} from "./styles/vars";
import Main from "./components/Main";
import ErrorBoundary from "./components/Error/ErrorBoundary";
import DetailedCountry from "./features/countries/DetailedCountry";

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

  body {
    &::-webkit-scrollbar {
      width: 10px;
    }

    &::-webkit-scrollbar-track {
      background-color: ${props => props.theme === 'light'
              ? theme.light.border : theme.dark.border};
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${props => props.theme === 'light'
              ? '#ccc' : theme.dark.elementBackground};
    }

    &::-webkit-scrollbar-corner {
      background-color: #999;
    }
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
            <GlobalStyles theme={themeMode}/>
            <BrowserRouter>
                <StyledApp>
                    <Header/>
                    <Switch>
                        <Route exact path='/'>
                            <ErrorBoundary>
                                <Main/>
                            </ErrorBoundary>
                        </Route>
                        <Route path={'/:name'}>
                            <ErrorBoundary>
                                <DetailedCountry/>
                            </ErrorBoundary>
                        </Route>
                    </Switch>
                </StyledApp>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
