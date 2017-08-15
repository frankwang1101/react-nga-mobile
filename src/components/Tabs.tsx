import * as React from 'react'
import { TabData, ColumnIcon, Column } from '../types/common'
import { easeInOout } from '../utils/Tween'
import * as Utils from '../utils/Utils'
/**
 * 要解决的问题
 * 1.easeinout误差值到多少以内停止(尽可能快)。
 * 2.达到容忍值后，设置state(这个似乎在raf里面也可以做到)
 * 3.active底下的游标设置
 * 4.上滑重新加载---+
 */
interface Props {
  data: Array<TabData>
  [method: string]: any
}

interface State {
  activeIdx: number,
  left: number,
  [index: string]: any
}

export default class TabCarousel extends React.Component<Props, State>{
  [method: string]: any
  moveEndFn: any
  areaConfig: any
  verticalMove: boolean
  constructor(args: any) {
    super(args);
    [
      'onTouchStart',
      'onTouchMove',
      'syncSetState',
      'left',
      'right',
      'changePage'
    ].forEach(m => this[m] = this[m].bind(this))
    this.start = false;
    this.move = false;
    this.moves = [];
    this.state = {
      activeIdx: 0,
      left: 0
    }
    this.moveCount = 0;
  }
  componentDidMount() {
    const rect = document.documentElement.getBoundingClientRect();
    this.areaConfig = {
      width: rect.width,
      areaLeft: rect.width * 0.2,
      areaRight: rect.width * 0.8
    }
    this.touchEndFn = (e: any) => {
      if (this.start && this.move) {
        if (!this.verticalMove) {
          //左右，则判断左还是右
          let tolerance = Math.abs(this.elePos.nx - this.elePos.x);
          let isLeft = (tolerance > 30) ? this.elePos.nx < this.elePos.x : this.elePos.nx > this.elePos.x;
          this.moveCount = 0;
          (!isLeft) ? this.left() : this.right();
        }else{
          var p = new Promise<any>((resolve) => {
            setTimeout(function(){ resolve('test finish') },1500);
          })
          Utils.loading(p).then(res => {
            console.log(res)
          })
        }
      }
      this.start = false, this.move = true, this.verticalMove = null;
    }
    document.addEventListener('touchend', this.touchEndFn)
  }
  componentWillUnMount() {
    if (this.moveEndFn) {
      document.removeEventListener('touchend', this.touchEndFn)
    }
  }
  componentDidUpdate() {

  }
  onTouchStart(e: any) {
    this.elePos = {
      //初始坐标
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      //变化坐标
      nx: e.touches[0].clientX,
      ny: e.touches[0].clientY,
    }
    if (this.elePos.x > this.areaConfig.areaLeft && this.elePos.x < this.areaConfig.areaRight) {
      //处于中间 (20-80) 区域
      this.start = true;
      this.moves = [];
      this.verticalMove = null;
    }
  }
  onTouchMove(e: any) {
    if (this.start) {
      let x = e.touches[0].clientX, y = e.touches[0].clientY,
        dx = x - this.elePos.nx, dy = y - this.elePos.ny, ax = Math.abs(dx), ay = Math.abs(dy);
      if (ax > 1 || ay > 1) {
        this.move = true;
        if (!this.verticalMove) {//初始化移动
          this.verticalMove = ay > ax;
        }
        this.elePos.nx = x, this.elePos.ny = y;//设置新的位置
        if (this.verticalMove) {
          //垂直
        } else {
          //左右切换
          let left = this.state.left - dx * 100 / this.areaConfig.width
          if (left < 0) left = 0;
          if (left > 300) left = 300;
          this.moves.push({
            left
          });
          this.syncSetState();
        }
      }
    }
  }
  left() {
    let oLeft = this.state.left, during = 40, idx = this.state.activeIdx, start = 0;;
    if (idx === 0) {
      return;
    }
    idx--;
    var run = () => {
      start++;
      oLeft = easeInOout(start, oLeft, idx * 100 - oLeft, during);
      let flag = true;
      if(Math.abs(oLeft - idx * 100) > 3){
        this.setState({
          left: oLeft,
          activeIdx: idx
        })
      }else{
        this.setState({
          left: idx * 100,
          activeIdx: idx
        })
        flag = false;
      }
      if (start < during && flag) requestAnimationFrame(run);
    }
    run();
  }
  right() {
    let oLeft = this.state.left, during = 40, idx = this.state.activeIdx, start = 0;;
    if (idx === 3) {
      return;
    }
    idx++;
    var run = () => {
      start++;
      oLeft = easeInOout(start, oLeft, idx * 100 - oLeft, during);
      let flag = true;
      if(Math.abs(oLeft - idx * 100) > 3){
        this.setState({
          left: oLeft,
          activeIdx: idx
        })
      }else{
        this.setState({
          left: idx * 100,
          activeIdx: idx
        })
        flag = false;
      }
      if (start < during && flag) requestAnimationFrame(run);
    }
    run();
  }
  changePage(idx:number) {
    if(idx !== this.state.activeIdx){
      this.setState({
        activeIdx:idx,
        left: idx * 100
      })
    }
  }
  syncSetState() {
    if (this.moves.length) {
      let state = this.moves.shift();
      this.setState({ left: state.left });
      if (this.moves.length) {
        requestAnimationFrame(this.syncSetState);
      }
    }
  }
  render() {
    const { data } = this.props;
    data.sort((a: TabData, b: TabData) => {
      return a.seq - b.seq;
    });
    let tabArr: any = [], pageArr: any = [], columnArr: any = [];
    data.forEach(function (v: TabData, i: number) {
      tabArr.push({title:v.title});
      if (v.list && v.list.length) {
        v.list.sort((a: Column, b: Column) => {
          return a.seq - b.seq;
        });
        columnArr = v.list.map((sub: Column) => {
          sub.icons.sort(function (v1: ColumnIcon, v2: ColumnIcon) { return v1.seq - v2.seq });
          let subArr = sub.icons.map(function (icon: ColumnIcon, idx) {
            return (
              <div className="column-item">
                <img src={icon.picUrl} alt={icon.name} />
                <span>{icon.name}</span>
              </div>
            )
          })
          return (
            <div className="content-list">
              <div className="content-top">
                <span className="warn-label">{sub.desc}</span>
              </div>
              <div className="content-bottom">
                {
                  subArr
                }
              </div>
            </div>
          )
        });
        pageArr.push(<div className="tab-page">{columnArr}</div>);
      }
    })
    return (
      <div className="tab-carousel">
        <div className="link-bar link-tab">
          <ul className="link-tab-list">
            {tabArr.map((v:any,i:number) => (<li className={"link-tab-item"} key={`page${i}`} onClick={() => this.changePage(i)} ><span className={"link " + ((i === this.state.activeIdx) ? 'active' : '')}>{v.title}</span></li>))}
            <div className="border-bottom-bar">
              <div className="active-bar" style={{transform:`translateX(${this.state.left}%)`}}></div>
            </div>
          </ul>
        </div>
        <article className="content" onTouchStart={this.onTouchStart} onTouchMove={this.onTouchMove}>
          <div className="page-container" style={{ transform: `translateX(-${this.state.left}%)` }}>
            {pageArr}
          </div>
        </article>
      </div>
    )
  }
}
