import React from 'react';
import { Route} from 'react-router-dom';

import App from '../screens/app';
import Photos from '../screens/photos';
import Start from '../screens/start';
import About from '../screens/about';

export default () => (
  <App>
    <Route exact path="/" component={Photos} />
  </App>
);
