import * as React from 'react';
import { getCollectInfo } from '../actions/index'

export interface CollectSortProps {
  getCollectList: any,
  collectList: Array<any>
}

export default class CollectSort extends React.Component<CollectSortProps, any> {
  constructor(args: any) {
    super(args);
    this.del = this.del.bind(this);
    this.collectTouchStart = this.collectTouchStart.bind(this);
    this.collectTouchMove = this.collectTouchMove.bind(this);
    this.sort = this.sort.bind(this);
    this.execMove = this.execMove.bind(this);
    this.state = {
      position: [],//存放图标组的位置数据
      iconList: [],//存放当前图标组的信息
      targetStyle: {},//存放当前拖动元素的样式信息
      targetInfo: {}//存放当前元素的基本信息
    }
    this.targetMove = [];
  }
  start = false;//判断是否开始标志位
  move = false;//判断是否移动标志位
  targetRect: any = {};//用于计算要移动对象的位置信息
  sortTimer: any = null;//延时排序定时器
  targetMove: Array<any> = [];
  posInfo: any = {}
  componentWillMount() {
    this.props.getCollectList();
  }
  componentDidMount() {
    document.addEventListener('touchend', (ev) => {
      this.setState({
        ...this.state,
        targetStyle:{},
        targetInfo:{}
      })
      this.start = false;
    });
  }
  componentDidUpdate() {
    const list = this.props.collectList.slice();
    if (!this.state.iconList.length) {
      this.setState({
        ...this.state,
        iconList: list
      })
    }
  }
  del(id: string) {
    //删除图标
  }
  sort() {
    //遍历state中的位置信息，进行排序

  }
  collectTouchStart(ev: any, id: string) {
    if (!this.start) {
      this.start = true;
      this.targetMove = [];
      this.targetRect = ev.currentTarget.getBoundingClientRect();
      const touches = ev.touches[0];
      console.log(touches)
      this.posInfo = {
        top: touches.clientY,
        left: touches.clientX,
        dy:this.targetRect.top - touches.clientY,
        dx:this.targetRect.left - touches.clientX
      }
      const iconList = this.state.iconList.filter((v: any) => v.id !== id);
      let position = [].map.call(document.querySelectorAll('.collect-item'), (v: any) => { return v.getBoundingClientRect() });
      let targetIdx = -1;
      const targetInfo = this.state.iconList.filter((v: any, i:number) => {targetIdx = i;return v.id === id})[0];
      position.splice(targetIdx,1)
      targetInfo.preIdx = targetIdx;
      this.setState({
        ...this.state,
        position,
        iconList,
        targetInfo,
        targetStyle: {
          top: this.posInfo.top + 'px',
          left: this.posInfo.left + 'px'
        }
      })
      console.log(this.targetRect)
    }
  }
  collectTouchMove(ev: any, id:string) {
    console.log(this.state.targetStyle)
    if (this.start) {
      if (this.sortTimer) {
        clearTimeout(this.sortTimer);
      }
      const touches = ev.touches[0];
      const dy = touches.clientY - parseFloat(this.posInfo.top),
        dx = touches.clientX - parseFloat(this.posInfo.left);
      console.log(this.posInfo,dx,dy)
      this.targetMove.push({
        top: this.posInfo.top + dy,
        left: this.posInfo.left + dx
      })
      this.execMove();
      this.posInfo = {
        top:parseFloat(this.state.targetStyle.top)+dy,
        left:parseFloat(this.state.targetStyle.left)+dx
      }
      //todo 一个 Timer 在一段时间后进行排序，如果move则重新设置timer
      this.sortTimer = setTimeout(this.sort.call(this), 600);
    }
  }
  execMove(){
    console.log(this.targetMove.length)
    while(this.targetMove.length){
      const t = this.targetMove.shift();
      requestAnimationFrame(() => {
        this.setState({
          ...this.state,
          targetStyle:t
        })
      })
    }
  }
  render() {
    //渲染图标组
    const renderArray = (arr: Array<any>, style:any, id:string) => {
      if (!arr) arr = [];
      return arr.map((icon) => {
        return (
          <div className={`collect-item ${icon.id===id?'move-item':''}`} key={icon.id} style={icon.id===id?style:{}} 
            onTouchStart={(ev) => this.collectTouchStart(ev, icon.id)} onTouchMove={(ev) => this.collectTouchMove(ev, icon.id)} >
            <span className="del" onClick={() => this.del(icon.id)}>x</span>
            <img src={icon.picUrl} alt={icon.name} />
            <span>{icon.name}</span>
          </div>
        )
      })
    }
    const iconList = this.state.targetInfo.id?this.state.iconList.concat(this.state.targetInfo):this.state.iconList;
    return (
      <div className="body-wrap sort-wrap">
        <div className="sort-list">
          {renderArray(iconList,this.state.targetStyle,this.state.targetInfo.id)}
        </div>
        <div className="submit-btn">提交</div>
      </div>

    );
  }
}
