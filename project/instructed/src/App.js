import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Registration from "./registration";
import Login from "./login";

const PageNotFound = () => (
  <div>404</div>
)

function App() {
  return (
    <BrowserRouter>
      <div>
        <Route path="/" component={Login} />
        <Route path="/registration" component={Registration} />
      </div>
    </BrowserRouter>
  );
}

export default App;
