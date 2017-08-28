import * as React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Main from '../containers/App'
import Column from '../containers/Column'
import Page from '../components/Page';
import PageCtrl from '../components/PageCtrl'
import PostPage from '../containers/PostPage'

const pages:Array<string> = ['column','post'];

export default function () {
  return (
    <Router>
      <Switch>
        <Route path="/:type?/:id?" children={({ match, ...rest }) => {
          let activeKey = 'main';
          if (~pages.indexOf(match.params.type)) {
            activeKey = match.params.type
          }
          return (<PageCtrl match={match} {...rest} activeKey={activeKey}>
            <Main data-path="main"></Main>
            <Column data-path="column"></Column>
            <PostPage data-path="post"></PostPage>
          </PageCtrl>)
        }} />

      </Switch>
    </Router>
  )
} 