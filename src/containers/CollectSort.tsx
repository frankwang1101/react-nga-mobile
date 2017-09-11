import * as React from 'react';
import { connect } from 'react-redux'
import CollectSort from '../components/CollectSort'
import {getCollectInfo} from '../actions/index'

export interface AppProps {
}


const mapState2Props = (state:any) => {
  return {
    collectList:state.collect
  };
}

const mapDispatch2Props = (dispatch:any) => {
  return {
    getCollectList:() => dispatch(getCollectInfo())
  }
}

export default connect(mapState2Props,mapDispatch2Props)(CollectSort);
