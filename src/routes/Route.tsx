import * as React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Main from '../containers/App'
import Column from '../containers/Column'
import Page from '../components/Page';

class MockComposite extends React.Component<any, any> {
  [method: string]: any
  constructor(args: any) {
    super(args);
    this.state = {
      maps: {},
      keyArr: [this.props.activeKey],
      styleArr: {},
      canScroll: true,
      process: 0
    };
    [
      'onTouchStart',
      'onTouchMove',
      'onTouchEnd',
      'close',
    ].forEach(m => { this[m] = this[m].bind(this) });
    this.rect = document.documentElement.getBoundingClientRect();
    this.elePos = {};
    this.pageMove = false;
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
  close(level: number) {
    if (this.state.keyArr.length > 1) {
      this.state.keyArr.pop();
      this.setState({
        ...this.state,
      });
    }
  }
  onTouchStart(ev: any) {
    /**如果是在左右边缘(15%)则进行判定进入页面切换模式 */
    if(this.state.keyArr.length < 2){
      return;
    }
    if (ev.touches[0].clientX < this.rect.width || ev.touches[0].clientX < this.rect.width) {
      this.elePos.x = ev.touches[0].clientX;
      this.elePos.px = ev.touches[0].clientX;
      this.elePos.py = ev.touches[0].clientY;
      this.pageMove = true;
      this.firstMove = true;//标志位，判断是否是第一次移动
    }
  }
  onTouchMove(ev: any) {
    if (this.pageMove) {
      //需要在第一次move的时候判断是x轴移动还是y轴移动
      let nx = ev.touches[0].clientX,
        ny = ev.touches[0].clientY,
        dx = nx - this.elePos.x,
        dy = ny - this.elePos.py;
      if (this.firstMove) {
        if (Math.abs(dx) > Math.abs(dy)) {
          this.setState({
            ...this.state,
            canScroll: false
          })
        } else {
          this.pageMove = false;
          this.firstMove = false;
        }
      }
      const percent = dy * 100 / this.rect.width;
      requestAnimationFrame(() => {
        const map = this.state.styleArr;
        map[this.state.keyArr.length - 1] = { transform:`translateX(-${this.state.process + percent}%)` };
        map[this.state.keyArr.length - 2] = { opacity: 0.7 * Math.abs(this.state.process + percent) };
        this.setState({
          ...this.state,
          process: this.state.process + percent,
          stylaArr:map
        })
      });
      this.elePos.x = nx;
    }
    this.firstMove = false;
  }
  onTouchEnd(ev: any) {
    if (this.pageMove) {
      this.pageMove = false;
      this.firstMove = false;
      this.setState({
        ...this.state,
        canScroll: true,
        process:0
      })
    }
  }
  render() {
    return (
      <div className={`combine ${this.state.canScroll ? '' : 'scroll-forbid'}`} onTouchStart={this.onTouchStart} onTouchMove={this.onTouchMove} onTouchEnd={this.onTouchEnd}>
        {
          this.state.keyArr.map((key: string, idx: number) => {
            return <div className={`level level-${idx} ${this.props.activeKey === key ? '' : 'page-mask'}`} style={this.state.styleArr[key]}>
              {React.cloneElement(this.state.maps[key], { ...this.props, close: this.close })}
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