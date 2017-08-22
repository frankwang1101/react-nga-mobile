import * as React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Main from '../containers/App'
import Column from '../containers/Column'
const Test = (props: any) => {
  console.log(props)
  return (<div>test!</div>)
}

class MockComposite extends React.Component<any, any> {
  constructor(args: any) {
    super(args);
    this.state = {
      maps: {},
      keyArr: [this.props.activeKey]
    }
  }
  componentWillMount() {
    this.state.maps = this.props.children.reduce((prev: any, next: any) => {
      prev[next.props['data-path']] = next;
      return prev;
    }, {})
  }
  componentWillReceiveProps(nextProps: any) {
    if (nextProps.activeKey != this.props.activeKey) {
      const arr = this.state.keyArr.slice();
      if (this.state.keyArr.length > 2) {
        arr.splice(2, 1, nextProps.activeKey);
      } else {
        arr.push(nextProps.activeKey);
      }
      this.setState({
        ...this.state,
        keyArr: arr
      });
      return true;
    }
    return false;
  }
  render() {
    console.log(this.state.keyArr)
    return (
      <div className="combine">
        {
          this.state.keyArr.map((key: string,idx:number) => {
            return <div className={`level-${idx}`}>
              {React.cloneElement(this.state.maps[key], { ...this.props })}
            </div>
          })}
      </div>
    )
  }
}

export default function () {
  return (
    <Router>
      <Switch>
        <Route path="/:type?/:id?" children={({ match, ...rest }) => {
          console.log(match)
          let activeKey = 'main';
          if (match.params.type) {
            activeKey = 'column'
          }
          return (<MockComposite match={match} {...rest} activeKey={activeKey}>
            <Main data-path="main"></Main>
            <Column data-path="column"></Column>
          </MockComposite>)
        }} />

      </Switch>
    </Router>
  )
} 