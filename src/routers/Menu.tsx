import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import routes from './routers';

class Menu extends PureComponent {
  render() {
    return (
      <div className="menu">
        {routes.map((route, index) => {
          return (
            <p key={index}>
              <Link to={route.to}>{route.text}</Link>
            </p>
          );
        })}
      </div>
    );
  }
}

export default Menu;
