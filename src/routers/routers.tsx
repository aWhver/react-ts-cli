import { RouteProps } from 'react-router';
import Loadable from 'react-loadable';
import React, { Fragment } from 'react';

// const Home = (props: RouteProps) => {
//   return <React.Fragment>dsafsd</React.Fragment>;
// }
const Loading = (props: Loadable.LoadingComponentProps) => (
  <Fragment>{props.error ? <div>{props.error}</div> : <div>loading</div>}</Fragment>
);

const routers: RouteProps[] = [
  {
    path: '/home',
    component: Loadable({
      loader: () => import('../controller/home'),
      loading: Loading
    })
  },
];

export default routers;
