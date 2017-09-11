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
    this.state = {
      position: [],//存放图标组的位置数据
      iconList: [],//存放当前图标组的信息
      targetStyle: {},//存放当前拖动元素的样式信息
      targetInfo: {}//存放当前元素的基本信息
    }
  }
  start = false;
  move = false;
  targetRect: any = {};
  sortTimer: any = null;
  componentWillMount() {
    this.props.getCollectList();
  }
  componentDidMount() {
    console.log(this.props.collectList)
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
    alert(id)
  }
  sort() {

  }
  collectTouchStart(ev: any) {
    if (!this.start) {
      this.start = true;
      this.targetRect = ev.currentTarget.getBoundingClientRect();
      ev.currentTarget.style.position = 'absolute';
      ev.currentTarget.style.top = this.targetRect.top + 'px';
      ev.currentTarget.style.left = this.targetRect.left + 'px';
      //todo 一个 Timer 在一段时间后进行排序，如果move则重新设置timer
      this.sortTimer = setTimeout(this.sort, 600);
    }
  }
  collectTouchMove(ev: any) {

  }
  render() {
    const renderArray = (arr: Array<any>) => {
      if (!arr) arr = [];
      return arr.map((icon) => {
        return (
          <div className="collect-item" key={icon.id} onTouchStart={this.collectTouchStart} onTouchMove={this.collectTouchMove}>
            <span className="del" onClick={() => this.del(icon.id)}>x</span>
            <img src={icon.picUrl} alt={icon.name} />
            <span>{icon.name}</span>
          </div>
        )
      })
    }
    return (
      <div className="body-wrap sort-wrap">
        <div className="sort-list">
          {renderArray(this.state.iconList)}
        </div>
        <div className="submit-btn">提交</div>
      </div>

    );
  }
}
