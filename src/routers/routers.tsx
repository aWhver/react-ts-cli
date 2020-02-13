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
  {
    text: '多异步处理',
    path: '/rxjs/combile',
    to: '/rxjs/combile',
    component: Loadable({
      loader: () => import('../controller/rxjs/combine'),
      loading: Loading
    })
  },
  {
    text: 'scan和buffer操作符',
    path: '/rxjs/scan_buffer',
    to: '/rxjs/scan_buffer',
    component: Loadable({
      loader: () => import('../controller/rxjs/scan_buffer'),
      loading: Loading
    })
  },
  {
    text: 'delay/delayWhen操作符',
    path: '/rxjs/delay',
    to: '/rxjs/delay',
    component: Loadable({
      loader: () => import('../controller/rxjs/delay'),
      loading: Loading
    })
  },
  {
    text: 'debounce操作符',
    path: '/rxjs/debounce',
    to: '/rxjs/debounce',
    component: Loadable({
      loader: () => import('../controller/rxjs/debounce'),
      loading: Loading
    })
  },
  {
    text: 'ditinct操作符(去重)',
    path: '/rxjs/distinct',
    to: '/rxjs/distinct',
    component: Loadable({
      loader: () => import('../controller/rxjs/distinct'),
      loading: Loading
    })
  },
  {
    text: 'catch相关操作符',
    path: '/rxjs/catch',
    to: '/rxjs/catch',
    component: Loadable({
      loader: () => import('../controller/rxjs/catch'),
      loading: Loading
    })
  },
  {
    text: 'react-dnd拖拽',
    path: '/hooks/table_drag',
    to: '/hooks/table_drag',
    component: Loadable({
      loader: () => import('../controller/hooks/table_drag'),
      loading: Loading
    })
  },
  {
    text: 'react-dnd拖拽--hooks',
    path: '/hooks/table_drag_hooks',
    to: '/hooks/table_drag_hooks',
    component: Loadable({
      loader: () => import('../controller/hooks/drag_hooks'),
      loading: Loading
    })
  },
];

export default routers;
