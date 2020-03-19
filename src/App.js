import React from 'react';
import { createBrowserHistory } from 'history';
import { Route, Router, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BusinessList} from './components';
import './index.css';

function App() {
  return (
    <Router history={createBrowserHistory()}>
      <Switch>
        <Route path="/">
          <BusinessList />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
