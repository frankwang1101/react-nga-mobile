import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import Route from './routes/Route'
import {columnReduce, storeState} from './reducers/reducer'
import {TabData,Column,ColumnIcon} from './types/common'

let tabDatas:Array<TabData> = [{
  title:'我的收藏',
  seq:1,
  type:0,
  list:[{
    name:'',
    seq:1,
    desc:'长按拖动可以修改排序',
    icons:[{
      name:'DNF',
      seq:1,
      picUrl:'',
      id:'dnf',
    },{
      id:'diablo',
      name:'暗黑3',
      seq:2,
      picUrl:''
    },{
      id:'games',
      name:'游戏综合',
      seq:3,
      picUrl:''
    },{
      id:'acg',
      name:'二次元',
      seq:4,
      picUrl:''
    },{
      id:'hardware',
      name:'硬件配置',
      seq:5,
      picUrl:''
    },{
      id:'composite',
      name:'网事杂谈',
      seq:6,
      picUrl:''
    }]
  }]
},{
  title:'网游单机',
  seq:2,
  type:1,
  list:[{
    name:'',
    seq:1,
    desc:'热门推荐',
    icons:[{
      id:'fate',
      name:'Fate/Grand',
      seq:1,
      picUrl:''
    },{
      id:'line',
      name:'碧蓝航线',
      seq:2,
      picUrl:''
    },{
      id:'h1z1',
      name:'绝地求生',
      seq:3,
      picUrl:''
    }]
  }]
},{
  title:'手游页游',
  seq:3,
  type:1,
  list:[{
    name:'',
    seq:1,
    desc:'热门推荐',
    icons:[]
  }]
},{
  title:'网事杂谈',
  seq:4,
  type:1,
  list:[{
    name:'',
    seq:1,
    desc:'杂谈精选',
    icons:[{
      id:'composite',
      name:'网事杂谈',
      seq:1,
      picUrl:''
    },{
      id:'acg',
      name:'二次元',
      seq:2,
      picUrl:''
    },{
      id:'car',
      name:'寂寞的车',
      seq:3,
      picUrl:''
    },{
      id:'music',
      name:'音乐影视',
      seq:4,
      picUrl:''
    },{
      id:'soccer',
      name:'生命之杯',
      seq:5,
      picUrl:''
    }]
  }]
}];

let store = createStore<storeState>(columnReduce,{userInfo:{id:'123',name:'frank',username:'frank@11',avatar:'hhha'},tabDatas:tabDatas},applyMiddleware(thunk));

render(<Provider store={store}><Route /></Provider>, document.getElementById('root') as HTMLElement);
