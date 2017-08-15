import {ForumAction} from '../actions/index'  
import {User,Page,TabData} from '../types/common'
import {SHOW_USERINFO} from '../constants/index'

export interface storeState{
  userInfo:User,
  tabDatas?:Array<TabData>
}


export function columnReduce(state:storeState, action:ForumAction){
  switch(action.type){
    case SHOW_USERINFO:{
      console.log(state.userInfo);
      return state;
    }
    default:
      return state;
  }
}