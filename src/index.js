import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import App1 from './containers/App'
import * as reducers from './reducers/reducer'

let store = createStore(combineReducers(reducers));

render(<Provider store={store}><App1 /></Provider>, document.getElementById('root'));

if(module.hot){
  module.hot.accept();
}