import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/LoginAndRegistration/Login'
import Registration from './components/LoginAndRegistration/Registration';
import ForgotPassword from './components/LoginAndRegistration/ForgotPassword';
import ResetPassword from './components/LoginAndRegistration/ResetPassword';
import DuoLogin from './components/LoginAndRegistration/DuoLogin';
import Dashboard from './components/Dashboard/Dashboard';
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
              <Route path='/forgotpassword' component={ForgotPassword} />
              <Route path='/resetpassword/:token' component={ResetPassword} />
              <Route path='/dashboard' component={Dashboard} />
              <Route path='/duologin' component={DuoLogin} />
            </Switch>
          </Router>
      </MuiThemeProvider>
    </>
  );
}

export default App;
