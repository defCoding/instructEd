import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/pages/LoginAndRegistration/Login'
import Registration from './components/pages/LoginAndRegistration/Registration';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2E4057'
    },
    secondary: {
      main:'#ffffff'
    }
  }
});

function App() {
  return (
    <>
      <MuiThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/login" exact component={Login} />
            <Route path='/registration' component={Registration} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    </>
  );
}

export default App;
