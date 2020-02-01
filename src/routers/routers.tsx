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
    path: '/home',
    to: '/home',
    component: Loadable({
      loader: () => import('../controller/home'),
      loading: Loading
    })
  },
  {
    text: '拖拽',
    path: '/drag',
    to: '/drag',
    component: Loadable({
      loader: () => import('../controller/drag'),
      loading: Loading
    })
  },
];

export default routers;
