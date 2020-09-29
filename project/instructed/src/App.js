import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/pages/LoginAndRegistration/Login'
import Registration from './components/pages/LoginAndRegistration/Registration';

function App() {
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
