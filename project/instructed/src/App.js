import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/pages/LoginAndRegistration/Login'
import Registration from './components/pages/LoginAndRegistration/Registration';
import { makeStyles } from '@material-ui/core';
import './App.css'

const useStyle = makeStyles(theme => ({
  background: '#D7D9D7'
}))

function App() {
  const classes = useStyle();
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/login" exact component={Login} />
          <Route path='/registration' component={Registration} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
