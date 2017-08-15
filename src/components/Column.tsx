import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import * as actions from '../actions/'
import { storeState } from '../reducers/reducer'
import TabCarousel from '../components/Tabs'
import Aside from '../components/Aside'
import { TabData } from '../types/common'
import '../style/index.less'

interface Props { name?: string, tabs: Array<TabData> }
interface State {
  isFetch: boolean,
  startLoading: boolean
}

export default class Column extends React.Component<Props, State>{
  [method: string]: any;
  constructor(args: any) {
    super(args);
    this.state = {
      isFetch: false,
      startLoading: false
    };
    [
      'back'
    ].forEach(m => { this[m] = this[m].bind(this) });
  }
  componentWillMount() {

  }
  back() {

  }
  render() {
    return (
      <div className="body-wrap column-wrap" >
        <header>
          <div className="header-top">
            <div className="back" onClick={this.back}>{'<-'}</div>
            <div className="column-title active link">网事杂谈</div>
            <div className="collect"></div>
            <div className="operate"></div>
          </div>
        </header>
        <div className="header-bottom">
          <div className="sub-column link">置顶3</div>
          <div className="sub-column link">热门</div>
          <div className="sub-column link">精华</div>
          <div className="sub-column link">子版面</div>
        </div>
        <ul className="operate-menu">
          <li className="operate-list">提醒</li>
          <li className="operate-list">消息</li>
          <li className="operate-list">历史浏览</li>
          <li className="operate-list">搜索</li>
          <li className="operate-list">字号</li>
        </ul>
        <article className="column-content">
          <ul className="post-list">
            <li className="post-item">
              <div className="post-title">力量的化身--聊聊游戏中给你印象最深的武器</div>
              <div className="post-info">
                <span className="post-author">admin</span>
                <span className="post-stat">
                  <span className="post-time">5分钟前</span>
                  <span className="post-reply">150</span>
                </span>
              </div>
            </li>
            <li className="post-item">
              <div className="post-title">力量的化身--聊聊游戏中给你印象最深的武器</div>
              <div className="post-info">
                <span className="post-author">admin</span>
                <span className="post-stat">
                  <span className="post-time">5分钟前</span>
                  <span className="post-reply">150</span>
                </span>
              </div>
            </li>
            <li className="post-item">
              <div className="post-title">力量的化身--聊聊游戏中给你印象最深的武器</div>
              <div className="post-info">
                <span className="post-author">admin</span>
                <span className="post-stat">
                  <span className="post-time">5分钟前</span>
                  <span className="post-reply">150</span>
                </span>
              </div>
            </li>
            <li className="post-item">
              <div className="post-title">力量的化身--聊聊游戏中给你印象最深的武器</div>
              <div className="post-info">
                <span className="post-author">admin</span>
                <span className="post-stat">
                  <span className="post-time">5分钟前</span>
                  <span className="post-reply">150</span>
                </span>
              </div>
            </li>
            <li className="post-item">
              <div className="post-title">力量的化身--聊聊游戏中给你印象最深的武器</div>
              <div className="post-info">
                <span className="post-author">admin</span>
                <span className="post-stat">
                  <span className="post-time">5分钟前</span>
                  <span className="post-reply">150</span>
                </span>
              </div>
            </li>
            <li className="post-item">
              <div className="post-title">力量的化身--聊聊游戏中给你印象最深的武器</div>
              <div className="post-info">
                <span className="post-author">admin</span>
                <span className="post-stat">
                  <span className="post-time">5分钟前</span>
                  <span className="post-reply">150</span>
                </span>
              </div>
            </li>
          </ul>
        </article>
      </div>
    )
  }
}
