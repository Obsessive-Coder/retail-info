import React from 'react';
import { createBrowserHistory } from 'history';
import { Route, Router, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BusinessDetails, SiteHeader, MapPage,
} from './components';

import './index.css';

function App() {
  return (
    <Router history={createBrowserHistory()}>
      <SiteHeader />
      <Switch>
        <Route
          exact
          path="/retail-info/businesses/:menuId"
          render={props => <BusinessDetails {...props} />}
        />

        <Route path="/" render={props => <MapPage {...props} />} />
      </Switch>
    </Router>
  );
}

export default App;
