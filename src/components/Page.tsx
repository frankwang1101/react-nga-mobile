import * as React from 'react';

export interface PageProps {
  level:number,
  children:any,
  close:any,
  active:boolean
}

class Page extends React.Component<PageProps, any> {
  [method:string]:any
  constructor(args:any){
    super(args);
    [
      'onTouchStart',
      'onTouchEnd',
      'onTouchMove',
    ].forEach((method) => (this[method] = this[method].bind(this)));
    this.rect = document.documentElement.getBoundingClientRect();
    this.elePos = {};
    this.pageMove = false;
    this.state = {
      canScroll:true,
      process:0
    }
  }
  componentDidMount() {
    
  }
  onTouchStart(ev:any){
    /**如果是在左右边缘(15%)则进行判定进入页面切换模式 */
    if(ev.touches[0].clientX < this.rect.width || ev.touches[0].clientX < this.rect.width){
      this.elePos.x = ev.touches[0].clientX;
      this.elePos.px = ev.touches[0].clientX;
      this.elePos.py = ev.touches[0].clientY;
      this.pageMove = true;
      this.firstMove = true;//标志位，判断是否是第一次移动
    }
  }
  onTouchMove(ev:any){
    //需要在第一次move的时候判断是x轴移动还是y轴移动
    let nx = ev.touches[0].clientX,
      ny = ev.touches[0].clientY,
      dx = nx - this.elePos.x,
      dy = ny - this.elePos.y;
    if(this.firstMove){
      if(Math.abs(dx) > Math.abs(dy)){
        this.setState({
          ...this.state,
          canScroll:false
        })
      }else{
        this.pageMove = false;
        this.firstMove = false;
      }
    }
    if(this.pageMove){
      const percent = dy / this.rect.width;
      requestAnimationFrame(() => {
        this.setState({
          ...this.state,
          process:this.state.process+percent
        })
      })
    }
    this.firstMove = false;
  }
  onTouchEnd(ev:any){
    if(this.pageMove){
      this.pageMove = false;
      this.firstMove = false;
      this.setState({
        ...this.state,
        canScroll:true
      })
    }
  }
  render() {
    const child = this.props.children[0];
    return (
      <div className={`level level-${this.props.level}`} onTouchMove={this.onTouchMove} onTouchEnd={this.onTouchEnd} onTouchStart={this.onTouchStart} >
        {
          React.cloneElement(child, {close:() => { this.props.close(this.props.level) }})
        }
      </div>
    );
  }
}

export default Page;
