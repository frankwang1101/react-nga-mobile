import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import * as actions from '../actions/'
import { storeState } from '../reducers/reducer'
import Column from '../components/Column'
import {column_info} from '../types/common'

export function mapStateToProps(storeState: storeState) {
  return {
    posts:storeState.posts,
    page:storeState.page,
  }
}

export function mapDispatchToProps(dispatch: Dispatch<actions.ForumAction>) {
  return {
    loadPost:(info:column_info) => (dispatch(actions.loadPost(info)))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Column);
