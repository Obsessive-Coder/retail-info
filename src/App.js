import React from 'react';
import { createBrowserHistory } from 'history';
import { Route, Router, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BusinessList, BusinessDetails, SiteHeader,
  MapPage, SiteFooter,
} from './components';

import './index.css';

function App() {
  return (
    <Router history={createBrowserHistory()} basename={process.env.PUBLIC_URL}>
      <SiteHeader />
      <Switch>
        <Route
          exact
          path="/retail-info/businesses/:menuId"
          render={props => <BusinessDetails {...props} />}
        />

        <Route
          exact
          path="/retail-info/map"
          render={props => <MapPage {...props} />}
        />

        <Route
          exact
          path="/retail-info/businesses"
          render={props => <BusinessList {...props} />}
        />

        <Route path="/" render={props => <BusinessList {...props} />} />
      </Switch>

      <SiteFooter />
    </Router>
  );
}

export default App;
