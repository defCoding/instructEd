import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './components/pages/Login'
import Registration from './components/pages/Registration';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path='/Registration' component={Registration} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
