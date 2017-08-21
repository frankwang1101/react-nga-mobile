import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import * as actions from '../actions/'
import { storeState } from '../reducers/reducer'
import Column from '../components/Column'
import {column_info} from '../types/common'

const mapStateToProps = (storeState: storeState) => {
  return {
    posts:storeState.posts,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<actions.ForumAction>) => {
  return {
    loadPost:(info:column_info) => (dispatch(actions.loadPost(info)))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Column);
