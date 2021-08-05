import React from 'react';
import {Counter} from './features/counter/Counter';
import Header from "./components/Header";
import styled, {createGlobalStyle, ThemeProvider} from 'styled-components';
import {theme} from "./styles/theme";
import {useAppSelector} from "./app/hooks";
import {selectTheme} from "./features/theme/themeSlice";
import {fontOptions as fo} from "./styles/vars";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, ${fo.FONT_FAMILY};
    font-weight: ${fo.REGULAR_WEIGHT};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const StyledApp = styled.div`
  color: ${props => props.theme.text};
  background-color: ${props => props.theme.background};
  min-height: 100vh;
`

function App() {
    const themeMode = useAppSelector(selectTheme);
    return (
        <ThemeProvider theme={theme[themeMode]}>
            <GlobalStyles/>
            <StyledApp>
                <Header/>
                <Counter/>
            </StyledApp>
        </ThemeProvider>
    );
}

export default App;
