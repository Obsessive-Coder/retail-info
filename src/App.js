import React from 'react';
import { createBrowserHistory } from 'history';
import { Route, Router, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BusinessList, BusinessDetails } from './components';

import './index.css';

function App() {
  return (
    <Router history={createBrowserHistory()}>
      <Switch>
        <Route
          exact
          path="/businesses/:menuId"
          render={props => <BusinessDetails {...props} />}
        />
        <Route exact path="/businesses" render={props => <BusinessList {...props} />} />
        <Route path="/" render={props => <BusinessList {...props} />} />
      </Switch>
    </Router>
  );
}

export default App;
