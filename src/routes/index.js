import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../screens/app';
import Photos from '../screens/photos';
import Start from '../screens/start';
import About from '../screens/about';

export default () => (
  <Route component={ App }>
    <IndexRoute component={ Photos } />
    <Route component={ About } path="/about/" />
  </Route>
);
