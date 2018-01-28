import 'normalize.css';
import './assets/styles/main.scss';
import React from 'react';
import ReactDOM from 'react-dom';
// import App from './app/components/App/App.jsx';
import Map from './Map';
import NotFound from './app/components/NotFound/NotFound.jsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/" component={Map}/>
      <Route component={NotFound}/>
    </Switch>
  </Router>,
  document.querySelector('#app')
);