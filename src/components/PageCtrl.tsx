import * as React from 'react'

interface State {
  maps: any,
  keyArr: Array<string>,
  styleArr: any,
  canScroll: boolean,
  process: number,
  opacity?: number | string,
  activeKey: string,
  reback: boolean
}

export default class PageCtrl extends React.Component<any, State> {
  [method: string]: any
  constructor(args: any) {
    super(args);
    this.state = {
      maps: this.props.children.reduce((prev: any, next: any) => {
        prev[next.props['data-path']] = next;
        return prev;
      }, {}),
      keyArr: [this.props.activeKey],
      styleArr: {},
      canScroll: true,
      process: 0,
      activeKey: this.props.activeKey,
      reback: false
    };
    [
      'onTouchStart',
      'onTouchMove',
      'onTouchEnd',
      'close',
      'toEnd',
    ].forEach(m => { this[m] = this[m].bind(this) });
    this.rect = document.documentElement.getBoundingClientRect();
    this.elePos = {};
    this.canMove = false;
    this.pageMoving = false;
  }
  componentWillMount() {

  }
  componentDidMount() {

  }
  componentWillReceiveProps(nextProps: any) {
    if (this.state.reback) {
      this.setState({
        ...this.state,
        reback: false
      });
      return false;
    }
    if (nextProps.activeKey != this.props.activeKey || nextProps.location.search !== this.props.location.search) {
      const arr = this.state.keyArr.slice();
      // if (this.state.keyArr.length > 2) {
      //   arr.splice(2, 1, nextProps.activeKey);
      // } else {
        arr.push(nextProps.activeKey);
      // }
      this.setState({
        ...this.state,
        keyArr: arr,
        activeKey: nextProps.activeKey
      });
      return true;
    } else {
      console.log('why')
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
    if (this.state.keyArr.length < 2 || this.state.activeKey === 'main') {
      return;
    }
    if (ev.touches[0].clientX < this.rect.width * 0.1 || ev.touches[0].clientX > this.rect.width * 0.9) {
      this.elePos.x = ev.touches[0].clientX;
      this.elePos.px = ev.touches[0].clientX;
      this.elePos.py = ev.touches[0].clientY;
      this.canMove = true;
      this.firstMove = true;//标志位，判断是否是第一次移动
    }
  }
  onTouchMove(ev: any) {
    if (this.canMove) {
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
          this.canMove = false;
          this.firstMove = false;
        }
      } else {
        this.pageMoving = true;
      }
      const percent = dx * 100 / this.rect.width;
      requestAnimationFrame(() => {
        let map = this.state.styleArr;
        map[this.state.keyArr[this.state.keyArr.length - 1] as string] = { transform: `translateX(${(this.state.process + percent) as number}%)` };
        map[this.state.keyArr[this.state.keyArr.length - 2] as string] = { opacity: 0.7 - (0.7 * Math.abs(this.state.process + percent)) / 100 };
        this.setState({
          ...this.state,
          process: this.state.process + percent,
          styleArr: map
        })
      });
      this.elePos.x = nx;
    }
    this.firstMove = false;
  }
  onTouchEnd(ev: any) {
    if (this.canMove) {
      this.canMove = false;
      this.firstMove = false;
      //此时继续执行动画到结束
      if (this.pageMoving) this.toEnd(this.state.process > 0);
      this.pageMoving = false;
    }
  }
  toEnd(left: boolean) {
    let remove = true;
    if (Math.abs(this.state.process) < 50) {
      left = !left;
      remove = false;
    }
    const diffP = Math.max(Math.abs(~(100 - Math.abs(this.state.process)) / 10), 2),//至少有个
      diffO = 0.7 * diffP / 100;
    const run = () => {
      requestAnimationFrame(() => {
        const countDiff = this.state.process<0?Math.abs(this.state.process):100 - Math.abs(this.state.process)
        console.log(countDiff)
        if (100 - countDiff <= diffP) {
          //如果判断当前页面的位置已经接近看不见了，消除当前页面
          if (remove as boolean) {
            let nowKey = this.state.keyArr.slice();
            const preKey = nowKey.pop();
            this.setState({
              ...this.state,
              process: 0,
              keyArr: nowKey,
              canScroll: true,
              styleArr: {},
              activeKey: nowKey[nowKey.length - 1],
              reback: true
            }, () => {
              this.props.history.go(-1);

            })
          }else{
            this.setState({
              ...this.state,
              process: 0,
              canScroll: true,
              styleArr: {},
            })
          }
        } else {
          let map = this.state.styleArr;
          map[this.state.keyArr[this.state.keyArr.length - 1] as string] = { transform: `translateX(${this.state.process + (left ? diffP : (-diffP)) as number}%)` };
          map[this.state.keyArr[this.state.keyArr.length - 2] as string] = { opacity: this.state.opacity as number - diffO };
          //否则继续动画
          this.setState({
            ...this.state,
            process: this.state.process + (left ? diffP : (-diffP)),
            styleArr: map
          }, run)
        }
      })
    }
    run();
  }
  render() {
    return (
      <div className={`combine ${this.state.canScroll ? '' : 'scroll-forbid'}`} onClick={() => { console.log('page click') }} onTouchStart={this.onTouchStart} onTouchMove={this.onTouchMove} onTouchEnd={this.onTouchEnd}>
        {

          this.state.keyArr.map((key: string, idx: number) => {
            return <div className={`level level-${idx}`} style={this.state.activeKey === key ? this.state.styleArr[key] : {}}>
              {this.state.activeKey === key ? '' : <div className="page-mask" style={this.state.activeKey !== key ? this.state.styleArr[key] : {}}></div>}
              {React.cloneElement(this.state.maps[key], { ...this.props, close: this.close })}
            </div>
          })}
      </div>
    )
  }
}