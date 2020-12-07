import React from 'react';
import { BrowserRouter as Router, Switch, Route, useEffect } from 'react-router-dom';
import Login from './components/LoginAndRegistration/Login'
import Registration from './components/LoginAndRegistration/Registration';
import ForgotPassword from './components/LoginAndRegistration/ForgotPassword';
import ResetPassword from './components/LoginAndRegistration/ResetPassword';
import DuoLogin from './components/LoginAndRegistration/DuoLogin';
import Dashboard from './components/Dashboard/Dashboard';
import LandingPage from './components/LoginAndRegistration/LandingPage/LandingPage';
import useLocalStorage from './useLocalStorage';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

function App() {
  const [darkState, setDarkState] = useLocalStorage('dark', false);
  const paletteType = darkState ? "dark" : "light";
  const mainPrimaryColor = darkState ? '#7abda7' : '#ADEFD1';
  const mainSecondaryColor = darkState ? '#091525' : '#394C5E';

  

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: mainPrimaryColor,
      },
      secondary: {
        main: mainSecondaryColor,
      },
      type: paletteType,
    },
  });

  const handleThemeChange = () => {
    setDarkState(!darkState);
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/" exact component={LandingPage} />
            <Route path="/login" exact component={Login} />
            <Route path='/registration' component={Registration} />
            <Route path='/forgotpassword' component={ForgotPassword} />
            <Route path='/resetpassword/:token' component={ResetPassword} />
            <Route 
              path='/dashboard' 
              render={() => (<Dashboard darkState={darkState} handleThemeChange={handleThemeChange} />)}/>
            <Route path='/duologin' component={DuoLogin} />
          </Switch>
        </Router>
    </ThemeProvider>
  );
}

export default App;
