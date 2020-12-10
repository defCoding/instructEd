import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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
  const greenColor = darkState ? '#465F72' : '#ADEFD1';
  const blueColor = darkState ? '#0F151A' : '#394C5E';
  const backgroundColor = darkState ? '#2F3E4C' : '#F2F4F7';
  
  console.log(darkState);

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: greenColor,
      },
      secondary: {
        main: blueColor,
      },
      type: paletteType,
      background: {
        paper: backgroundColor,
      }
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
            <Route path="/index" exact component={LandingPage} />
            <Route path="/home" exact component={LandingPage} />
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
