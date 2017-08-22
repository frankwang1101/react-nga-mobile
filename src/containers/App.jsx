import React from 'react'
import { connect } from 'react-redux'
import '../style/index.less'

class App extends React.Component {
  constructor(args) {
    super(args);
  }
  
  render() {
    return (
      <div className="body-wrap">
        <header>
          <div className="header-top">
            <div className="menu"></div>
            <div className="column-type">
              <span>推荐</span>
              <span>板块</span>
            </div>
            <div className="search"></div>
          </div>
          <div className="title-tab"></div>
        </header>
        <article className="content">
          <div className="column-item">
            <img src="" alt="" />
            <span></span>
          </div>
          <div className="column-item">
            <img src="" alt="" />
            <span></span>
          </div>
          <div className="column-item">
            <img src="" alt="" />
            <span></span>
          </div>
        </article>
      </div>
    )
  }
}

const stateToProps = (state) => {
  return {};
}

const dispatchToProps = (dispatch) => {
  return {}
}

export default connect(stateToProps, dispatchToProps)(App);
