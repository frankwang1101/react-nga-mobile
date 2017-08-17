import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import * as actions from '../actions/'
import { Promise } from 'es6-promise';
import { storeState } from '../reducers/reducer'
import TabCarousel from '../components/Tabs'
import Aside from '../components/Aside'
import { TabData } from '../types/common'
import { easeInOout } from '../utils/Tween'

interface Props {
  [property: string]: any,
  posts: Array<any>,
  page: number,
  loadPost: any
}
interface State {
  isFetch: boolean,
  startLoading: boolean,
  loaded: boolean,
  loadY:number
}

export default class Column extends React.Component<Props, State>{
  [method: string]: any;
  constructor(args: any) {
    super(args);
    this.state = {
      isFetch: null,
      startLoading: false,
      loaded: false,
      loadY:-1
    };
    this.elePos = {};
    this.loadProcess = false;
    this.moves = [];
    [
      'back',
      'onTouchStart',
      'onTouchMove',
      'onTouchEnd',
      'refresh',
      'load',
      'cancelLoad',
      'add',
    ].forEach(m => { this[m] = this[m].bind(this) });
  }
  componentWillMount() {

  }
  componentDidMount() {
    document.addEventListener('touchend', this.onTouchEnd);
    if (this.state.loaded !== true) {
      this.load();
    }
  }
  componentWillReceiveProps(nextProps: Props) {

  }
  back() {
    this.props.history.go(-1);
  }
  onTouchStart(ev: any) {
    // this.elePos.x = ev.touches[0].clientX;
    // this.elePos.px = ev.touches[0].clientX;
    if (!this.loadProcess) {
      this.elePos.y = ev.touches[0].clientY;
      this.elePos.py = ev.touches[0].clientY;
      this.moves = [];
      this.start = true;
      this.loadProcess = true;
    }

  }
  onTouchMove(ev: any) {
    if(this.loadProcess){
      let dy = ev.touches[0].clientY - this.elePos.y;
      if(dy > 60) dy = 60;
      this.moves.push({loadY:dy});
      this.requestSetState();
      this.elePos.y = ev.touches[0].clientY;
    }
  }
  onTouchEnd(ev: any) {
    if(this.loadProcess){
      if(ev.touches[0].clientY - this.elePos.y > 60){
        this.load();
      }else{
        this.cancelLoad();
      }
      this.loadProcess = false;
    }
  }
  refresh(){
    this.load(1);
  }
  load(page?:any){
    let info: any = {};
    info.id = this.props.match.params.id;
    info.page = page || this.props.match.params.page || 1;
    this.props.loadPost(info).then((flag: any) => {
      if (flag) {
        this.setState({
          isFetch: true,
          loadY:-1
        })
      }
    });
  }
  cancelLoad(){
    let y = this.state.loadY,during = 20, start=0;
    let run = () => {
      start++;
      y = easeInOout(start,y,5-y,20);
      this.setState(Object.assign(this.state,{loadY:y}));
      if(start < during) requestAnimationFrame(run);
    }
  }
  add(){
    console.log('add')
  }
  requestSetState() {
    if (this.moves.length > 0) {
      let nowMove = this.moves.shift();;
      this.setState(Object.assign(this.state, nowMove));
      if (this.moves.length > 0) {
        this.rafId = requestAnimationFrame(this.requestSetState);
      }
    }
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
        <article className="column-content" onTouchStart={this.onTouchStart} onTouchMove={this.onTouchMove}>
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
        <div className="operate-area">
          <div className="btn btn-refresh" onClick={this.load}>
            <i className="iconfont icon-refresh"></i>
          </div>
          <div className="btn btn-add">
            <i className="iconfont icon-add" onClick={this.add}></i>
          </div>
        </div>
      </div>
    )
  }
}

