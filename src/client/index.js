import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk'
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import Index from '../routes';
import Screen from '../screens/app'
import Photos from '../screens/photos'
import reducer from '../redux/reducers.js'

const store = createStore(reducer, applyMiddleware(thunk));

class Root extends React.Component {
    render() {
      return (
          <Provider store={store}>
          <Router>
            <Index/>
        </Router>
        </Provider>);
    }
  }
ReactDOM.render(<Root />, document.getElementById('root'));