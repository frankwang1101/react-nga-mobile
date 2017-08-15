import * as React from 'react'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import Main from '../containers/App'
import Column from '../containers/Column'
export default function () {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Main} />
        <Route path='/column' component={Column} />
      </Switch>
    </Router>
  )
} 