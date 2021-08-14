import Header from "./components/Header";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import styled, {createGlobalStyle, ThemeProvider} from 'styled-components';
import {theme} from "./styles/theme";
import {useAppDispatch, useAppSelector} from "./app/hooks";
import {selectTheme} from "./features/theme/themeSlice";
import {fontOptions as fo} from "./styles/vars";
import Main from "./components/Main";
import Detailed from "./components/Detailed";
import ErrorBoundary from "./Error/ErrorBoundary";
import {setNextPage} from "./features/countries/countriesSlice";

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
      width: 0.5em;
    }

    &::-webkit-scrollbar-track {
      background-color: ${props => props.theme === 'light'
              ? theme.light.border : theme.dark.border};
      width: 20px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${props => props.theme === 'light'
              ? theme.light.elementBackground : theme.dark.elementBackground};
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
    const dispatch = useAppDispatch();
    const themeMode = useAppSelector(selectTheme);
    const handleScroll = (e: React.UIEvent<HTMLElement>): void => {
        console.log({
            event: e,
            target: e.target,
            currentTarget: e.currentTarget,
            scrollTop: e.currentTarget.scrollTop,
        });
    };

    return (
        <ThemeProvider theme={(themeMode === 'light' || themeMode === 'dark') ? theme[themeMode] : ''}>
            <GlobalStyles theme={themeMode}/>
            <BrowserRouter>
                <StyledApp>
                    <Header/>
                    <Switch>
                        <Route exact path='/'>
                            <ErrorBoundary>
                                <Main onScroll={handleScroll}/>
                            </ErrorBoundary>
                        </Route>
                        <ErrorBoundary>
                            <Route path={'/:name'} component={Detailed}/>
                        </ErrorBoundary>
                    </Switch>
                </StyledApp>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
