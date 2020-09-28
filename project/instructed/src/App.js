import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './styles/App.css';
import Login from './components/pages/Login'
import Registration from './components/pages/Registration';

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
