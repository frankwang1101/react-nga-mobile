import * as React from 'react'
import { Promise } from 'es6-promise';
import { easeInOout } from '../utils/Tween'

interface Props {
  isShow: boolean,
  delay: number,
  menuClick?: Function,
  changeStatus: Function,
  [method: string]: any
}

interface State {
  isShow: boolean,
  delay: number,
  opacity: number,
  leftPart: number,
  status: string,
}

export default class Aside extends React.Component<Props, State>{
  start: boolean;
  elePos: {
    x?: number,
    left?: number,
    px?: number,
    originLeft?: number,
    originOpacity?: number
  };
  eleInfo: {
    width?: number,
    clientWidth?: number
  }
  touchMove: any
  touchStart: any
  touchEnd: any
  aside: HTMLElement
  mask: HTMLElement
  isMove: boolean
  rafId: any
  moves: Array<any>
  [propName: string]: any;
  constructor(args: any) {
    super(args);
    this.state = {
      isShow: this.props.isShow,
      delay: this.props.delay,
      opacity: this.props.isShow ? 0.7 : 0,
      leftPart: this.props.isShow ? 0 : 100,
      status: this.props.isShow ? 'block' : 'none'
    }
    this.isMove = false;
    this.elePos = {};
    this.eleInfo = {};
    this.start = false;
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    [
      'changeStatus',
      'initTouch',
      'requestSetState',
    ].forEach((m: string) => { this[m] = this[m].bind(this) })
  }
  componentDidMount() {
    //设置基本参数，绑定touch事件
    this.eleInfo.width = parseInt((document.documentElement.getBoundingClientRect().width * 0.7).toFixed(0));
    this.eleInfo.clientWidth = document.documentElement.getBoundingClientRect().width;
    this.initTouch();
  }

  componentWillReceiveProps(nextProps: Props) {
    //获取是否更新的指令
    if (nextProps.isShow !== this.props.isShow) {
      if (nextProps.isShow) {
        this.show();
      } else {
        this.hide();
      }
    }
  }
  componentWillUnmount() {
    document.removeEventListener('touchstart', this.touchStart);
    document.removeEventListener('touchmove', this.touchMove);
    document.removeEventListener('touchend', this.touchEnd);
  }
  show() {
    this.setState({
      isShow: true,
      status: 'block'
    });
    let start = 0, during = 1000 * this.props.delay;
    let tempLeft = this.state.leftPart, tempOpac = this.state.opacity;
    let run = () => {
      start++;
      tempLeft = easeInOout(start, tempLeft, -tempLeft, during);
      tempOpac = easeInOout(start, tempOpac, 0.7 - tempOpac, during);
      let flag = true;
      if (Math.abs(Math.min(this.state.leftPart, tempLeft)) < 2) {
        flag = false;
        this.setState({
          leftPart: 0,
          opacity: 0.7
        })
      } else {
        this.setState({
          leftPart: (this.state.leftPart > tempLeft) ? tempLeft : this.state.leftPart,
          opacity: tempOpac
        })
      }

      if ((start < during) && flag)
        requestAnimationFrame(run);
    }
    run();
  }
  hide() {
    this.setState({
      isShow: false,
    });
    let start = 0, during = 1000 * this.props.delay;
    let tempLeft = this.state.leftPart, tempOpac = this.state.opacity;
    let run = () => {
      start++;
      tempLeft = easeInOout(start, tempLeft, 100 - tempLeft, during);
      tempOpac = easeInOout(start, tempOpac, -tempOpac, during);
      let flag = true;
      if (Math.abs(100 - Math.max(this.state.leftPart, tempLeft)) < 2) {
        flag = false;
        this.setState({
          leftPart: 100,
          opacity: 0
        })
      } else {
        this.setState({
          leftPart: tempLeft,
          opacity: (tempOpac > this.state.opacity) ? this.state.opacity : tempOpac
        })
      }
      if ((start < during) && flag) { requestAnimationFrame(run) } else {
        this.setState({ status: 'none' })
      }
    }
    run();
  }
  changeStatus(e: any) {
    if (!this.start) this.props.changeStatus();
  }
  initTouch() {
    this.touchStart = (ev: any) => {
      this.elePos.x = ev.touches[0].clientX;
      this.elePos.px = ev.touches[0].clientX;
      this.inArea = false;
      if (this.elePos.px < (this.state.isShow ? this.eleInfo.clientWidth : this.eleInfo.clientWidth * 0.2)) {
        this.moves = [];
        this.start = true;
        this.elePos.left = this.props.isShow ? 100 : 0;
        this.elePos.originLeft = this.state.leftPart;
        this.elePos.originOpacity = this.state.opacity;
        this.setState({
          status: 'block'
        });
        this.inArea = true;
      }
    }
    document.addEventListener('touchstart', this.touchStart);
    this.touchEnd = (ev: any) => {
      if (this.isMove) {
        var flag: any;
        let tolerance = Math.abs(this.elePos.originLeft - this.state.leftPart);
        if (tolerance > 30) {
          //大于30到对面
          flag = (this.elePos.originLeft === 0) ? true : false;
        } else {
          //回去
          flag = (this.elePos.originLeft === 0) ? false : true;
        }
        if (flag) {
          this.hide();
        } else {
          this.show();
        }
      } else if (this.inArea && !this.state.isShow) {
        this.setState({
          status: 'none'
        })
      }
      this.start = false, this.inArea = false, this.elePos = {}, this.isMove = false;
    }
    document.addEventListener('touchend', this.touchEnd);
    this.touchMove = (ev: any) => {
      if (this.start === true) {
        let nx = ev.touches[0].clientX;
        let dx = nx - this.elePos.x;
        if (Math.abs(dx) > 5) {
          this.isMove = true;
          let regArr = this.aside.style.transform.match(/translate\(-([\d]+)%?\)/) || [];
          let nOpc = parseFloat(this.mask.style.opacity);
          let left = regArr.length ? (parseInt(regArr[1]) || 0) : 0;
          left = Math.abs(- left + parseInt((dx * 100 / this.eleInfo.width).toFixed(0)));
          nOpc = Math.abs(nOpc + (dx * 0.7 / this.eleInfo.width));
          if (left > 90) left = 90;
          if (left < 10) left = 10;
          this.moves.push({
            left,
            opacity: nOpc
          });
          this.requestSetState();
          this.elePos.x = nx;
        }
      }
    }
    document.addEventListener('touchmove', this.touchMove);
  }
  requestSetState() {

    if (this.moves.length > 0) {
      let nowMove = this.moves.shift();;
      this.setState({
        leftPart: nowMove.left,
        opacity: nowMove.opacity
      })
      if (this.moves.length > 0) {
        this.rafId = requestAnimationFrame(this.requestSetState);
      }
    }
  }
  render() {
    return (
      <div className="aside-wrap" style={{ display: this.state.status }} >
        <div className="aside-mask" style={{ opacity: this.state.opacity }} onClick={this.changeStatus} ref={(mask) => this.mask = mask}></div>
        <aside className="user-aside" style={{ transform: `translate(-${this.state.leftPart}%)` }} ref={aside => this.aside = aside}>
          <div className="aside-top">
            <img src="" alt="" className="user-avatar" />
            <div className="user-info">
              <div className="user-info-label user-info-name">frankw</div>
              <div className="user-info-label user-info-uid">24005961</div>
            </div>
          </div>
          <div className="aside-bottom">
            <ul className="aside-menu">
              <li className="aside-menu-item">论坛</li>
              <li className="aside-menu-item">任务</li>
              <li className="aside-menu-item">商店</li>
              <li className="aside-menu-item">设置</li>
            </ul>
          </div>
        </aside>
      </div>
    )
  }
}