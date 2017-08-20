import {ForumAction} from '../actions/index'  
import {User,Page,TabData} from '../types/common'
import {SHOW_USERINFO, GET_COLUMN_POST} from '../constants/index'

export interface storeState{
  userInfo:User,
  tabDatas?:Array<TabData>,
  posts?:Array<any>,
  page?:number
}


export function columnReduce(state:storeState, action:ForumAction){
  switch(action.type){
    case SHOW_USERINFO:{
      return state;
    }
    case GET_COLUMN_POST:{
      const r = Object.assign(state,{ posts:action.data, page:action.data.page})
      return r;
    }
    default:
      return state;
  }
}
