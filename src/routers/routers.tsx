import Loadable from 'react-loadable';
import React, { Fragment } from 'react';
import { NewRouteProps } from './Types';
import { LinkProps } from 'react-router-dom';

// const Home = (props: RouteProps) => {
//   return <React.Fragment>dsafsd</React.Fragment>;
// }
const Loading = (props: Loadable.LoadingComponentProps) => (
  <Fragment>{props.error ? <div>{props.error}</div> : <div>loading</div>}</Fragment>
);

const routers: (NewRouteProps & LinkProps)[] = [
  {
    text: 'home',
    path: '/rxjs/home',
    to: '/rxjs/home',
    component: Loadable({
      loader: () => import('../controller/rxjs/home'),
      loading: Loading
    })
  },
  {
    text: '拖拽',
    path: '/rxjs/drag',
    to: '/rxjs/drag',
    component: Loadable({
      loader: () => import('../controller/rxjs/drag'),
      loading: Loading
    })
  },
  {
    text: 'rxjs操作符',
    path: '/rxjs/operators',
    to: '/rxjs/operators',
    component: Loadable({
      loader: () => import('../controller/rxjs/operators'),
      loading: Loading
    })
  },
];

export default routers;
