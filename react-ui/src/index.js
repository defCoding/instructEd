import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.min.css';

const [darkState, setDarkState] = useState(false);
const paletteType = darkState ? "dark" : "light";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ADEFD1',
    },
    secondary: {
      main: '#394C5E',
    },
    type: paletteType,
  },
});

function setDarkMode() {

}


ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App darkMode={theme.palette.type} setDarkMode={setDarkMode} />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
