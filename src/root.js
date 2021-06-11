import React from 'react'
import { hot } from 'react-hot-loader'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { BrowserRouter, Route } from 'react-router-dom'
import {
  CssBaseline,
  createMuiTheme,
  MuiThemeProvider
} from '@material-ui/core'
import App from './app'
import { DatabaseProvider } from 'contexts/database'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      contrastText: '#fff',
      dark: '#560027',
      light: '#bc477b',
      main: '#880e4f'
    },
    secondary: {
      contrastText: '#fff',
      dark: '#78002e',
      light: '#e35083',
      main: '#ad1357'
    }
  }
})

console.log('theme', theme)

const Root = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <DatabaseProvider>
          <CssBaseline />
          <GlobalStyle />
          <BrowserRouter>
            <Route component={App} />
          </BrowserRouter>
        </DatabaseProvider>
      </ThemeProvider>
    </MuiThemeProvider>
  )
}

const GlobalStyle = createGlobalStyle`
  #root{
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
`

export default hot(module)(Root)
