import { ForumAction } from '../actions/index'
import { User, Page, TabData } from '../types/common'
import * as Action from '../constants/index'

export interface storeState {
  userInfo: User,
  tabDatas?: Array<TabData>,
  posts?: Array<any>,
  page?: number
}


export function columnReduce(state: storeState, action: ForumAction) {
  switch (action.type) {
    case Action.SHOW_USERINFO: {
      return state;
    }
    case Action.GET_COLUMN_POST: {
      return {
        ...state,
        posts: action.data.posts,
        page: action.data.page
      };
    }
    case Action.GET_POST_DETAIL: {
      return {
        ...state,
        post: action.data
      }
    }
    case Action.CLEAR_COLUMN_POST: {
      return {
        ...state,
        posts:[]
      }
    }
    case Action.CLEAR_POST_DETAIL: {
      console.log('clear')
      return {
        ...state,
        post:{}
      }
    }
    default:
      return state;
  }
}
