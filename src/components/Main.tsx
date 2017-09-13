import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import * as actions from '../actions/'
import { storeState } from '../reducers/reducer'
import TabCarousel from '../components/Tabs'
import Aside from '../components/Aside'
import { TabData } from '../types/common'
import '../style/index.scss'

export interface Props { 
  name?: string, 
  tabs: Array<TabData>,
  history:any
}

export default class App extends React.Component<Props, { showAside: boolean }>{
  constructor(args: any) {
    super(args);
    this.state = {
      showAside: false
    }
    this.changeAside = this.changeAside.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
  }
  changeAside(ev: any) {
    console.log(ev);

    this.setState({
      showAside: !this.state.showAside
    })
  }
  onTouchStart() {
    console.log('touchstart');

  }
  render() {
    return (
      <div className="body-wrap" >
        <Aside isShow={this.state.showAside} changeStatus={this.changeAside} delay={0.08}  onTouchStart={this.onTouchStart} />
        <header>
          <div className="header-top">
            <div className="menu" onClick={this.changeAside}><i className="iconfont icon-category"></i></div>
            <div className="column-type">
              <span className="link">推荐</span>
              <span className="link active">板块</span>
            </div>
            <div className="hot"><i className="iconfont icon-hot"></i></div>
            <div className="search"><i className="iconfont icon-search"></i></div>
          </div>
        </header>
        <TabCarousel data={this.props.tabs} onClick={this.onTouchStart} isAsideShow={this.state.showAside} history={this.props.history}/>
      </div>
    )
  }
}
