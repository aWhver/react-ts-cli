import React, { Component } from 'react';
import { Router } from 'react-router';
import { Switch, Route, Redirect } from 'react-router-dom';
import { createHashHistory } from 'history';
import routers from './routers';
import Menu from './Menu';
import './style.less';

const history = createHashHistory();

class AppRouter extends Component {
  render() {
    return (
      <Router history={history}>
        <Menu />
        <Switch>
          {routers.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              component={route.component}
              route={route}
            ></Route>
          ))}
          <Redirect from="/" to="/rxjs/home" />
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
