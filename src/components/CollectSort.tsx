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
      this.sort();
      let iconList = this.state.iconList.slice();
      if (this.state.iconList.length < this.props.collectList.length) {//未找到匹配，回到原位
        if (this.sortTimer) {
          clearTimeout(this.sortTimer);
          this.sortTimer = null;
        }
        let idx = this.state.targetInfo.preIdx;
        iconList.splice(idx, 0, this.state.targetInfo);
      }
      iconList.forEach((v: any) => {
        if (/^invalid\d+$/.test(v.id)) {
          v.id = v._id;
          delete v._id;
        }
      })
      this.setState({
        ...this.state,
        targetStyle: {},
        targetInfo: {},
        iconList
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
    if (this.start) {
      //遍历state中的位置信息，进行排序,思路是获取固定元素的位置信息，判断是否有相交，线为左右+底部
      let data: any = [];
      let levelMap = this.state.position.reduce((a: any, b: any) => {
        if (!a[b.bottom]) {
          a[b.bottom] = [b]
        } else {
          a[b.bottom].push(b);
        }
        return a;
      }, {});
      const generateDiffList = (arr: Array<any>) => {
        let list: any = [];
        arr.reduce((a: any, b: any) => {
          list.push({
            left: a.left,
            right: b.right,
            bottom: a.bottom
          })
          return b;
        })
        return list;
      };
      let keys = Object.keys(levelMap).sort((a: any, b: any) => (a - b));
      for (let key of keys) {
        levelMap[key] = generateDiffList(levelMap[key]);
      }
      let target = this.state.targetStyle,
        rect = this.targetRect,
        isMatch = false,
        iconList = this.state.iconList.filter((v: any) => {
          return !/^invalid\d+$/.test(v.id)
        });

      if (parseInt(keys[keys.length - 1]) > target.top) {
        let idx = -1;
        for (let i = 0; i < keys.length; i++) {
          if (parseInt(keys[i]) > target.top) {
            idx = i;
            break;
          }
        }
        if (!!~idx) {
          if(idx !== keys.length - 1){//这里判断一下，是离下一层近还是本层近
            let Da = Math.abs(parseInt(keys[idx]) - target.top),
               Db = Math.abs(parseInt(keys[idx]) - target.top - this.targetRect.height);
            console.log(Da,Db);
            
            idx = Da > Db ? idx : (idx + 1);
          }
          let tempArr = levelMap[keys[idx]];
          tempArr.forEach((v: any, i: number) => {
            let { left, right, bottom } = v;
            if ((left < target.left && right >= target.left + rect.width) && target.top < bottom) {
              //匹配，则插入此位置
              if (!isMatch) {
                isMatch = !0;
                iconList.splice(idx * 3 + i + 1, 0, { ...this.state.targetInfo, id: `invalid${Date.now()}`, _id: this.state.targetInfo.id })
              }
            }
          })
          if (!isMatch) {
            if (target.left <= tempArr[0].left) {//在本行最左
              iconList.splice(idx*3,0,{ ...this.state.targetInfo, id: `invalid${Date.now()}`, _id: this.state.targetInfo.id });
            } else if (target.left + rect.width > tempArr[tempArr.length - 1].right ) {//在本行最右
              iconList.splice((idx+1)*3 - 1,0,{ ...this.state.targetInfo, id: `invalid${Date.now()}`, _id: this.state.targetInfo.id });
            }
          }
        }
      }


      this.setState({
        ...this.state,
        iconList
      })
    }
  }
  collectTouchStart(ev: any, id: string) {
    if (!this.start) {
      this.start = true;
      this.targetMove = [];
      this.targetRect = ev.currentTarget.getBoundingClientRect();
      const touches = ev.touches[0];
      this.posInfo = {
        top: touches.clientY,
        left: touches.clientX,
        dy: Math.abs(this.targetRect.top - touches.clientY),
        dx: Math.abs(this.targetRect.left - touches.clientX)
      }
      const iconList = this.state.iconList.filter((v: any) => v.id !== id);
      let position = [].map.call(document.querySelectorAll('.collect-item'), (v: any) => { return v.getBoundingClientRect() });
      let targetIdx = -1;
      const targetInfo = this.state.iconList.filter((v: any, i: number) => { targetIdx = i; return v.id === id })[0];
      position.splice(targetIdx, 1)
      targetInfo.preIdx = targetIdx;
      this.setState({
        ...this.state,
        position,
        iconList,
        targetInfo,
        targetStyle: {
          top: this.targetRect.top + 'px',
          left: this.targetRect.left + 'px'
        }
      })
    }
  }
  collectTouchMove(ev: any, id: string) {
    if (this.start) {
      if (this.sortTimer) {
        clearTimeout(this.sortTimer);
      }
      const touches = ev.touches[0];
      const dy = touches.clientY - parseFloat(this.posInfo.top),
        dx = touches.clientX - parseFloat(this.posInfo.left);
      this.targetMove.push({
        top: Math.min(Math.max(0,parseFloat(this.state.targetStyle.top) + dy),document.documentElement.clientHeight),
        left: Math.min(Math.max(0,parseFloat(this.state.targetStyle.left) + dx),(document.documentElement.clientWidth - this.targetRect.width))
      })
      this.execMove();
      this.posInfo = {
        top: touches.clientY,
        left: touches.clientX
      }
      //todo 一个 Timer 在一段时间后进行排序，如果move则重新设置timer
      this.sortTimer = setTimeout(() => {
        console.log('active');
        this.sort.call(this);
      }, 600);
    }
  }
  execMove() {
    while (this.targetMove.length) {
      const t = this.targetMove.shift();
      requestAnimationFrame(() => {
        this.setState({
          ...this.state,
          targetStyle: t
        })
      })
    }
  }
  render() {
    const mutateStyle = (style: any) => {
      style.top = style.top - this.posInfo.top ? this.posInfo.top : 0;
      style.left = style.left - this.posInfo.left ? this.posInfo.left : 0;
    }
    //渲染图标组
    const renderArray = (arr: Array<any>, style: any, id: string) => {
      if (!arr) arr = [];
      return arr.map((icon) => {
        return (
          <div className={`collect-item ${icon.id === id ? 'move-item' : ''}`} key={icon.id} style={icon.id === id ? style : {}}
            onTouchStart={(ev) => this.collectTouchStart(ev, icon.id)} onTouchMove={(ev) => this.collectTouchMove(ev, icon.id)} >
            <span className="del" onClick={() => this.del(icon.id)}>x</span>
            <img src={icon.picUrl} alt={icon.name} />
            <span>{icon.name}</span>
          </div>
        )
      })
    }
    const iconList = this.state.targetInfo.id ? this.state.iconList.concat(this.state.targetInfo) : this.state.iconList;
    return (
      <div className="body-wrap sort-wrap">
        <div className="sort-list">
          {renderArray(iconList, this.state.targetStyle, this.state.targetInfo.id)}
        </div>
        <div className="submit-btn">提交</div>
      </div>

    );
  }
}
