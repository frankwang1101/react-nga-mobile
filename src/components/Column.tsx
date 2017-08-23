import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import * as actions from '../actions/'
import { Promise } from 'es6-promise';
import { storeState } from '../reducers/reducer'
import TabCarousel from '../components/Tabs'
import Aside from '../components/Aside'
import { TabData } from '../types/common'
import { easeInOout } from '../utils/Tween'
import * as Utils from '../utils/Utils'

interface Props {
  [property: string]: any,
  posts: Array<any>,
  loadPost: any,
  close?:any
}
interface State {
  isFetch: boolean,
  startLoading: boolean,
  loaded: boolean,
  loadY:number,
  showOpt?:boolean,
  page: number  
}

export default class Column extends React.Component<Props, State>{
  [method: string]: any;
  constructor(args: any) {
    super(args);
    this.state = {
      isFetch: null,
      startLoading: false,
      loaded: false,
      loadY:-1,
      page:1
    };
    this.elePos = {};
    this.loadProcess = false;
    this.moves = [];
    [
      'onTouchStart',
      'onTouchMove',
      'onTouchEnd',
      'refresh',
      'load',
      'cancelLoad',
      'add',
      'showOpt',
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
    console.log(nextProps)
  }
  onTouchStart(ev: any) {
    // this.elePos.x = ev.touches[0].clientX;
    // this.elePos.px = ev.touches[0].clientX;
    let rect = document.documentElement.getBoundingClientRect();
    this.scrollTop = rect.top;
    if (!this.loadProcess && rect.top === 0) {
      this.elePos.y = ev.touches[0].clientY;
      this.elePos.py = ev.touches[0].clientY;
      this.moves = [];
      this.start = true;
      this.loadProcess = true;
    }

  }
  onTouchMove(ev: any) {
    let cy = ev.touches[0].clientY;
    let dy = cy - this.elePos.py;
    this.elePos.y = cy;
    if(this.loadProcess){
      ev.stopPropagation();
      ev.preventDefault();
      
      if(this.start && dy < 0){
        this.loadProcess = false;
        return;
      }else{
        document.body.style.overflow = 'hidden'
        this.start = false
      }
      if(dy > 80) dy = 80;
      this.moves.push({loadY:dy});
      this.requestSetState();
      
    }else{
      const rect = document.documentElement.getBoundingClientRect();
      const dt = rect.top - this.scrollTop;
      this.scrollTop = rect.top;
      this.showOpt(dt < 0);
    }
    
  }
  onTouchEnd(ev: any) {
    document.body.style.overflow = 'auto';
    if(this.loadProcess){
      if(this.elePos.y - this.elePos.py > 80){
        this.load();
      }else{
        this.cancelLoad();
      }
      this.loadProcess = false;
    }
  }
  showOpt(show:boolean){
    if(show !== this.state.showOpt){
        this.setState(Object.assign(this.state,{showOpt:show}));
    }
  }
  refresh(){
    this.setState({
      ...this.state,
      page:1
    })
    this.load(1);
  }
  load(page?:any){
    let info: any = {};
    info.id = this.props.match.params.id;
    info.page = page || this.state.page || 1;
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
      if(y <= 5){
        this.setState({
          loadY:-1
        })
        return;
      }
      if(start < during) requestAnimationFrame(run);
    }
    run();
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
            <div className="back" onClick={this.props.close}>{'<-'}</div>
            <div className="column-title active link">网事杂谈</div>
            <div className="collect"></div>
            <div className="operate"></div>
          </div>
        </header>
        {
          Utils.ctrlLoad({loadY:this.state.loadY})
        }
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
            {Utils.renderPost(this.props.posts || [])}
          </ul>
        </article>
        <div className="operate-area" style={{visibility:this.state.showOpt?'hidden':'visible'}}>
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

