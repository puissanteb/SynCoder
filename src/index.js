import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { createTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'

const myTheme = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#202020',
        },
    },
})

ReactDOM.render(
    <ThemeProvider theme={myTheme}>
        <App />
    </ThemeProvider>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
