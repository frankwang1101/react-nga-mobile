import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import * as actions from '../actions/'
import { storeState } from '../reducers/reducer'
import Column from '../components/Column'

export function mapStateToProps(storeState: storeState) {
  return {
    tabs: storeState.tabDatas
  }
}

export function mapDispatchToProps(dispatch: Dispatch<actions.ForumAction>) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Column);
