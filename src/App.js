import React from 'react';
import { createBrowserHistory } from 'history';
import { Route, Router, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Ticker from 'react-ticker'
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

      {/* <div
        style={{ bottom: 0, left: 0, right: 0 }}
        className="position-fixed py-2 bg-darker border border-success"
      >
        <Ticker>
          {({ index }) => (
              <span className="mx-5 text-extra-light">Thank you for your continued support.</span>
          )}
      </Ticker>
      </div> */}
    </Router>
  );
}

export default App;
